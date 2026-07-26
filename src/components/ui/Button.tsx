import Link from "next/link";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  external?: boolean;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps & {
  href: string;
  /** Pass a string to override the downloaded filename (browser default is the URL basename). */
  download?: boolean | string;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const variants: Record<Variant, string> = {
  primary:
    "bg-foreground text-background hover:bg-foreground/90 border-transparent",
  secondary:
    "bg-transparent text-foreground border-border-strong hover:bg-surface",
  ghost:
    "bg-transparent text-secondary border-transparent hover:text-foreground hover:bg-surface",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-10 px-5 text-sm gap-2",
};

const base =
  "inline-flex items-center justify-center rounded-full border font-medium " +
  "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out)] " +
  "disabled:opacity-50 disabled:pointer-events-none";

export const Button = forwardRef<HTMLElement, ButtonProps>(function Button(
  props,
  ref,
) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
    external,
    ...rest
  } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in rest && rest.href !== undefined) {
    const { href, download, ...linkRest } = rest as ButtonAsLink;
    const isExternal =
      external ?? (href.startsWith("http") || href.startsWith("mailto:"));

    if (isExternal) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          target={href.startsWith("mailto:") ? undefined : "_blank"}
          rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
          download={download}
          {...linkRest}
        >
          {children}
          {!href.startsWith("mailto:") && (
            <ArrowUpRight aria-hidden className="size-3.5" strokeWidth={1.5} />
          )}
        </a>
      );
    }

    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={classes}
        download={download}
        {...linkRest}
      >
        {children}
      </Link>
    );
  }

  const { ...buttonRest } = rest as ButtonAsButton;
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={classes}
      {...buttonRest}
    >
      {children}
    </button>
  );
});
