import { notFound } from 'next/navigation';
import { INITIAL_TEMPLATES } from '../../../src/data/templates';
import { DemoClientView } from './DemoClientView';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return INITIAL_TEMPLATES.map((tmpl) => ({
    id: tmpl.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const template = INITIAL_TEMPLATES.find((t) => t.id === id);
  if (!template) return { title: 'Template Demo | Samen Online' };

  return {
    title: `${template.name} • Live Demo | Samen Online`,
    description: `Bekijk de interactieve live demo van het ${template.name} concept op Samen Online.`,
  };
}

export default async function DemoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const template = INITIAL_TEMPLATES.find((t) => t.id === id);

  if (!template) {
    notFound();
  }

  return <DemoClientView template={template} />;
}
