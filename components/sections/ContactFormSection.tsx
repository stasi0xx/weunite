"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion, useReducedMotion } from "framer-motion"
import { CheckCircle, Loader2, Paperclip, X } from "lucide-react"
import { toast } from "sonner"
import { usePostHog } from "posthog-js/react"
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

const formSchema = z.object({
  name: z.string().min(2, "Podaj swoje imię i nazwisko"),
  projectName: z.string().min(2, "Podaj nazwę projektu lub firmy"),
  businessType: z.string().min(1, "Wybierz rodzaj działalności"),
  projectDescription: z.string().min(10, "Opisz krótko swój projekt"),
  colorPreference: z.string().optional(),
  reference: z.string().optional(),
  email: z.string().email("Podaj poprawny adres email"),
})

type FormValues = z.infer<typeof formSchema>

const MAX_FILES = 5
const MAX_FILE_SIZE_MB = 10
const ACCEPTED_FILE_TYPES =
  "image/jpeg,image/png,image/webp,image/gif,application/pdf,.doc,.docx"

const TRUST_SIGNALS = [
  "Odpowiadamy w ciągu 24h",
  "Bezpłatna wizualizacja strony",
  "Zero zobowiązań",
]

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
}

export default function ContactFormSection({
  id = "contact",
  heading = (
    <>
      Bezpłatna
      <br />
      wizualizacja
    </>
  ),
  description = (
    <>
      Opisz projekt swojej strony. Wrócimy do Ciebie w ciągu 24 godzin z gotową wizualizacją Twojej nowej strony.
    </>
  ),
  showBackground = true,
}: ContactFormSectionProps) {
  const router = useRouter()
  const shouldReduceMotion = useReducedMotion()
  const [isLoading, setIsLoading] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const posthog = usePostHog()
  const formStartedRef = useRef(false)

  function handleFormStart() {
    if (formStartedRef.current) return
    formStartedRef.current = true
    posthog?.capture("lead_form_started")
  }

  function handleFilesSelected(fileList: FileList | null) {
    if (!fileList) return
    const incoming = Array.from(fileList).filter((file) => {
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        toast.error(`Plik "${file.name}" przekracza ${MAX_FILE_SIZE_MB} MB`)
        return false
      }
      return true
    })
    setFiles((prev) => {
      const combined = [...prev, ...incoming]
      if (combined.length > MAX_FILES) {
        toast.error(`Możesz dołączyć maksymalnie ${MAX_FILES} plików`)
        return combined.slice(0, MAX_FILES)
      }
      return combined
    })
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      projectName: "",
      businessType: "",
      projectDescription: "",
      colorPreference: "",
      reference: "",
      email: "",
    },
  })

  async function onSubmit(values: FormValues) {
    setIsLoading(true)
    try {
      const attachments = await uploadFiles(files)
      // Shared with the server-side Conversions API call so Meta counts one lead, not two.
      const metaEventId = newMetaEventId()
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, attachments, metaEventId }),
      })
      if (!response.ok) throw new Error("API error")
      posthog?.capture("lead_form_submitted", {
        business_type: values.businessType,
        project_name: values.projectName,
        attached_files: files.length,
      })
      trackMetaEvent(
        "Lead",
        { content_name: values.projectName, business_type: values.businessType },
        metaEventId
      )
      router.push("/dziekujemy")
    } catch (error) {
      const message =
        error instanceof UploadError
          ? `Nie udało się przesłać pliku "${error.fileName}". Spróbuj ponownie.`
          : "Coś poszło nie tak. Spróbuj ponownie lub napisz do nas bezpośrednio."
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
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
      aria-label="Formularz kontaktowy"
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
              {heading}
            </motion.h2>

            <motion.p
              variants={makeVariants(10, 0.2)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="font-body text-base text-muted-foreground max-w-md mt-4"
            >
              {description}
            </motion.p>

            <div className="mt-8 space-y-3">
              {TRUST_SIGNALS.map((text, i) => (
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

          {/* Right column — form card */}
          <motion.div
            variants={makeVariants(30, 0.25)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="bg-card border border-border rounded-3xl p-6 md:p-10"
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                onFocus={handleFormStart}
                aria-label="Formularz zgłoszeniowy"
                className="flex flex-col gap-5"
              >
                {/* Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground mb-1.5">
                        Imię i nazwisko
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Jan Kowalski"
                          aria-required="true"
                          className="rounded-xl border-border bg-background text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-destructive mt-1" />
                    </FormItem>
                  )}
                />

                {/* Project name / company */}
                <FormField
                  control={form.control}
                  name="projectName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground mb-1.5">
                        Nazwa projektu / firmy
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="np. InPost"
                          aria-required="true"
                          className="rounded-xl border-border bg-background text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-destructive mt-1" />
                    </FormItem>
                  )}
                />

                {/* Business type */}
                <FormField
                  control={form.control}
                  name="businessType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground mb-1.5">
                        Rodzaj działalności
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="np. Sklep internetowy"
                          aria-required="true"
                          className="rounded-xl border-border bg-background text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-destructive mt-1" />
                    </FormItem>
                  )}
                />

                {/* Project description */}
                <FormField
                  control={form.control}
                  name="projectDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground mb-1.5">
                        Opis projektu
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Chcę, aby strona była nowoczesna z funkcją rezerwacji..."
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

                {/* Color preference */}
                <FormField
                  control={form.control}
                  name="colorPreference"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground mb-1.5">
                        Kolorystyka{" "}
                        <span className="text-muted-foreground font-normal">(opcjonalnie)</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="np. jasny niebieski, neonowy..."
                          className="rounded-xl border-border bg-background text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
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
                      <FormLabel className="text-sm font-medium text-foreground mb-1.5">
                        Referencja{" "}
                        <span className="text-muted-foreground font-normal">(opcjonalnie)</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Tutaj wklej stronę, na której mamy bazować."
                          className="rounded-xl border-border bg-background text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-destructive mt-1" />
                    </FormItem>
                  )}
                />

                {/* File attachments (optional) */}
                <div className="grid gap-2">
                  <Label
                    htmlFor="lead-files"
                    className="text-sm font-medium text-foreground mb-1.5"
                  >
                    Dołącz logo{" "}
                    <span className="text-muted-foreground font-normal">(opcjonalnie)</span>
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
                    Wybierz pliki lub przeciągnij tutaj
                  </label>
                  {files.length > 0 && (
                    <ul className="flex flex-col gap-1.5">
                      {files.map((file, index) => (
                        <li
                          key={`${file.name}-${index}`}
                          className="flex items-center justify-between gap-2 rounded-lg bg-background px-3 py-2 text-xs text-foreground"
                        >
                          <span className="truncate">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            aria-label={`Usuń plik ${file.name}`}
                            className="text-muted-foreground hover:text-destructive transition-colors flex-shrink-0"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground mb-1.5">
                        Adres email
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="jan@biznes.pl"
                          aria-required="true"
                          className="rounded-xl border-border bg-background text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-destructive mt-1" />
                    </FormItem>
                  )}
                />

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  aria-busy={isLoading}
                  onClick={() => posthog?.capture("cta_clicked", { location: "contact_form_submit" })}
                  className="w-full rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:bg-accent transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed mt-2 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Wysyłamy...
                    </>
                  ) : (
                    "Wyślij →"
                  )}
                </button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
