"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { primaryNav } from "@/data/navigation";
import { site } from "@/data/site";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/cn";

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes the mobile menu and returns focus to the opener.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        openerRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // When the menu opens, move focus into the first menu item.
  useEffect(() => {
    if (open) {
      const first = menuRef.current?.querySelector<HTMLAnchorElement>("a");
      first?.focus();
    }
  }, [open]);

  // Anchor links from non-home pages route back to home + anchor.
  function resolveHref(href: string) {
    if (href.startsWith("#") && pathname !== "/") return `/${href}`;
    return href;
  }

  // aria-current for the current route. Anchor links stay unmarked because
  // they aren't a page in the routing sense.
  function isCurrent(href: string): boolean {
    if (href.startsWith("#")) return false;
    return pathname === href;
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-colors duration-[var(--duration-fast)]",
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "border-b border-transparent bg-background",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-[var(--container-max)] items-center justify-between px-6 md:px-8"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-foreground"
        >
          <span
            aria-hidden
            className="inline-flex size-7 items-center justify-center rounded-full border border-border-strong bg-surface-elevated font-mono text-[10px]"
          >
            VG
          </span>
          {site.name}
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {primaryNav.map((item) => {
            const href = resolveHref(item.href);
            const current = isCurrent(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={href}
                  aria-current={current ? "page" : undefined}
                  className={cn(
                    "inline-flex h-9 items-center rounded-full px-4 text-sm transition-colors duration-[var(--duration-fast)]",
                    item.cta
                      ? "border border-border-strong text-foreground hover:bg-surface"
                      : "text-secondary hover:text-foreground",
                    current && !item.cta && "text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
          <li className="ml-2">
            <ThemeToggle />
          </li>
        </ul>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            ref={openerRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="inline-flex size-9 items-center justify-center rounded-full border border-border text-secondary"
          >
            {open ? (
              <X strokeWidth={1.5} className="size-4" />
            ) : (
              <Menu strokeWidth={1.5} className="size-4" />
            )}
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-nav"
          ref={menuRef}
          className="border-t border-border bg-background md:hidden"
        >
          <ul className="mx-auto flex max-w-[var(--container-max)] flex-col gap-1 px-6 py-4">
            {primaryNav.map((item) => {
              const current = isCurrent(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={resolveHref(item.href)}
                    onClick={() => setOpen(false)}
                    aria-current={current ? "page" : undefined}
                    className={cn(
                      "flex h-11 items-center rounded-md px-3 text-md hover:bg-surface",
                      current
                        ? "text-foreground"
                        : "text-secondary hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
