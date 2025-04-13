import Breadcrumb, { BreadCrumbItemData } from '@/components/widgets/breadcrumb';
import { getDynamicPage } from '@/lib/api/dynamicPageService';
import { blockFactory } from '@/lib/factories/blockFactory';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  const { name, description } = await getDynamicPage({
    locale,
    slug,
  });

  return {
    title: name,
    description: description,
  };
}

export default async function DynamicPage({
  params,
}: {
  params: Promise<{
    locale: string;
    slugs: string[];
  }>;
}) {
  const [{ locale, slugs }, breadcrumbTranslations] = await Promise.all([
    params,
    getTranslations('Breadcrumb'),
  ] as const);

  if (slugs.length > 1) {
    notFound();
  }

  const slug = slugs[0];

  const { name, blocks } = await getDynamicPage({
    locale,
    slug,
  });

  const categoryBreadcrumbItems: BreadCrumbItemData[] = [
    {
      label: breadcrumbTranslations('home'),
      href: '/',
    },
    {
      label: name,
    },
  ];

  return (
    <div className="flex flex-col gap-4 xl:gap-6">
      <Breadcrumb items={categoryBreadcrumbItems} />
      {blocks.map((block) => blockFactory(block))}
    </div>
  );
}
