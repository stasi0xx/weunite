import type { Metadata } from "next"
import CaseStudyDetail from "@/components/sections/case-studies/CaseStudyDetail"
import { getCaseStudyProject } from "@/components/sections/case-studies/data"
import ScrollToTop from "@/components/ui/ScrollToTop"

const project = getCaseStudyProject("gdynia-padel-club")!

export const metadata: Metadata = {
  title: project.title,
  description: project.teaser,
  alternates: { canonical: "https://www.weunite.pl/realizacje/gdynia-padel-club" },
}

export default function GdyniaPadelClubPage() {
  return (
    <>
      <ScrollToTop />
      <CaseStudyDetail project={project} />
    </>
  )
}
