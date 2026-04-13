"use client";

import { FormEvent, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";

const cards = [
  { title: "Initiation", text: "Comprendre les fondamentaux de l’IA, acculturer les équipes et sécuriser les premiers usages." },
  { title: "Intégration", text: "Inscrire l’intelligence artificielle dans les pratiques métier de façon concrète, utile et maîtrisée." },
  { title: "Automatisation", text: "Transformer certains processus en leviers durables de performance, de qualité et d’efficacité." },
];

const commitments = [
  "Approche pédagogique, opérationnelle et stratégique",
  "Adoption progressive et sécurisée",
  "Alignement avec les enjeux réels",
  "Transformation durable",
];

const clientSchema = z.object({
  name: z.string().min(2, "Veuillez renseigner votre nom."),
  organization: z.string().optional(),
  email: z.string().email("Veuillez renseigner une adresse email valide."),
  phone: z.string().optional(),
  message: z.string().min(10, "Votre message doit contenir au moins 10 caractères."),
});

type FormState = {
  name: string;
  organization: string;
  email: string;
  phone: string;
  message: string;
  website: string;
  companySize: string;
};

const initialForm = (): FormState => ({
  name: "",
  organization: "",
  email: "",
  phone: "",
  message: "",
  website: "",
  companySize: "",
});

export default function HomePage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const formspreeEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || "";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);
    setIsError(false);

    const validation = clientSchema.safeParse(form);
    if (!validation.success) {
      setIsSubmitting(false);
      setIsError(true);
      setFeedback(validation.error.issues[0]?.message || "Formulaire invalide.");
      return;
    }

    if (!formspreeEndpoint) {
      setIsSubmitting(false);
      setIsError(true);
      setFeedback("Le formulaire n’est pas encore configuré.");
      return;
    }

    if (form.website || form.companySize) {
      setIsSubmitting(false);
      setFeedback("Votre message a bien été envoyé.");
      setForm(initialForm());
      return;
    }

    try {
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: form.name,
          organization: form.organization,
          email: form.email,
          phone: form.phone,
          message: form.message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.errors?.[0]?.message || "Une erreur est survenue.");
      }

      setFeedback("Votre message a bien été envoyé.");
      setForm(initialForm());
    } catch (error) {
      setIsError(true);
      setFeedback(error instanceof Error ? error.message : "Impossible d’envoyer le message.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-altensia-deep text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-altensia-deep/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#" className="text-2xl font-semibold tracking-wide"><span className="text-altensia-cyan">A</span>LTENSIA</a>
          <nav className="hidden gap-8 text-sm text-white/80 md:flex">
            <a href="#approche" className="hover:text-white">Approche</a>
            <a href="#parcours" className="hover:text-white">Parcours</a>
            <a href="#engagements" className="hover:text-white">Engagements</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(25,227,255,0.35),transparent_35%)]" />
        <div className="absolute inset-x-0 top-[38%] h-56 rounded-t-[999px] bg-white/90 opacity-60 blur-3xl" />
        <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col items-center justify-center px-6 py-24 text-center">
          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-5xl text-4xl font-semibold leading-tight md:text-6xl">
            Accélérer la transformation digitale<br />par l’intelligence artificielle
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.1 }} className="mt-6 max-w-3xl text-base leading-8 text-white/80 md:text-lg">
            ALTENSIA accompagne les organisations grâce à une approche progressive : initiation, intégration et automatisation.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.95, delay: 0.2 }} className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a href="#contact" className="rounded-full bg-altensia-cyan px-7 py-3 text-sm font-semibold text-altensia-deep transition hover:scale-[1.02]">Prendre contact</a>
            <a href="#parcours" className="rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-white transition hover:border-white/40">Découvrir le parcours</a>
          </motion.div>
        </div>
      </section>

      <section id="approche" className="bg-white text-[#0B1C2C]">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center">
          <h2 className="text-3xl font-semibold md:text-4xl">Notre approche</h2>
          <p className="mx-auto mt-8 max-w-4xl text-base leading-8 text-slate-700 md:text-lg">
            ALTENSIA accompagne les organisations dans l’accélération de leur transformation digitale grâce à l’intelligence artificielle. Notre approche repose sur trois étapes complémentaires : l’initiation, pour comprendre et acculturer ; l’intégration, pour inscrire l’IA dans les pratiques ; l’automatisation, pour transformer les processus en leviers durables de performance.
          </p>
        </div>
      </section>

      <section id="parcours" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold md:text-4xl">Le parcours en 3 niveaux</h2>
          <p className="mt-4 text-white/70">Une progression claire pour faire de l’IA un levier de compréhension, d’efficacité et de transformation durable.</p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {cards.map((card, index) => (
            <motion.div key={card.title} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: index * 0.08 }} className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
              <h3 className="text-2xl font-semibold text-altensia-cyan">{card.title}</h3>
              <p className="mt-4 leading-7 text-white/75">{card.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="engagements" className="bg-altensia-deep2">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold md:text-4xl">Nos engagements</h2>
            <p className="mt-4 text-white/70">Une approche claire, structurée et orientée transformation.</p>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {commitments.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5 text-white/85">{item}</div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="relative overflow-hidden bg-altensia-deep">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(25,227,255,0.28),transparent_35%)]" />
        <div className="relative mx-auto max-w-6xl px-6 py-24">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-4xl font-semibold text-altensia-cyan">Contact</h2>
              <p className="mt-6 max-w-xl leading-8 text-white/75">Contactez ALTENSIA pour construire un dispositif de formation aligné sur vos enjeux et votre niveau de maturité IA.</p>
              <div className="mt-10 space-y-2 text-white/85">
                <p className="font-semibold">Hamid KHERBOUCHE</p>
                <p className="text-white/65">Consultant transformation digitale</p>
                <p><a href="mailto:hamid.kherbouche@altensia.fr" className="hover:text-altensia-cyan">hamid.kherbouche@altensia.fr</a></p>
                <p><a href="tel:+213557661738" className="hover:text-altensia-cyan">+213 557 66 17 38</a></p>
                <p><a href="https://wa.me/33658089982" target="_blank" rel="noreferrer" className="hover:text-altensia-cyan">0033 6 58 08 99 82</a></p>
                <p><a href="https://www.altensia.fr" className="hover:text-altensia-cyan">www.altensia.fr</a></p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur md:p-8" noValidate>
              <div className="grid gap-4">
                <input type="text" name="name" placeholder="Nom" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-white/45 outline-none" autoComplete="name" required />
                <input type="text" name="organization" placeholder="Organisation" value={form.organization} onChange={(e) => setForm({ ...form, organization: e.target.value })} className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-white/45 outline-none" autoComplete="organization" />
                <input type="email" name="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-white/45 outline-none" autoComplete="email" required />
                <input type="text" name="phone" placeholder="Téléphone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-white/45 outline-none" autoComplete="tel" />
                <textarea name="message" rows={5} placeholder="Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-white/45 outline-none" required />
                <input type="text" name="website" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} className="hidden" tabIndex={-1} autoComplete="off" />
                <input type="text" name="companySize" value={form.companySize} onChange={(e) => setForm({ ...form, companySize: e.target.value })} className="hidden" tabIndex={-1} autoComplete="off" />
                <button type="submit" disabled={isSubmitting} className="mt-2 rounded-full bg-altensia-cyan px-6 py-3 font-semibold text-altensia-deep transition hover:scale-[1.01] disabled:opacity-60">
                  {isSubmitting ? "Envoi en cours..." : "Envoyer"}
                </button>
                {feedback && <p className={isError ? "text-red-300" : "text-green-300"}>{feedback}</p>}
              </div>
            </form>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-altensia-deep px-6 py-8 text-center text-sm text-white/55">
        <div className="mx-auto max-w-5xl">
          <p>Faire de l’intelligence artificielle un levier de compréhension, d’efficacité et de transformation durable.</p>
          <p className="mt-2">© {currentYear} ALTENSIA. Tous droits réservés.</p>
        </div>
      </footer>
    </main>
  );
}
