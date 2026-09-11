export const OPEN_CONSULTATION_BOOKING = "fwf:open-consultation-booking";

export const CONSULT_BOOKING_SOURCE_FAB = "Đặt lịch tư vấn từ website";
export const CONSULT_BOOKING_SOURCE_OFFERS =
  "Đặt lịch từ ưu đãi trải nghiệm lần đầu";

export type OpenConsultationBookingDetail = {
  source?: string;
};

export function warmupConsultationLocation() {
  try {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      () => undefined,
      () => undefined,
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      },
    );
  } catch {
    // Browser may block geolocation outside a trusted gesture.
  }
}

export function openConsultationBooking(source = CONSULT_BOOKING_SOURCE_FAB) {
  warmupConsultationLocation();
  window.dispatchEvent(
    new CustomEvent<OpenConsultationBookingDetail>(OPEN_CONSULTATION_BOOKING, {
      detail: { source },
    }),
  );
}
