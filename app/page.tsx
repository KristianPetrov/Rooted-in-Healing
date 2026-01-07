import Link from "next/link";
import Image from "next/image";
import OrganizationShowcase from "./components/OrganizationShowcase";

export default function Home ()
{
  return (
    <div className="min-h-screen bg-background text-foreground">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-card focus:px-4 focus:py-2 focus:text-sm focus:text-foreground focus:ring-2 focus:ring-accent"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-3 font-semibold tracking-tight"
          >
            <span className="relative h-9 w-9 overflow-hidden rounded-xl bg-accent/10 ring-1 ring-accent/30">
              <Image
                src="/rooted-in-healing-logo.png"
                alt="Rooted in Healing logo"
                fill
                priority
                sizes="36px"
                className="object-cover object-top"
              />
            </span>
            <span className="text-base">
              Rooted <span className="text-muted">in</span> Healing
            </span>
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-muted md:flex">
            <a className="hover:text-foreground" href="#vision">
              Vision &amp; Mission
            </a>
            <a className="hover:text-foreground" href="#services">
              Support
            </a>
            <a className="hover:text-foreground" href="#organizations">
              Organizations
            </a>
            <a className="hover:text-foreground" href="#process">
              Process
            </a>
            <a className="hover:text-foreground" href="#focus">
              Pathways
            </a>
            <a className="hover:text-foreground" href="#contact">
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden rounded-full border border-border/80 bg-card px-4 py-2 text-sm text-foreground shadow-sm hover:border-border md:inline-flex"
            >
              Connect
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-accent px-4 py-2 text-sm font-medium text-background shadow-sm ring-1 ring-accent/60 hover:brightness-105"
            >
              Reach out
            </a>
          </div>
        </div>
      </header>

      <main id="content">
        <section className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
          >
            <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
            <div className="absolute -right-24 top-24 h-72 w-72 rounded-full bg-accent-2/20 blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(176,141,87,0.08),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(111,127,91,0.08),transparent_50%)]" />
          </div>

          <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
            <div className="mb-10 flex justify-center md:mb-12">
              <Image
                src="/rooted-in-healing-logo.png"
                alt="Rooted in Healing logo"
                width={1040}
                height={1040}
                priority
                sizes="(max-width: 768px) 80vw, (max-width: 1024px) 560px, 640px"
                className="h-auto w-full max-w-116 md:max-w-lg lg:max-w-160"
              />
            </div>
            <div className="grid items-start gap-10 md:grid-cols-12">
              <div className="relative md:col-span-7">
                <p className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-surface px-3 py-1 text-xs text-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Indigenous-led healing • Red Road Journeys • Sacred Circle
                </p>

                <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight md:text-6xl">
                  Return to your roots. Reclaim identity. Walk the Red Road of
                  wellness.
                </h1>

                <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted md:text-lg">
                  Rooted in Healing is an Indigenous-led organization dedicated
                  to strengthening the Red Road Journeys of our relatives—walking
                  alongside our people through ceremony, community, traditional
                  teachings, and connection to the land.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-background shadow-sm ring-1 ring-accent/60 hover:brightness-105"
                  >
                    Connect with us
                  </a>
                  <a
                    href="#vision"
                    className="inline-flex items-center justify-center rounded-full border border-border/80 bg-card px-5 py-2.5 text-sm font-medium text-foreground shadow-sm hover:border-border"
                  >
                    Read our Vision &amp; Mission
                  </a>
                </div>

                <dl className="mt-10 grid max-w-xl grid-cols-3 gap-6 text-sm">
                  <div className="rounded-2xl border border-border/70 bg-card/60 p-4">
                    <dt className="text-muted">Support</dt>
                    <dd className="mt-1 font-medium">Elders &amp; ceremony</dd>
                  </div>
                  <div className="rounded-2xl border border-border/70 bg-card/60 p-4">
                    <dt className="text-muted">Rooted in</dt>
                    <dd className="mt-1 font-medium">Community</dd>
                  </div>
                  <div className="rounded-2xl border border-border/70 bg-card/60 p-4">
                    <dt className="text-muted">Balance</dt>
                    <dd className="mt-1 font-medium">Mind • Body • Spirit</dd>
                  </div>
                </dl>
              </div>

              <aside className="md:col-span-5">
                <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-[0_1px_0_0_rgba(255,255,255,0.04)]">
                  <p className="text-sm font-medium">What we walk alongside</p>
                  <ul className="mt-4 space-y-3 text-sm text-muted">
                    <li className="flex gap-3">
                      <span className="mt-1 h-2 w-2 flex-none rounded-full bg-accent" />
                      Supporting cultural recovery programs rooted in tradition
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-1 h-2 w-2 flex-none rounded-full bg-accent-2" />
                      Connecting relatives to Indigenous pathways of healing
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-1 h-2 w-2 flex-none rounded-full bg-accent" />
                      Returning to the Sacred Circle through community and
                      traditional teachings
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-1 h-2 w-2 flex-none rounded-full bg-accent-2" />
                      Restoring balance through ceremony and connection to the
                      land
                    </li>
                  </ul>

                  <div className="mt-6 rounded-2xl border border-border/70 bg-surface p-4">
                    <p className="text-xs uppercase tracking-wide text-muted">
                      Ideal for
                    </p>
                    <p className="mt-2 text-sm text-foreground">
                      Relatives seeking cultural pathways of healing and
                      community-based recovery support.
                    </p>
                  </div>
                </div>

                <div className="mt-6 rounded-3xl border border-border/70 bg-card p-6">
                  <p className="text-sm font-medium">Your next conversation</p>
                  <p className="mt-2 text-sm text-muted">
                    Share what you’re seeking. We’ll listen, honor your story,
                    and help identify culturally rooted supports and next steps.
                  </p>
                  <a
                    href="#contact"
                    className="mt-4 inline-flex w-full items-center justify-center rounded-2xl border border-border/80 bg-background px-4 py-2.5 text-sm font-medium text-foreground hover:border-border"
                  >
                    Reach out to begin
                  </a>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section id="vision" className="border-t border-border/70">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Vision &amp; Mission
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
              Rooted in tradition. Restoring balance in mind, body, spirit, and
              connection to the land.
            </p>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              <div className="rounded-3xl border border-border/70 bg-card p-6">
                <p className="text-xs font-medium tracking-wide text-muted">
                  Vision
                </p>
                <p className="mt-3 text-sm leading-relaxed text-foreground">
                  Where relatives can return to their roots, reclaim their
                  identity and walk the red road of wellness, supported by
                  elders, ceremony, community, and the wisdom of Indigenous
                  healing practices rooted in tradition and restoring balance in
                  mind, body, spirit, and connection to the land.
                </p>
              </div>

              <div className="rounded-3xl border border-border/70 bg-card p-6">
                <p className="text-xs font-medium tracking-wide text-muted">
                  Mission
                </p>
                <p className="mt-3 text-sm leading-relaxed text-foreground">
                  Rooted in Healing is an Indigenous-led organization dedicated
                  to strengthening the Red Road Journeys of our relatives by
                  helping our people return to the Sacred Circle, supporting
                  cultural recovery programs, and connecting relatives to
                  Indigenous pathways of healing. We walk alongside our people
                  through ceremony, community, traditional teachings, and the
                  land so that recovery is rooted in culture, not systems that
                  erased it.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="border-t border-border/70">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  How we support Red Road Journeys
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                  We strengthen cultural recovery by supporting programs and
                  helping relatives connect to Indigenous pathways of healing.
                </p>
              </div>
              <a
                href="#contact"
                className="inline-flex w-fit items-center justify-center rounded-full bg-accent px-4 py-2 text-sm font-medium text-background shadow-sm ring-1 ring-accent/60 hover:brightness-105"
              >
                Connect
              </a>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Cultural recovery support",
                  desc: "Support for culturally rooted recovery efforts—strengthening programs that center tradition and belonging.",
                },
                {
                  title: "Connection to elders & community",
                  desc: "We help relatives find supportive community, guidance, and culturally grounded ways of healing.",
                },
                {
                  title: "Ceremony & traditional teachings",
                  desc: "Walking alongside through ceremony and traditional teachings—honoring what restoration can look like.",
                },
                {
                  title: "Land-based connection",
                  desc: "Support that restores balance through connection to the land and Indigenous wellness practices.",
                },
                {
                  title: "Sacred Circle support",
                  desc: "Helping relatives return to the Sacred Circle with practical, compassionate next steps and follow-through.",
                },
                {
                  title: "Pathway navigation",
                  desc: "Connecting relatives to Indigenous pathways of healing and culturally aligned recovery supports.",
                },
              ].map((s) => (
                <div
                  key={s.title}
                  className="group rounded-3xl border border-border/70 bg-card p-6 shadow-[0_1px_0_0_rgba(255,255,255,0.04)]"
                >
                  <div className="flex items-start gap-4">
                    <span className="grid h-10 w-10 place-items-center rounded-2xl bg-accent/15 ring-1 ring-accent/25">
                      <span
                        aria-hidden="true"
                        className="h-2.5 w-2.5 rounded-full bg-accent"
                      />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold">{s.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="organizations" className="border-t border-border/70">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  Organizations we work with
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                  We collaborate with community partners whose work strengthens
                  healing, belonging, and practical support.
                </p>
              </div>
            </div>

            <div className="mt-10">
              <OrganizationShowcase
                name="Set Free Anaheim"
                href="https://www.setfreeanaheim.com/"
                images={[
                  {
                    src: "/godfather.JPG",
                    alt: "Set Free Anaheim community photo",
                  },
                  {
                    src: "/phil-sunday-setfree-hat.jpg",
                    alt: "Set Free Anaheim event photo (hat)",
                  },
                  {
                    src: "/phil-sunday-magic-side.jpg",
                    alt: "Set Free Anaheim event photo (magic side)",
                  },
                ]}
              />
            </div>
          </div>
        </section>

        <section id="process" className="border-t border-border/70">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              A simple, grounded way of walking together
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
              We begin with listening and relationship—then move with care,
              community, and cultural grounding.
            </p>

            <ol className="mt-10 grid gap-5 md:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Listen + honor",
                  desc: "We start with your story, your needs, and what wellness and safety mean for you and your family.",
                },
                {
                  step: "02",
                  title: "Connect + support",
                  desc: "We connect you to culturally rooted supports—elders, ceremony, community, and traditional teachings.",
                },
                {
                  step: "03",
                  title: "Walk the next steps",
                  desc: "We keep it practical: clear next steps, check-ins, and support that stays rooted in culture and land.",
                },
              ].map((p) => (
                <li
                  key={p.step}
                  className="rounded-3xl border border-border/70 bg-card p-6"
                >
                  <p className="text-xs font-medium tracking-wide text-muted">
                    {p.step}
                  </p>
                  <h3 className="mt-2 text-base font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {p.desc}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="focus" className="border-t border-border/70">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-5">
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  Pathways of healing we center
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  A grounded set of supports that restore connection, identity,
                  and balance.
                </p>
              </div>
              <div className="lg:col-span-7">
                <div className="flex flex-wrap gap-2">
                  {[
                    "Elders",
                    "Ceremony",
                    "Community",
                    "Traditional teachings",
                    "Sacred Circle",
                    "Identity reclamation",
                    "Land-based wellness",
                    "Mind • Body • Spirit balance",
                    "Cultural recovery programs",
                    "Indigenous pathways of healing",
                  ].map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border/70 bg-surface px-3 py-1 text-sm text-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-8 rounded-3xl border border-border/70 bg-card p-6">
                  <p className="text-sm font-medium">
                    What “rooted in culture” means
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    Healing supported by elders, ceremony, community, and the
                    wisdom of Indigenous healing practices—restoring balance in
                    mind, body, spirit, and connection to the land.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-border/70">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Grounded, community-centered support
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
              A few words people often use to describe the experience.
            </p>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {[
                {
                  quote:
                    "I felt seen and supported. The experience helped me reconnect with who I am and where I come from.",
                  who: "Relative (anonymous)",
                },
                {
                  quote:
                    "The support was practical and caring—grounded in community and tradition.",
                  who: "Community member",
                },
                {
                  quote:
                    "It helped restore balance in mind, body, and spirit—and strengthened my connection to the land.",
                  who: "Relative (anonymous)",
                },
              ].map((t, idx) => (
                <figure
                  key={`${t.who}-${idx}`}
                  className="rounded-3xl border border-border/70 bg-card p-6"
                >
                  <blockquote className="text-sm leading-relaxed text-foreground">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-4 text-sm text-muted">
                    {t.who}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="border-t border-border/70">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <div className="rounded-3xl border border-border/70 bg-[radial-gradient(circle_at_20%_20%,rgba(176,141,87,0.18),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(111,127,91,0.14),transparent_50%)] p-1">
              <div className="rounded-[22px] bg-card p-8 md:p-10">
                <div className="grid gap-8 md:grid-cols-12 md:items-center">
                  <div className="md:col-span-8">
                    <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                      Ready to connect?
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                      Share what you’re seeking. We’ll listen with care and
                      respond with culturally grounded support and next steps.
                    </p>
                  </div>
                  <div className="md:col-span-4">
                    <div className="rounded-3xl border border-border/70 bg-surface p-5">
                      <p className="text-xs uppercase tracking-wide text-muted">
                        Contact
                      </p>
                      <a
                        href="mailto:rootedinhealing657@gmail.com"
                        className="mt-2 block text-sm font-medium text-foreground hover:underline"
                      >
                        rootedinhealing657@gmail.com
                      </a>
                      <a
                        href="tel:+17148051963"
                        className="mt-2 block text-sm font-medium text-foreground hover:underline"
                      >
                        +1 (714) 805-1963
                      </a>

                    </div>
                    <a
                      href="mailto:rootedinhealing657@gmail.com?subject=Connect%20-%20Rooted%20in%20Healing"
                      className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-accent px-4 py-2.5 text-sm font-medium text-background ring-1 ring-accent/60 hover:brightness-105"
                    >
                      Email to connect
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <span className="relative h-8 w-8 overflow-hidden rounded-lg bg-accent/10 ring-1 ring-accent/25">
              <Image
                src="/rooted-in-healing-logo.png"
                alt="Rooted in Healing logo"
                fill
                sizes="32px"
                className="object-cover object-top"
              />
            </span>
            <p className="text-sm text-muted">
              © {new Date().getFullYear()} Rooted in Healing. All rights reserved.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-muted">
            <a className="hover:text-foreground" href="#vision">
              Vision &amp; Mission
            </a>
            <a className="hover:text-foreground" href="#services">
              Support
            </a>
            <a className="hover:text-foreground" href="#organizations">
              Organizations
            </a>
            <a className="hover:text-foreground" href="#process">
              Process
            </a>
            <a className="hover:text-foreground" href="#contact">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
