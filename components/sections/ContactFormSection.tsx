"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion, useReducedMotion } from "framer-motion"
import { CheckCircle, Loader2 } from "lucide-react"
import { toast } from "sonner"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const formSchema = z.object({
  name: z.string().min(2, "Podaj swoje imię i nazwisko"),
  email: z.string().email("Podaj poprawny adres email"),
  businessType: z.string().min(1, "Wybierz rodzaj działalności"),
  serviceInterest: z.string().min(1, "Wybierz interesującą Cię usługę"),
})

type FormValues = z.infer<typeof formSchema>

const BUSINESS_TYPES = [
  "Domki letniskowe",
  "Apartamenty na wynajem",
  "Pensjonat / hotel",
  "Inny rodzaj biznesu",
]

const SERVICE_INTERESTS = [
  "Strona internetowa + system rezerwacji",
  "Zarządzanie social media",
  "Automatyzacje",
  "Wszystkie usługi",
]

const TRUST_SIGNALS = [
  "Odpowiadamy w ciągu 24h",
  "Bezpłatna wizualizacja strony",
  "Zero zobowiązań",
]

export default function ContactFormSection() {
  const router = useRouter()
  const shouldReduceMotion = useReducedMotion()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      businessType: "",
      serviceInterest: "",
    },
  })

  async function onSubmit(values: FormValues) {
    setIsLoading(true)
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
      if (!response.ok) throw new Error("API error")
      const { lead_id } = await response.json()
      router.push(`/booking?lead=${lead_id}`)
    } catch {
      toast.error("Coś poszło nie tak. Spróbuj ponownie lub napisz do nas bezpośrednio.")
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
      id="contact"
      aria-label="Formularz kontaktowy"
      className="py-24 md:py-38 bg-background relative overflow-hidden"
    >
      <div
        className="hero-blob absolute bottom-0 left-1/2 -translate-x-1/2 opacity-30 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left column */}
          <div>
            <motion.p
              variants={makeVariants(10, 0)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="text-xs font-medium tracking-widest uppercase text-muted-foreground"
            >
              BEZPŁATNA KONSULTACJA
            </motion.p>

            <motion.h2
              variants={makeVariants(20, 0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="font-sans font-extrabold tracking-tight text-4xl md:text-5xl lg:text-6xl text-foreground mt-4"
            >
              Zacznijmy
              <br />
              razem.
            </motion.h2>

            <motion.p
              variants={makeVariants(10, 0.2)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="font-body text-base text-muted-foreground max-w-md mt-4"
            >
              Powiedz nam, co robisz i co Cię interesuje.
              Wrócimy do Ciebie w ciągu 24 godzin z planem działania i bezpłatną wizualizacją Twojej strony.
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
                            placeholder="jan@domkiletniskowe.pl"
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
                          <Select
                            value={field.value}
                            onValueChange={(value) => field.onChange(value)}
                          >
                            <SelectTrigger
                              aria-required="true"
                              className="w-full rounded-xl border-border bg-background text-foreground focus-visible:ring-primary data-placeholder:text-muted-foreground"
                            >
                              <SelectValue placeholder="Wybierz..." />
                            </SelectTrigger>
                            <SelectContent>
                              {BUSINESS_TYPES.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage className="text-xs text-destructive mt-1" />
                      </FormItem>
                    )}
                  />

                  {/* Service interest */}
                  <FormField
                    control={form.control}
                    name="serviceInterest"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-foreground mb-1.5">
                          Co Cię interesuje?
                        </FormLabel>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={(value) => field.onChange(value)}
                          >
                            <SelectTrigger
                              aria-required="true"
                              className="w-full rounded-xl border-border bg-background text-foreground focus-visible:ring-primary data-placeholder:text-muted-foreground"
                            >
                              <SelectValue placeholder="Wybierz usługę..." />
                            </SelectTrigger>
                            <SelectContent>
                              {SERVICE_INTERESTS.map((service) => (
                                <SelectItem key={service} value={service}>
                                  {service}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
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
                    className="w-full rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:bg-accent transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed mt-2 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Wysyłamy...
                      </>
                    ) : (
                      "Zgłoś się po bezpłatną konsultację →"
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
