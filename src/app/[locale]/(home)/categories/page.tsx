import Breadcrumb, { BreadCrumbItemData } from '@/components/widgets/breadcrumb';
import CategoryList from '@/features/categories/category-list';
import CategorySort from '@/features/categories/category-sort';
import { getCategories } from '@/lib/api/categoryService';
import { CategorySortParams } from '@/lib/constants/category-sort';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const translation = await getTranslations('CategoryPage');

  return {
    title: translation('title'),
  };
}

export default async function CategoriesPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ sort?: CategorySortParams }>;
}) {
  const [{ locale }, { sort }, breadcrumbTranslations] = await Promise.all([
    params,
    searchParams,
    getTranslations('Breadcrumb'),
  ] as const);

  const categories = await getCategories({ locale, sort });

  const categoryBreadcrumbItems: BreadCrumbItemData[] = [
    {
      label: breadcrumbTranslations('home'),
      href: '/',
    },
    {
      label: breadcrumbTranslations('categories'),
    },
  ];
  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb items={categoryBreadcrumbItems} />
      <CategorySort />
      <CategoryList items={categories} />
    </div>
  );
}
