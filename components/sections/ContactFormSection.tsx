"use client"

import { useState, useRef, useMemo } from "react"
import { useRouter } from "@/i18n/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { CheckCircle, Loader2, Paperclip, X, ArrowLeft, Sparkles, Layout, TrendingUp } from "lucide-react"
import { toast } from "sonner"
import { usePostHog } from "posthog-js/react"
import { useLocale, useTranslations, type useTranslations as UseTranslationsType } from "next-intl"
import { newMetaEventId, trackMetaEvent } from "@/lib/meta/pixel"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { createBrowserClient } from "@/lib/supabase/client"

type FormT = ReturnType<typeof UseTranslationsType<"home.contactForm">>

// Schemas per step — built from translations, since zod error messages need
// to render in the visitor's current language (docs/specs/0001-multi-language-support, AC-5).
function buildFormSchema(t: FormT) {
  const step1Schema = z.object({
    offerType: z.enum(["website_visualization", "marketing_plan"]),
    email: z.string().email(t("errors.invalidEmail")),
  })
  const step2Schema = z.object({
    projectName: z.string().min(2, t("errors.projectNameRequired")),
    businessType: z.string().min(1, t("errors.businessTypeRequired")),
  })
  const step3Schema = z.object({
    projectDescription: z.string().min(10, t("errors.descriptionTooShort")),
  })
  const step4Schema = z.object({
    colorPreference: z.string().optional(),
    reference: z.string().optional(),
  })
  return step1Schema.merge(step2Schema).merge(step3Schema).merge(step4Schema)
}

type FormValues = z.infer<ReturnType<typeof buildFormSchema>>

const MAX_FILES = 5
const MAX_FILE_SIZE_MB = 10
const ACCEPTED_FILE_TYPES =
  "image/jpeg,image/png,image/webp,image/gif,application/pdf,.doc,.docx"

interface AttachmentPayload {
  path: string
  name: string
  size: number
  type: string
}

class UploadError extends Error {
  constructor(public fileName: string) {
    super(`Failed to upload ${fileName}`)
  }
}

async function uploadFiles(files: File[]): Promise<AttachmentPayload[]> {
  if (files.length === 0) return []
  const supabase = createBrowserClient()
  return Promise.all(
    files.map(async (file) => {
      const path = `${crypto.randomUUID()}-${file.name}`
      const { error } = await supabase.storage
        .from("lead-attachments")
        .upload(path, file, { contentType: file.type })
      if (error) throw new UploadError(file.name)
      return { path, name: file.name, size: file.size, type: file.type }
    })
  )
}

interface ContactFormSectionProps {
  id?: string
  heading?: React.ReactNode
  description?: React.ReactNode
  showBackground?: boolean
  defaultOfferType?: "website_visualization" | "marketing_plan"
}

