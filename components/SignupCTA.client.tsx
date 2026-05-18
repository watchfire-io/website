"use client";

import { useState, type FormEvent } from "react";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SUCCESS_MESSAGE = "Thanks. We will be in touch.";
const GENERIC_ERROR = "Something went wrong. Please try again.";
const INVALID_EMAIL = "Please enter a valid email address.";

type StatusType = "idle" | "loading" | "success" | "error";

interface Status {
  type: StatusType;
  message: string;
}

export default function SignupForm({ endpoint }: { endpoint: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>({ type: "idle", message: "" });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const honeypotEl = form.elements.namedItem("website") as HTMLInputElement | null;
    if (honeypotEl && honeypotEl.value.length > 0) {
      return;
    }
    const formEndpoint = form.dataset.formEndpoint ?? "";
    const trimmed = email.trim();
    if (!EMAIL_PATTERN.test(trimmed)) {
      setStatus({ type: "error", message: INVALID_EMAIL });
      return;
    }

    if (!formEndpoint) {
      setStatus({ type: "success", message: SUCCESS_MESSAGE });
      setEmail("");
      return;
    }

    setStatus({ type: "loading", message: "" });
    try {
      const res = await fetch(formEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email: trimmed }),
      });
      if (res.ok) {
        setStatus({ type: "success", message: SUCCESS_MESSAGE });
        setEmail("");
        return;
      }
      let message = GENERIC_ERROR;
      try {
        const text = await res.text();
        const trimmedText = text.trim();
        if (trimmedText && trimmedText.length > 0 && trimmedText.length <= 160) {
          message = trimmedText;
        }
      } catch {
        // fall back to generic error
      }
      setStatus({ type: "error", message });
    } catch {
      setStatus({ type: "error", message: GENERIC_ERROR });
    }
  }

  const isLoading = status.type === "loading";

  return (
    // TODO: wire to Buttondown by setting NEXT_PUBLIC_BUTTONDOWN_ENDPOINT
    <form
      onSubmit={handleSubmit}
      data-form-endpoint={endpoint ?? ""}
      noValidate={false}
      className="w-full"
    >
      <label htmlFor="signup-email" className="sr-only">
        Email address
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="signup-email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="you@domain.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status.type === "error") {
              setStatus({ type: "idle", message: "" });
            }
          }}
          aria-describedby="signup-status"
          aria-invalid={status.type === "error"}
          disabled={isLoading}
          className="w-full flex-1 rounded-lg border border-zinc-300 bg-white/80 px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 shadow-sm transition-colors focus:border-fire-500 focus:outline-none focus:ring-2 focus:ring-fire-500/40 disabled:opacity-70 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-white dark:placeholder-zinc-500 dark:focus:border-fire-400 dark:focus:ring-fire-400/40"
        />
        {/* Honeypot — must remain visually hidden and skipped from tab order */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="sr-only"
          aria-hidden="true"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="shine group inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-br from-fire-500 to-ember-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(224,112,64,0.3)] transition-all hover:from-fire-400 hover:to-ember-400 hover:shadow-[0_10px_40px_rgba(224,112,64,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-80 dark:focus-visible:ring-offset-zinc-950 sm:py-3"
        >
          {isLoading ? (
            <>
              <span
                aria-hidden="true"
                className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white motion-reduce:animate-none"
              />
              <span>Subscribing…</span>
            </>
          ) : (
            <>
              <span>Subscribe</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </>
          )}
        </button>
      </div>
      <div
        id="signup-status"
        role="status"
        aria-live="polite"
        className="mt-3 min-h-[1.25rem] text-sm"
      >
        {status.type === "success" && (
          <span className="text-fire-600 dark:text-fire-300">{status.message}</span>
        )}
        {status.type === "error" && (
          <span className="text-red-600 dark:text-red-400">{status.message}</span>
        )}
      </div>
    </form>
  );
}
