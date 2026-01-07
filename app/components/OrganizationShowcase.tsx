"use client";

import { useEffect, useId, useMemo, useState } from "react";
import Image from "next/image";

type ShowcaseImage = {
    src: string;
    alt: string;
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
        <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-[0_1px_0_0_rgba(255,255,255,0.04)]">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                    <p className="text-sm font-medium text-foreground">{name}</p>
                    <p className="mt-1 text-sm text-muted">
                        {href ? "Tap the slideshow to visit their site." : "Website link coming soon."}
                    </p>
                </div>
                {/* <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-fit items-center justify-center rounded-full bg-accent px-4 py-2 text-sm font-medium text-background shadow-sm ring-1 ring-accent/60 hover:brightness-105"
                    aria-label={`Visit ${name} website (opens in a new tab)`}
                >
                    Visit {name}
                </a> */}
            </div>

            <div
                className="relative mt-6 overflow-hidden rounded-3xl border border-border/70 bg-surface"
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
                    <div className="pointer-events-none absolute left-3 top-3 z-20">
                        <div className="rounded-2xl  px-3 py-2 ">
                            <div className="relative h-12 w-[230px] sm:h-14 sm:w-[280px]">
                                <Image
                                    src={logo.src}
                                    alt={logo.alt}
                                    fill
                                    sizes="(max-width: 640px) 230px, 280px"
                                    className="object-contain object-left"
                                />
                            </div>
                        </div>
                    </div>
                ) : null}

                <div className="relative aspect-16/10 w-full">
                    {safeImages.map((img, idx) => (
                        <div
                            key={`${img.src}-${idx}`}
                            className={[
                                "absolute inset-0 transition-opacity duration-700",
                                idx === active ? "opacity-100" : "opacity-0",
                            ].join(" ")}
                            aria-hidden={idx === active ? "false" : "true"}
                        >
                            <div className="absolute inset-0 bg-background/30 p-3">
                                <div className="relative h-full w-full">
                                    <Image
                                        src={img.src}
                                        alt={img.alt}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 800px"
                                        className="object-contain"
                                        priority={idx === 0}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-linear-to-t from-background/70 to-transparent p-4">
                    <p className="pointer-events-none text-sm font-medium text-foreground">
                        {name}
                    </p>
                </div>

                <div className="absolute inset-y-0 left-0 z-20 flex items-center px-3">
                    <button
                        type="button"
                        onClick={(e) =>
                        {
                            e.preventDefault();
                            e.stopPropagation();
                            goPrev();
                        }}
                        className="rounded-full border border-border/70 bg-background/70 px-3 py-2 text-sm text-foreground backdrop-blur hover:bg-background/85 focus:outline-none focus:ring-2 focus:ring-accent"
                        aria-controls={sliderId}
                        aria-label="Previous photo"
                    >
                        Prev
                    </button>
                </div>

                <div className="absolute inset-y-0 right-0 z-20 flex items-center px-3">
                    <button
                        type="button"
                        onClick={(e) =>
                        {
                            e.preventDefault();
                            e.stopPropagation();
                            goNext();
                        }}
                        className="rounded-full border border-border/70 bg-background/70 px-3 py-2 text-sm text-foreground backdrop-blur hover:bg-background/85 focus:outline-none focus:ring-2 focus:ring-accent"
                        aria-controls={sliderId}
                        aria-label="Next photo"
                    >
                        Next
                    </button>
                </div>

                <div
                    id={sliderId}
                    className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2"
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
                                "h-2.5 w-2.5 rounded-full ring-1 ring-border/70 transition",
                                idx === active ? "bg-accent" : "bg-background/70 hover:bg-background/85",
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


