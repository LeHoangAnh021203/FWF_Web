"use client";

import { FormEvent, useState } from "react";
import { ChevronDown } from "lucide-react";

import { faqCategories } from "@/data/faq";

type SubmitState = "idle" | "loading" | "success" | "error";

export default function FaqContactSection() {
  const [openCategory, setOpenCategory] = useState("");
  const [openQuestion, setOpenQuestion] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitState("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestType: "quote",
          fullName: fullName.trim(),
          phone: phone.trim(),
          email: email.trim(),
          note: message.trim(),
        }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(data?.error || "Không gửi được tin nhắn. Vui lòng thử lại.");
      }

      setSubmitState("success");
      setFullName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (error) {
      setSubmitState("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Đã có lỗi xảy ra. Vui lòng thử lại.",
      );
    }
  };

  return (
    <section className="faq-shell" aria-labelledby="faq-heading">
      <div className="faq-card">
        <div className="faq-card-left">
          <h1 id="faq-heading">FAQS</h1>
          <p className="faq-card-lead">
            Những câu hỏi thường gặp về Face Wash Fox. Xem thêm tại{" "}
            <a href="/dich-vu">Dịch vụ</a> nếu cần chi tiết liệu trình.
          </p>

          <ul className="faq-category-list">
            {faqCategories.map((category) => {
              const isCategoryOpen = openCategory === category.title;

              return (
                <li
                  key={category.title}
                  className={isCategoryOpen ? "faq-category is-open" : "faq-category"}
                >
                  <button
                    type="button"
                    className="faq-category-trigger"
                    aria-expanded={isCategoryOpen}
                    onClick={() => {
                      setOpenCategory(isCategoryOpen ? "" : category.title);
                      setOpenQuestion("");
                    }}
                  >
                    <span>{category.title}</span>
                    <ChevronDown aria-hidden="true" />
                  </button>

                  <div className="faq-category-panel">
                    <ul className="faq-accordion">
                      {category.items.map((item) => {
                        const id = `${category.title}::${item.question}`;
                        const isOpen = openQuestion === id;

                        return (
                          <li key={id} className={isOpen ? "is-open" : undefined}>
                            <button
                              type="button"
                              aria-expanded={isOpen}
                              onClick={() => setOpenQuestion(isOpen ? "" : id)}
                            >
                              <span>{item.question}</span>
                              <ChevronDown aria-hidden="true" />
                            </button>
                            <div className="faq-accordion-panel">
                              <p>{item.answer}</p>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="faq-card-right">
          <h2>CHƯA TÌM THẤY CÂU TRẢ LỜI?</h2>
          <p>Đừng ngại liên hệ với chúng tôi</p>

          <form className="faq-contact-form" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="faq-name">
              Họ và tên
            </label>
            <input
              id="faq-name"
              name="fullName"
              type="text"
              required
              placeholder="Họ và tên"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              autoComplete="name"
            />

            <label className="sr-only" htmlFor="faq-email">
              Email
            </label>
            <input
              id="faq-email"
              name="email"
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
            />

            <label className="sr-only" htmlFor="faq-phone">
              Số điện thoại
            </label>
            <input
              id="faq-phone"
              name="phone"
              type="tel"
              required
              placeholder="Số điện thoại"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              autoComplete="tel"
            />

            <label className="sr-only" htmlFor="faq-message">
              Nội dung
            </label>
            <textarea
              id="faq-message"
              name="message"
              required
              rows={5}
              placeholder="Nội dung"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />

            <button type="submit" disabled={submitState === "loading"}>
              {submitState === "loading" ? "ĐANG GỬI..." : "GỬI TIN NHẮN"}
            </button>

            {submitState === "success" ? (
              <p className="faq-form-status is-success" role="status">
                Đã gửi thành công. Chúng tôi sẽ liên hệ bạn sớm.
              </p>
            ) : null}
            {submitState === "error" ? (
              <p className="faq-form-status is-error" role="alert">
                {errorMessage}
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}
