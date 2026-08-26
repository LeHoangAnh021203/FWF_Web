"use client"

import { useState } from "react"

import { branches } from "@/data/branches"
import { Button } from "@/components/b2b/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/b2b/ui/dialog"
import { useLanguage } from "@/i18n/language-context"

export function BookingSection() {
  const { t } = useLanguage()
  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [note, setNote] = useState("")
  const [selectedBranchId] = useState(branches[0]?.id ?? 1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [submitSuccess, setSubmitSuccess] = useState("")

  const handleSubmitBooking = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitError("")
    setSubmitSuccess("")

    if (!fullName.trim() || !phone.trim()) {
      setSubmitError(t("b2b.booking.required"))
      return
    }

    const selectedBranch = branches.find((branch) => branch.id === selectedBranchId)
    if (!selectedBranch) {
      setSubmitError(t("b2b.booking.branchMissing"))
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: fullName.trim(),
          phone: phone.trim(),
          email: email.trim(),
          note: note.trim(),
          branchId: selectedBranch.id,
          branchName: selectedBranch.name,
          branchAddress: selectedBranch.address,
          branchCity: selectedBranch.city,
          branchMapsUrl: selectedBranch.mapsUrl,
          nearestDistanceKm: null,
        }),
      })

      if (!response.ok) {
        throw new Error("BOOKING_SUBMIT_FAILED")
      }

      setSubmitSuccess(t("b2b.booking.success"))
      setFullName("")
      setPhone("")
      setEmail("")
      setNote("")
    } catch {
      setSubmitError(t("b2b.booking.fail"))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="booking" className="bg-gradient-to-b from-white via-orange-50 to-white py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <a
            href="tel:0889866666"
            className="flex h-14 w-full items-center justify-center rounded-[14px] bg-orange-500 px-6 text-center text-lg font-extrabold text-white transition-opacity hover:opacity-90 md:h-16 md:px-8 md:text-[1.65rem]"
          >
            {t("b2b.booking.phoneCta")}
          </a>
          <h2 className="mb-4 pt-5 text-xl font-bold text-black md:text-3xl">{t("b2b.booking.title")}</h2>
          <p className="mb-8 text-sm leading-7 text-muted-foreground md:text-[16px]">
            {t("b2b.booking.subtitle")}
          </p>
          <form className="mt-8 space-y-6 md:mt-10" onSubmit={handleSubmitBooking}>
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <input
                  id="booking-name"
                  type="text"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder={t("b2b.booking.namePh")}
                  required
                  className="h-14 w-full rounded-[14px] border border-orange-200 bg-orange-50 px-5 text-base text-[#111827] outline-none placeholder:text-[#8b96a5] focus:border-orange-400 md:text-[1.15rem]"
                />
              </div>
              <div>
                <input
                  id="booking-phone"
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder={t("b2b.booking.phonePh")}
                  required
                  className="h-14 w-full rounded-[14px] border border-orange-200 bg-orange-50 px-5 text-base text-[#111827] outline-none placeholder:text-[#8b96a5] focus:border-orange-400 md:text-[1.15rem]"
                />
              </div>
            </div>

            <div>
              <input
                id="booking-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={t("b2b.booking.emailPh")}
                className="h-14 w-full rounded-[14px] border border-orange-200 bg-orange-50 px-5 text-base text-[#111827] outline-none placeholder:text-[#8b96a5] focus:border-orange-400 md:text-[1.15rem]"
              />
            </div>

            <div>
              <textarea
                id="booking-note"
                rows={4}
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder={t("b2b.booking.notePh")}
                className="w-full rounded-[14px] border border-orange-200 bg-orange-50 px-5 py-4 text-base text-[#111827] outline-none placeholder:text-[#8b96a5] focus:border-orange-400 md:text-[1.15rem]"
              />
            </div>

            {submitError ? <p className="text-[0.95rem] text-[#dc2626]">{submitError}</p> : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="h-14 w-full rounded-[14px] bg-orange-500 px-8 text-lg font-extrabold text-white transition-opacity hover:opacity-90 md:h-16 md:text-[1.65rem]"
            >
              {isSubmitting ? t("b2b.booking.sending") : t("b2b.booking.submit")}
            </button>
          </form>
        </div>
      </div>
      <Dialog open={Boolean(submitSuccess)} onOpenChange={(open) => !open && setSubmitSuccess("")}>
        <DialogContent className="border-orange-200 bg-white text-orange-950 sm:max-w-md">
          <DialogHeader className="space-y-3 text-center">
            <DialogTitle className="text-2xl">{t("b2b.booking.successTitle")}</DialogTitle>
          </DialogHeader>
          <p className="text-center text-base leading-7 text-stone-600">{submitSuccess}</p>
          <Button
            type="button"
            className="w-full bg-orange-500 text-white hover:bg-orange-600"
            onClick={() => setSubmitSuccess("")}
          >
            {t("b2b.booking.close")}
          </Button>
        </DialogContent>
      </Dialog>
    </section>
  )
}