export default function ContactFormSection({
  id = "contact",
  heading,
  description,
  showBackground = true,
  defaultOfferType = "website_visualization",
}: ContactFormSectionProps) {
  const t = useTranslations("home.contactForm")
  const locale = useLocale()
  const router = useRouter()
  const shouldReduceMotion = useReducedMotion()
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [leadId, setLeadId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const posthog = usePostHog()
  const formStartedRef = useRef(false)

  const headingContent = heading ?? (
    <>
      {t("headingLine1")}
      <br />
      {t("headingLine2")}
    </>
  )
  const descriptionContent = description ?? <>{t("description")}</>

  function handleFormStart() {
    if (formStartedRef.current) return
    formStartedRef.current = true
    posthog?.capture("lead_form_started")
  }

  function handleFilesSelected(fileList: FileList | null) {
    if (!fileList) return
    const incoming = Array.from(fileList).filter((file) => {
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        toast.error(t("errors.fileTooLarge", { fileName: file.name, maxSize: MAX_FILE_SIZE_MB }))
        return false
      }
      return true
    })
    setFiles((prev) => {
      const combined = [...prev, ...incoming]
      if (combined.length > MAX_FILES) {
        toast.error(t("errors.tooManyFiles", { maxFiles: MAX_FILES }))
        return combined.slice(0, MAX_FILES)
      }
      return combined
    })
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const fullFormSchema = useMemo(() => buildFormSchema(t), [t])

  const form = useForm<FormValues>({
    resolver: zodResolver(fullFormSchema),
    mode: "onChange",
    defaultValues: {
      offerType: defaultOfferType || "website_visualization",
      email: "",
      projectName: "",
      businessType: "",
      projectDescription: "",
      colorPreference: "",
      reference: "",
    },
  })

  // Progressive Step 1 Save
  async function handleNextStep1() {
    const offerType = form.getValues("offerType")

    if (offerType === "marketing_plan") {
      await handleMarketingPlanSubmit()
      return
    }

    const isStep1Valid = await form.trigger(["offerType", "email"])
    if (!isStep1Valid) return

    const email = form.getValues("email")
    setIsLoading(true)
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ step: 1, email, offerType, locale }),
      })
      if (!res.ok) throw new Error("Step 1 failed")
      const data = await res.json()
      if (data.leadId) {
        setLeadId(data.leadId)
      }
      setCurrentStep(2)
      posthog?.capture("lead_form_step_completed", { step: 1, offer_type: offerType })
    } catch {
      toast.error(t("errors.saveFailed"))
    } finally {
      setIsLoading(false)
    }
  }

  // Single-step submission for the marketing plan offer (email + description only)
  async function handleMarketingPlanSubmit() {
    const isValid = await form.trigger(["offerType", "email", "projectDescription"])
    if (!isValid) return

    const email = form.getValues("email")
    const projectDescription = form.getValues("projectDescription")
    setIsLoading(true)
    try {
      const step1Res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ step: 1, email, offerType: "marketing_plan", locale }),
      })
      if (!step1Res.ok) throw new Error("Step 1 failed")
      const step1Data = await step1Res.json()
      const newLeadId = step1Data.leadId as string
      setLeadId(newLeadId)

      const step3Res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ step: 3, leadId: newLeadId, projectDescription }),
      })
      if (!step3Res.ok) throw new Error("Step 3 failed")

      const metaEventId = newMetaEventId()
      const step4Res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          step: 4,
          leadId: newLeadId,
          colorPreference: "",
          reference: "",
          attachments: [],
          metaEventId,
        }),
      })
      if (!step4Res.ok) throw new Error("Step 4 failed")

      posthog?.capture("lead_form_submitted", {
        offer_type: "marketing_plan",
        attached_files: 0,
      })
      trackMetaEvent("Lead", { content_name: "", business_type: "" }, metaEventId)
      router.push("/dziekujemy")
    } catch {
      toast.error(t("errors.submitFailed"))
    } finally {
      setIsLoading(false)
    }
  }

  // Progressive Step 2 Save
  async function handleNextStep2() {
    const isStep2Valid = await form.trigger(["projectName", "businessType"])
    if (!isStep2Valid) return

    if (!leadId) {
      // Fallback if leadId was lost
      setCurrentStep(3)
      return
    }

    const projectName = form.getValues("projectName")
    const businessType = form.getValues("businessType")
    setIsLoading(true)
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ step: 2, leadId, projectName, businessType }),
      })
      if (!res.ok) throw new Error("Step 2 failed")
      setCurrentStep(3)
      posthog?.capture("lead_form_step_completed", { step: 2 })
    } catch {
      toast.error(t("errors.saveFailed"))
    } finally {
      setIsLoading(false)
    }
  }

  // Progressive Step 3 Save
  async function handleNextStep3() {
    const isStep3Valid = await form.trigger("projectDescription")
    if (!isStep3Valid) return

    if (!leadId) {
      setCurrentStep(4)
      return
    }

    const projectDescription = form.getValues("projectDescription")
    setIsLoading(true)
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ step: 3, leadId, projectDescription }),
      })
      if (!res.ok) throw new Error("Step 3 failed")
      setCurrentStep(4)
      posthog?.capture("lead_form_step_completed", { step: 3 })
    } catch {
      toast.error(t("errors.saveFailed"))
    } finally {
      setIsLoading(false)
    }
  }

  // Final Step 4 Submission
  async function handleFinalSubmit() {
    setIsLoading(true)
    try {
      const attachments = await uploadFiles(files)
      const metaEventId = newMetaEventId()
      const colorPreference = form.getValues("colorPreference")
      const reference = form.getValues("reference")
      const offerType = form.getValues("offerType")

      if (leadId) {
        const response = await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            step: 4,
            leadId,
            colorPreference,
            reference,
            attachments,
            metaEventId,
          }),
        })
        if (!response.ok) throw new Error("API error")
      } else {
        // Fallback for direct submission without leadId
        const values = form.getValues()
        const response = await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...values, attachments, metaEventId, locale }),
        })
        if (!response.ok) throw new Error("API error")
      }

      posthog?.capture("lead_form_submitted", {
        business_type: form.getValues("businessType"),
        project_name: form.getValues("projectName"),
        offer_type: offerType,
        attached_files: files.length,
      })
      trackMetaEvent(
        "Lead",
        { content_name: form.getValues("projectName"), business_type: form.getValues("businessType") },
        metaEventId
      )
      router.push("/dziekujemy")
    } catch (error) {
      const message =
        error instanceof UploadError
          ? t("errors.uploadFailed", { fileName: error.fileName })
          : t("errors.submitFailed")
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  const selectedOffer = form.watch("offerType") || "website_visualization"

  const trustSignals = [
    t("trustSignals.response"),
    selectedOffer === "marketing_plan" ? t("trustSignals.freeMarketingPlan") : t("trustSignals.freeVisualization"),
    t("trustSignals.noObligation"),
  ]

  const totalSteps = selectedOffer === "marketing_plan" ? 1 : 4

  const stepKey = (["step1", "step2", "step3", "step4"] as const)[currentStep - 1] ?? "step1"
  const currentExplanation = {
    title: t(`explanations.${stepKey}.title`),
    heading: t(`explanations.${stepKey}.heading`),
    text:
      currentStep === 1
        ? selectedOffer === "marketing_plan"
          ? t("explanations.step1.textMarketingPlan")
          : t("explanations.step1.textVisualization")
        : t(`explanations.${stepKey}.text`),
  }

  const makeVariants = (y: number, delay: number) => ({
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.5, delay },
    },
  })

  return (
    <section
      id={id}
      aria-label={t("sectionAria")}
      className={`py-24 md:py-38 relative overflow-hidden ${showBackground ? "bg-background" : ""}`}
    >
      {showBackground && (
        <div
          className="hero-blob absolute bottom-0 left-1/2 -translate-x-1/2 opacity-30 blur-3xl pointer-events-none"
          aria-hidden="true"
        />
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left column */}
          <div>
            <motion.h2
              variants={makeVariants(20, 0)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="font-sans font-extrabold tracking-tight text-4xl md:text-5xl lg:text-6xl text-foreground"
            >
              {headingContent}
            </motion.h2>

            <motion.p
              variants={makeVariants(10, 0.2)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="font-body text-base text-muted-foreground max-w-md mt-4"
            >
              {descriptionContent}
            </motion.p>

            <div className="mt-8 space-y-3">
              {trustSignals.map((text, i) => (
                <motion.div
                  key={text}
                  variants={makeVariants(10, 0.3 + i * 0.05)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground">{text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right column — multi-step form card */}
          <motion.div
            variants={makeVariants(30, 0.25)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="bg-card border border-border rounded-3xl p-6 md:p-10 shadow-sm"
          >
            {/* Progress bar & Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                <span>{currentExplanation.title}</span>
                <span>{t("stepProgress", { current: currentStep, total: totalSteps })}</span>
              </div>
              <div className="w-full bg-border/50 h-2 rounded-full overflow-hidden">
                <motion.div
                  className="bg-primary h-full rounded-full"
                  initial={{ width: `${100 / totalSteps}%` }}
                  animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* "Po co nam to?" Explanation Box */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`explanation-${currentStep}`}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.2 }}
                className="mb-6 p-4 rounded-2xl bg-primary/5 border border-primary/20 flex gap-3 items-start"
              >
                <Sparkles className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-xs">
                  <h4 className="font-semibold text-foreground mb-1">
                    {currentExplanation.heading}
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {currentExplanation.text}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            <Form {...form}>
              <form
                onSubmit={(e) => e.preventDefault()}
                onFocus={handleFormStart}
                aria-label={t("formAria")}
                className="flex flex-col gap-5"
              >
                <AnimatePresence mode="wait">
                  {/* STEP 1: Offer choice & Email */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step-1"
                      initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: shouldReduceMotion ? 0 : -20 }}
                      transition={{ duration: 0.25 }}
                      className="flex flex-col gap-4"
                    >
                      {/* Offer Type Selector (Rozgałęźnik) */}
                      <FormField
                        control={form.control}
                        name="offerType"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel className="text-sm font-medium text-foreground block">
                              {t("offerSelector.label")} <span className="text-primary">*</span>
                            </FormLabel>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <button
                                type="button"
                                onClick={() => field.onChange("website_visualization")}
                                className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col gap-2 relative cursor-pointer ${
                                  field.value === "website_visualization"
                                    ? "border-primary bg-primary/10 ring-2 ring-primary/20 shadow-sm"
                                    : "border-border bg-background hover:border-primary/50 hover:bg-muted/50"
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="p-2 rounded-xl bg-primary/10 text-primary">
                                    <Layout className="h-5 w-5" />
                                  </div>
                                  {field.value === "website_visualization" && (
                                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                                  )}
                                </div>
                                <div>
                                  <p className="font-semibold text-sm text-foreground">{t("offerSelector.visualization.title")}</p>
                                  <p className="text-xs text-muted-foreground mt-1 leading-snug">
                                    {t("offerSelector.visualization.description")}
                                  </p>
                                </div>
                              </button>

                              <button
                                type="button"
                                onClick={() => field.onChange("marketing_plan")}
                                className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col gap-2 relative cursor-pointer ${
                                  field.value === "marketing_plan"
                                    ? "border-primary bg-primary/10 ring-2 ring-primary/20 shadow-sm"
                                    : "border-border bg-background hover:border-primary/50 hover:bg-muted/50"
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="p-2 rounded-xl bg-primary/10 text-primary">
                                    <TrendingUp className="h-5 w-5" />
                                  </div>
                                  {field.value === "marketing_plan" && (
                                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                                  )}
                                </div>
                                <div>
                                  <p className="font-semibold text-sm text-foreground">{t("offerSelector.marketingPlan.title")}</p>
                                  <p className="text-xs text-muted-foreground mt-1 leading-snug">
                                    {t("offerSelector.marketingPlan.description")}
                                  </p>
                                </div>
                              </button>
                            </div>
                            <FormMessage className="text-xs text-destructive mt-1" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-foreground mb-1.5 block">
                              {t("fields.email.label")} <span className="text-primary">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder={t("fields.email.placeholder")}
                                aria-required="true"
                                className="rounded-xl border-border bg-background text-foreground placeholder:text-muted-foreground focus-visible:ring-primary h-12"
                                {...field}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" && selectedOffer !== "marketing_plan") {
                                    e.preventDefault()
                                    handleNextStep1()
                                  }
                                }}
                              />
                            </FormControl>
                            <FormMessage className="text-xs text-destructive mt-1" />
                          </FormItem>
                        )}
                      />

                      {selectedOffer === "marketing_plan" && (
                        <FormField
                          control={form.control}
                          name="projectDescription"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium text-foreground mb-1.5 block">
                                {t("fields.marketingDescription.label")} <span className="text-primary">*</span>
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder={t("fields.marketingDescription.placeholder")}
                                  aria-required="true"
                                  rows={4}
                                  className="rounded-xl border-border bg-background text-foreground placeholder:text-muted-foreground focus-visible:ring-primary resize-none"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-xs text-destructive mt-1" />
                            </FormItem>
                          )}
                        />
                      )}

                      <button
                        type="button"
                        onClick={handleNextStep1}
                        disabled={isLoading}
                        className="w-full rounded-full bg-primary text-primary-foreground px-6 py-3.5 text-sm font-medium hover:bg-accent transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed mt-2 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            {selectedOffer === "marketing_plan" ? t("buttons.sending") : t("buttons.saving")}
                          </>
                        ) : selectedOffer === "marketing_plan" ? (
                          t("buttons.submitMarketing")
                        ) : (
                          t("buttons.next")
                        )}
                      </button>
                    </motion.div>
                  )}

                  {/* STEP 2: Project Name & Business Type */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step-2"
                      initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: shouldReduceMotion ? 0 : -20 }}
                      transition={{ duration: 0.25 }}
                      className="flex flex-col gap-4"
                    >
                      <FormField
                        control={form.control}
                        name="projectName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-foreground mb-1.5 block">
                              {t("fields.projectName.label")} <span className="text-primary">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder={t("fields.projectName.placeholder")}
                                autoFocus
                                aria-required="true"
                                className="rounded-xl border-border bg-background text-foreground placeholder:text-muted-foreground focus-visible:ring-primary h-11"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-xs text-destructive mt-1" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="businessType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-foreground mb-1.5 block">
                              {t("fields.businessType.label")} <span className="text-primary">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder={t("fields.businessType.placeholder")}
                                aria-required="true"
                                className="rounded-xl border-border bg-background text-foreground placeholder:text-muted-foreground focus-visible:ring-primary h-11"
                                {...field}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault()
                                    handleNextStep2()
                                  }
                                }}
                              />
                            </FormControl>
                            <FormMessage className="text-xs text-destructive mt-1" />
                          </FormItem>
                        )}
                      />

                      <div className="flex gap-3 mt-3">
                        <button
                          type="button"
                          onClick={() => setCurrentStep(1)}
                          className="rounded-full border border-border text-foreground px-5 py-3 text-sm font-medium hover:bg-muted transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <ArrowLeft className="h-4 w-4" />
                          {t("buttons.back")}
                        </button>

                        <button
                          type="button"
                          onClick={handleNextStep2}
                          disabled={isLoading}
                          className="flex-1 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:bg-accent transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              {t("buttons.saving")}
                            </>
                          ) : (
                            t("buttons.next")
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: Project Description */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step-3"
                      initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: shouldReduceMotion ? 0 : -20 }}
                      transition={{ duration: 0.25 }}
                      className="flex flex-col gap-4"
                    >
                      <FormField
                        control={form.control}
                        name="projectDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-foreground mb-1.5 block">
                              {t("fields.projectDescription.label")} <span className="text-primary">*</span>
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder={t("fields.projectDescription.placeholder")}
                                autoFocus
                                aria-required="true"
                                rows={4}
                                className="rounded-xl border-border bg-background text-foreground placeholder:text-muted-foreground focus-visible:ring-primary resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-xs text-destructive mt-1" />
                          </FormItem>
                        )}
                      />

                      <div className="flex gap-3 mt-3">
                        <button
                          type="button"
                          onClick={() => setCurrentStep(2)}
                          className="rounded-full border border-border text-foreground px-5 py-3 text-sm font-medium hover:bg-muted transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <ArrowLeft className="h-4 w-4" />
                          {t("buttons.back")}
                        </button>

                        <button
                          type="button"
                          onClick={handleNextStep3}
                          disabled={isLoading}
                          className="flex-1 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:bg-accent transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              {t("buttons.saving")}
                            </>
                          ) : (
                            t("buttons.next")
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 4: Color, Reference & Logo Attachments */}
                  {currentStep === 4 && (
                    <motion.div
                      key="step-4"
                      initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: shouldReduceMotion ? 0 : -20 }}
                      transition={{ duration: 0.25 }}
                      className="flex flex-col gap-4"
                    >
                      {/* Color preference */}
                      <FormField
                        control={form.control}
                        name="colorPreference"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-foreground mb-1 block">
                              {t("fields.colorPreference.label")}{" "}
                              <span className="text-muted-foreground font-normal">{t("fields.colorPreference.optional")}</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder={t("fields.colorPreference.placeholder")}
                                className="rounded-xl border-border bg-background text-foreground placeholder:text-muted-foreground focus-visible:ring-primary h-11"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-xs text-destructive mt-1" />
                          </FormItem>
                        )}
                      />

                      {/* Reference */}
                      <FormField
                        control={form.control}
                        name="reference"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-foreground mb-1 block">
                              {t("fields.reference.label")}{" "}
                              <span className="text-muted-foreground font-normal">{t("fields.reference.optional")}</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder={t("fields.reference.placeholder")}
                                className="rounded-xl border-border bg-background text-foreground placeholder:text-muted-foreground focus-visible:ring-primary h-11"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-xs text-destructive mt-1" />
                          </FormItem>
                        )}
                      />

                      {/* File attachments */}
                      <div className="grid gap-2">
                        <Label
                          htmlFor="lead-files"
                          className="text-sm font-medium text-foreground mb-1 block"
                        >
                          {t("fields.files.label")}{" "}
                          <span className="text-muted-foreground font-normal">{t("fields.files.optional")}</span>
                        </Label>
                        <input
                          ref={fileInputRef}
                          type="file"
                          multiple
                          accept={ACCEPTED_FILE_TYPES}
                          className="sr-only"
                          id="lead-files"
                          onChange={(e) => handleFilesSelected(e.target.files)}
                        />
                        <label
                          htmlFor="lead-files"
                          className="flex items-center gap-2 rounded-xl border border-dashed border-border bg-background px-4 py-3 text-sm text-muted-foreground cursor-pointer transition-colors hover:border-primary hover:text-foreground"
                        >
                          <Paperclip className="h-4 w-4 flex-shrink-0" />
                          {t("fields.files.dropzone")}
                        </label>
                        {files.length > 0 && (
                          <ul className="flex flex-col gap-1.5">
                            {files.map((file, index) => (
                              <li
                                key={`${file.name}-${index}`}
                                className="flex items-center justify-between gap-2 rounded-lg bg-background px-3 py-2 text-xs text-foreground border border-border"
                              >
                                <span className="truncate">{file.name}</span>
                                <button
                                  type="button"
                                  onClick={() => removeFile(index)}
                                  aria-label={t("fields.files.removeAria", { fileName: file.name })}
                                  className="text-muted-foreground hover:text-destructive transition-colors flex-shrink-0 cursor-pointer"
                                >
                                  <X className="h-3.5 w-3.5" />
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      <div className="flex gap-3 mt-3">
                        <button
                          type="button"
                          onClick={() => setCurrentStep(3)}
                          className="rounded-full border border-border text-foreground px-5 py-3 text-sm font-medium hover:bg-muted transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <ArrowLeft className="h-4 w-4" />
                          {t("buttons.back")}
                        </button>

                        <button
                          type="button"
                          onClick={handleFinalSubmit}
                          disabled={isLoading}
                          aria-busy={isLoading}
                          className="flex-1 rounded-full bg-primary text-primary-foreground px-6 py-3.5 text-sm font-medium hover:bg-accent transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              {t("buttons.sending")}
                            </>
                          ) : selectedOffer === "marketing_plan" ? (
                            t("buttons.submitMarketing")
                          ) : (
                            t("buttons.submitVisualization")
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
