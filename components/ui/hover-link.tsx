import { cn } from "@/lib/utils";

interface HoverLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  bgClassName?: string;
  textClassName?: string;
}

export function HoverLink({
  className,
  bgClassName = "rounded-full",
  textClassName = "text-muted-foreground",
  children,
  ...props
}: HoverLinkProps) {
  return (
    <a className={cn("relative group cursor-pointer inline-flex items-center justify-center", className)} {...props}>
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
    </a>
  );
}
