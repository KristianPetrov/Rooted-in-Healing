"use client";

import { useEffect, useId, useMemo, useState } from "react";
import Image from "next/image";

type ShowcaseImage = {
    src: string;
    alt: string;
    objectPosition?: string;
    fit?: "cover" | "contain";
};

type ShowcaseLogo = {
    src: string;
    alt: string;
};

type OrganizationShowcaseProps = {
    name: string;
    href?: string;
    logo?: ShowcaseLogo;
    images: ShowcaseImage[];
};

export default function OrganizationShowcase ({
    name,
    href,
    logo,
    images,
}: OrganizationShowcaseProps)
{
    const [active, setActive] = useState(0);
    const sliderId = useId();
    const imageCountLabel = `${images.length || 1} photo${images.length === 1 ? "" : "s"}`;

    const safeImages = useMemo(
        () => (images.length ? images : [{ src: "/rooted-in-healing-logo.png", alt: `${name} logo` }]),
        [images, name],
    );

    useEffect(() =>
    {
        if (safeImages.length <= 1) return;

        const id = window.setInterval(() =>
        {
            setActive((idx) => (idx + 1) % safeImages.length);
        }, 4500);

        return () => window.clearInterval(id);
    }, [safeImages.length]);

    const goPrev = () => setActive((idx) => (idx - 1 + safeImages.length) % safeImages.length);
    const goNext = () => setActive((idx) => (idx + 1) % safeImages.length);

    return (
        <div className="group rounded-[32px] border border-border/70 bg-linear-to-br from-card via-card to-surface/70 p-6 shadow-[0_1px_0_0_rgba(255,255,255,0.05),0_20px_60px_rgba(0,0,0,0.22)] transition-transform duration-300 hover:-translate-y-1">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted">
                        Partner showcase
                    </p>
                    <p className="mt-2 text-lg font-semibold text-foreground">{name}</p>
                    <p className="mt-1 text-sm text-muted">
                        {href ? "Tap the slideshow to visit their site." : "Website link coming soon."}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="inline-flex items-center rounded-full border border-border/70 bg-background/60 px-3 py-1 text-xs font-medium text-muted backdrop-blur">
                        {imageCountLabel}
                    </span>
                    {href ? (
                        <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center rounded-full border border-accent/35 bg-accent/12 px-4 py-2 text-sm font-medium text-foreground shadow-[0_8px_24px_rgba(176,141,87,0.2)] transition hover:border-accent/50 hover:bg-accent/18"
                            aria-label={`Visit ${name} website (opens in a new tab)`}
                        >
                            Visit site
                        </a>
                    ) : null}
                </div>
            </div>

            <div
                className="relative mt-6 overflow-hidden rounded-[28px] border border-border/70 bg-surface shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_24px_55px_rgba(0,0,0,0.24)]"
                aria-roledescription="carousel"
                aria-label={`${name} photo slideshow`}
            >
                {href ? (
                    <>
                        {/* Click-through overlay (buttons sit above it) */}
                        <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute inset-0 z-10"
                            aria-label={`Open ${name} website (opens in a new tab)`}
                        />
                    </>
                ) : null}

                {logo ? (
                    <div className="pointer-events-none absolute left-4 top-4 z-20">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={logo.src}
                            alt={logo.alt}
                            className="block h-12 w-auto max-w-[calc(100vw-5rem)] object-contain object-left drop-shadow-[0_14px_28px_rgba(0,0,0,0.85)] sm:h-14 sm:max-w-[280px]"
                        />
                    </div>
                ) : null}

                <div className="relative aspect-16/10 w-full">
                    {safeImages.map((img, idx) => (
                        <div
                            key={`${img.src}-${idx}`}
                            className={[
                                "absolute inset-0 transition-all duration-700",
                                idx === active ? "opacity-100" : "opacity-0",
                            ].join(" ")}
                            aria-hidden={idx === active ? "false" : "true"}
                        >
                            <div className="absolute inset-0 bg-background/18" />
                            <div className="absolute inset-3">
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 800px"
                                    className={[
                                        "transition-transform duration-1600 ease-out",
                                        img.fit === "contain" ? "object-contain" : "object-cover",
                                        idx === active || img.fit === "contain" ? "scale-100" : "scale-105",
                                    ].join(" ")}
                                    style={img.objectPosition ? { objectPosition: img.objectPosition } : undefined}
                                    priority={idx === 0}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 z-10 h-28 bg-linear-to-b from-background/60 via-background/15 to-transparent"
                />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-linear-to-t from-background/92 via-background/38 to-transparent"
                />

                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-5">
                    <div className="flex items-end justify-between gap-3">
                        <div>
                            <p className="pointer-events-none text-base font-semibold text-foreground">
                                {name}
                            </p>
                            <p className="pointer-events-none mt-1 text-xs uppercase tracking-[0.2em] text-muted">
                                Community partner
                            </p>
                        </div>
                        <div className="pointer-events-none rounded-full border border-white/12 bg-background/55 px-3 py-1 text-xs font-medium text-foreground/90 backdrop-blur">
                            {String(active + 1).padStart(2, "0")} / {String(safeImages.length).padStart(2, "0")}
                        </div>
                    </div>
                </div>

                <div className="absolute inset-y-0 left-0 z-20 flex items-center px-4">
                    <button
                        type="button"
                        onClick={(e) =>
                        {
                            e.preventDefault();
                            e.stopPropagation();
                            goPrev();
                        }}
                        className="rounded-full border border-white/14 bg-background/68 px-3 py-2 text-sm font-medium text-foreground shadow-[0_10px_24px_rgba(0,0,0,0.28)] backdrop-blur transition hover:bg-background/82 focus:outline-none focus:ring-2 focus:ring-accent"
                        aria-controls={sliderId}
                        aria-label="Previous photo"
                    >
                        Prev
                    </button>
                </div>

                <div className="absolute inset-y-0 right-0 z-20 flex items-center px-4">
                    <button
                        type="button"
                        onClick={(e) =>
                        {
                            e.preventDefault();
                            e.stopPropagation();
                            goNext();
                        }}
                        className="rounded-full border border-white/14 bg-background/68 px-3 py-2 text-sm font-medium text-foreground shadow-[0_10px_24px_rgba(0,0,0,0.28)] backdrop-blur transition hover:bg-background/82 focus:outline-none focus:ring-2 focus:ring-accent"
                        aria-controls={sliderId}
                        aria-label="Next photo"
                    >
                        Next
                    </button>
                </div>

                <div
                    id={sliderId}
                    className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/12 bg-background/55 px-3 py-2 shadow-[0_12px_30px_rgba(0,0,0,0.3)] backdrop-blur"
                >
                    {safeImages.map((_, idx) => (
                        <button
                            key={`dot-${idx}`}
                            type="button"
                            onClick={(e) =>
                            {
                                e.preventDefault();
                                e.stopPropagation();
                                setActive(idx);
                            }}
                            className={[
                                "h-2.5 w-2.5 rounded-full ring-1 ring-white/18 transition",
                                idx === active ? "scale-110 bg-accent" : "bg-background/70 hover:bg-background/90",
                            ].join(" ")}
                            aria-label={`Go to photo ${idx + 1}`}
                            aria-current={idx === active ? "true" : "false"}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}


