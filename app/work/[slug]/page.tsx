import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudy from "../../components/CaseStudy";
import { projects, getProject } from "../../data/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return project
    ? {
        title: `${project.title} — Varun Patil`,
        description: project.summary,
        alternates: { canonical: `/work/${project.slug}/` },
        openGraph: {
          title: `${project.title} — Varun Patil`,
          description: project.summary,
          url: `/work/${project.slug}/`,
        },
      }
    : { title: "Not found — Varun Patil" };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const index = projects.findIndex((item) => item.slug === slug);
  const next = projects[(index + 1) % projects.length];
  return (
    <CaseStudy
      project={project}
      next={{ title: next.title, slug: next.slug }}
    />
  );
}
