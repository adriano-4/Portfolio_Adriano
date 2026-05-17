import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);

const resend = new Resend("re_34bWy9dW_gnT2qgKDCHc4BqSPJEyKi3GK");
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Champs manquants" });
  }

  try {
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "tokyadriano45@gmail.com",
      subject: `Nouveau message de ${name}`,
      html: `
        <h2>Nouveau message depuis le portfolio</h2>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Message :</strong></p>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
      replyTo: email,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Erreur envoi email :", error);
    return res.status(500).json({ error: "Échec de l'envoi" });
  }
}
