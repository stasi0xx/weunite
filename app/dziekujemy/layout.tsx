import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dziękujemy",
  robots: { index: false, follow: false },
};

export default function DziekujemyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
