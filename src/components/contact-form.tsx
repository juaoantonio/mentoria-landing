import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Mail } from "lucide-react";
import { Container, Section } from "../App";
import { showToast } from "./custom-toast";

type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  website?: string; // honeypot
};

export function ContactForm() {
  const [sending, setSending] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactPayload>({
    defaultValues: { name: "", email: "", phone: "", message: "", website: "" },
    mode: "onBlur",
  });

  const mutation = useMutation({
    mutationFn: async (payload: ContactPayload) => {
      // Honeypot anti-bot
      if (payload.website) {
        // finge sucesso para bots
        return { ok: true, id: "skipped-honeypot" };
      }

      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 15000); // 15s timeout

      try {
        const res = await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: payload.name,
            email: payload.email,
            phone: payload.phone,
            message: payload.message,
          }),
          signal: controller.signal,
        });

        let json: any = null;
        try {
          json = await res.json();
        } catch {
          /* pode não ter corpo */
        }

        if (!res.ok || json?.ok === false) {
          const msg = json?.error || `Falha no envio (${res.status})`;
          throw new Error(msg);
        }

        return json;
      } finally {
        clearTimeout(id);
      }
    },
    onMutate: () => {
      showToast({
        title: "Enviando...",
        variant: "loading",
      });
    },
    onSuccess: () => {
      showToast({
        title: "Contato enviado!",
        description: "Vou te responder ainda hoje 😊",
        variant: "success",
      });
      reset();
    },
    onError: (err: any) => {
      const msg =
        err?.name === "AbortError"
          ? "Tempo de envio excedido. Tente novamente."
          : err?.message || "Não foi possível enviar agora. Tente novamente.";
      showToast({
        title: "Erro ao enviar",
        description: msg,
        variant: "error",
      });
    },
    onSettled: () => setSending(false),
  });

  const onSubmit = handleSubmit((data) => {
    setSending(true);
    mutation.mutate(data);
  });

  return (
    <Section id="contato">
      <Container>
        <div className="mx-auto max-w-2xl rounded-2xl border border-buff/20 bg-night p-6 shadow-[var(--shadow-soft)]">
          <h2 className="text-center text-2xl font-bold">Vamos conversar?</h2>
          <p className="mt-2 text-center text-buff/80">
            Preencha seus dados que eu entro em contato. Respondo geralmente no
            mesmo dia útil.
          </p>

          <form
            onSubmit={onSubmit}
            className="mt-6 grid grid-cols-1 gap-4"
            noValidate
          >
            {/* Honeypot (não remover) */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
              {...register("website")}
            />

            <div className="grid gap-1.5">
              <label htmlFor="name" className="text-sm text-buff/70">
                Nome
              </label>
              <input
                id="name"
                aria-invalid={!!errors.name}
                placeholder="Seu nome completo"
                className={`rounded-xl border bg-night-2 px-4 py-3 outline-none focus:border-beaver/60 ${
                  errors.name ? "border-red-400" : "border-buff/20"
                }`}
                {...register("name", {
                  required: "Informe seu nome.",
                  minLength: { value: 3, message: "Mínimo de 3 caracteres." },
                })}
              />
              {errors.name && (
                <span className="text-xs text-red-300">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className="grid gap-1.5">
              <label htmlFor="email" className="text-sm text-buff/70">
                Email
              </label>
              <input
                id="email"
                type="email"
                aria-invalid={!!errors.email}
                placeholder="voce@email.com"
                className={`rounded-xl border bg-night-2 px-4 py-3 outline-none focus:border-beaver/60 ${
                  errors.email ? "border-red-400" : "border-buff/20"
                }`}
                {...register("email", {
                  required: "Informe seu e-mail.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "E-mail inválido.",
                  },
                })}
              />
              {errors.email && (
                <span className="text-xs text-red-300">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="grid gap-1.5">
              <label htmlFor="phone" className="text-sm text-buff/70">
                Celular
              </label>
              <input
                id="phone"
                placeholder="(91) 9 9999-9999"
                className="rounded-xl border border-buff/20 bg-night-2 px-4 py-3 outline-none focus:border-beaver/60"
                {...register("phone")}
              />
            </div>

            <div className="grid gap-1.5">
              <label htmlFor="message" className="text-sm text-buff/70">
                Mensagem (opcional)
              </label>
              <textarea
                id="message"
                rows={4}
                placeholder="Conte rapidamente seu objetivo (ex.: quero tirar meu primeiro projeto do papel)"
                className="rounded-xl border border-buff/20 bg-night-2 px-4 py-3 outline-none focus:border-beaver/60"
                {...register("message")}
              />
            </div>

            <button
              type="submit"
              disabled={sending || mutation.isPending}
              aria-busy={sending || mutation.isPending}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-buff px-5 py-3 font-semibold text-night transition hover:opacity-95 disabled:opacity-60"
            >
              {sending || mutation.isPending
                ? "Enviando..."
                : "Quero saber mais"}
              <Mail className="size-5" />
            </button>

            <p className="text-center text-xs text-buff/60">
              Seus dados são enviados com segurança e você recebe retorno no seu
              e-mail.
            </p>
          </form>
        </div>
      </Container>
    </Section>
  );
}
