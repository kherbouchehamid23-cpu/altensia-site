export default function OffresPage() {
  const offers = [
    {
      title: "Initiation",
      subtitle: "Comprendre les fondamentaux et sécuriser les premiers usages",
      points: [
        "Découvrir les principes clés de l’intelligence artificielle",
        "Acculturer les équipes aux usages professionnels",
        "Identifier les premières opportunités de mise en pratique",
        "Adopter de bonnes pratiques en matière de qualité, d’éthique et de confidentialité",
      ],
    },
    {
      title: "Intégration",
      subtitle: "Faire de l’IA un levier concret d’efficacité dans les pratiques métier",
      points: [
        "Identifier les tâches à plus forte valeur ajoutée pour l’IA",
        "Structurer des cas d’usage adaptés aux métiers",
        "Améliorer la productivité individuelle et collective",
        "Encadrer les usages dans une logique cohérente et maîtrisée",
      ],
    },
    {
      title: "Automatisation",
      subtitle: "Transformer certains processus en leviers durables de performance",
      points: [
        "Repérer les processus automatisables à fort potentiel",
        "Concevoir des workflows intelligents et pilotés",
        "Articuler IA, outils numériques et supervision humaine",
        "Mesurer les gains attendus et sécuriser la mise en œuvre",
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-altensia-deep text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(25,227,255,0.22),transparent_35%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-altensia-cyan/90">
            ALTENSIA
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">
            Nos offres
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/75 md:text-lg">
            Un parcours structuré pour faire de l’intelligence artificielle
            un levier de compréhension, d’efficacité et de transformation durable.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-8 md:grid-cols-3">
          {offers.map((offer) => (
            <article
              key={offer.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur"
            >
              <p className="text-sm font-medium uppercase tracking-wider text-altensia-cyan">
                Offre
              </p>
              <h2 className="mt-3 text-3xl font-semibold">{offer.title}</h2>
              <p className="mt-4 text-white/75">{offer.subtitle}</p>

              <ul className="mt-8 space-y-3 text-white/80">
                {offer.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-altensia-cyan" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-white/10 bg-altensia-deep2">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center">
          <h2 className="text-3xl font-semibold md:text-4xl">
            Échanger sur votre besoin
          </h2>
          <p className="mx-auto mt-6 max-w-3xl leading-8 text-white/75">
            ALTENSIA accompagne une montée en maturité progressive, depuis
            l’acculturation des équipes jusqu’à l’automatisation de processus
            à forte valeur ajoutée.
          </p>

          <div className="mt-10">
            <a
              href="/#contact"
              className="inline-flex rounded-full bg-altensia-cyan px-7 py-3 text-sm font-semibold text-altensia-deep transition hover:scale-[1.02]"
            >
              Prendre contact
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
