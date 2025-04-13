import Breadcrumb, { BreadCrumbItemData } from '@/components/widgets/breadcrumb';
import ProductFilter from '@/features/products/product-filter';
import ProductSort from '@/features/products/product-sort';
import { getCategories } from '@/lib/api/categoryService';
import { ProductSortParams } from '@/lib/constants/product-sort';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import React from 'react';

export async function generateMetadata(): Promise<Metadata> {
  const translation = await getTranslations('ProductsPage');

  return {
    title: translation('title'),
  };
}

export default async function ProductsPageLayout({
  params,
  children,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ sort?: ProductSortParams }>;
  children: React.ReactNode;
}) {
  const [{ locale }, breadcrumbTranslations] = await Promise.all([
    params,
    getTranslations('Breadcrumb'),
  ] as const);

  const categories = await getCategories({ locale });

  const categoryBreadcrumbItems: BreadCrumbItemData[] = [
    {
      label: breadcrumbTranslations('home'),
      href: '/',
    },
    {
      label: breadcrumbTranslations('products'),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb items={categoryBreadcrumbItems} />
      <div className="flex flex-col gap-1">
        <ProductFilter categories={categories} />
        <ProductSort />
      </div>
      {children}
    </div>
  );
}
