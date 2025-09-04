
import { Resend } from "resend";

export const runtime = "nodejs";

function isValidEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function POST(request) {
    try {
        const { name = "", email = "", phone = "", message = "" } = (await request.json());

        if (!name.trim() || !isValidEmail(email)) {
            return Response.json({ ok: false, error: "Nome ou e-mail inválidos" }, { status: 400 });
        }

        const resend = new Resend(process.env.RESEND_API_KEY);
        const from = process.env.FROM_EMAIL || "Mentoria <onboarding@resend.dev>"; // use domínio verificado em produção
        const to = process.env.TO_EMAIL || "voce@seuemail.com";

        console.log(from, to, email)

        const { data, error } = await resend.emails.send({
            from,
            to: [to],
            reply_to: email,
            subject: "Mentoria — Novo contato",
            text: [
                "Novo contato pela landing page",
                "",
                `Nome: ${name}`,
                `Email: ${email}`,
                `Celular: ${phone}`,
                message ? `Mensagem: ${message}` : "",
            ].join("\n"),
        });

        if (error) return Response.json({ ok: false, error: String(error) }, { status: 500 });
        return Response.json({ ok: true, id: data?.id }, { status: 200 });
    } catch (err) {
        return Response.json({ ok: false, error: err?.message ?? "Erro inesperado" }, { status: 500 });
    }
}
