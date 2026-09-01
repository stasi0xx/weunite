import type { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

interface HoverLinkProps extends ComponentProps<typeof Link> {
  bgClassName?: string;
  textClassName?: string;
}

// Renders next-intl's Link, not a plain <a>: it auto-prefixes internal paths
// (e.g. "/realizacje") with the current locale and passes fragments
// ("#services") and external/mailto/tel hrefs through unchanged — see
// docs/specs/0001-multi-language-support (AC-2, AC-3).
export function HoverLink({
  className,
  bgClassName = "rounded-full",
  textClassName = "text-muted-foreground",
  children,
  ...props
}: HoverLinkProps) {
  return (
    <Link className={cn("relative group cursor-pointer inline-flex items-center justify-center", className)} {...props}>
      <span
        className={cn(
          "absolute inset-0 bg-primary scale-0 group-hover:scale-100 origin-center transition-transform duration-200 ease-out",
          bgClassName
        )}
        aria-hidden="true"
      />
      <span
        className={cn(
          "relative z-10 group-hover:text-white transition-colors duration-200",
          textClassName
        )}
      >
        {children}
      </span>
    </Link>
  );
}
