import Breadcrumb, { BreadCrumbItemData } from '@/components/widgets/breadcrumb';
import SearchResult from '@/features/search/search-result';
import SearchSection from '@/features/search/search-section';
import { searchProductWithName } from '@/lib/api/productService';
import { Product } from '@/types/products/Product';
import { getTranslations } from 'next-intl/server';

export default async function SearchPage({
  searchParams,
  params,
}: {
  searchParams: Promise<{ q?: string }>;
  params: Promise<{ locale: string }>;
}) {
  const { q } = await searchParams;
  const { locale } = await params;

  const search = q ? decodeURI(q) : undefined;

  const breadcrumbTranslations = await getTranslations('Breadcrumb');
  const categoryBreadcrumbItems: BreadCrumbItemData[] = [
    {
      label: breadcrumbTranslations('home'),
      href: '/',
    },
    {
      label: breadcrumbTranslations('search'),
    },
  ];

  let products: Product[] = [];

  if (search) {
    products = await searchProductWithName({
      locale,
      name: search,
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb items={categoryBreadcrumbItems} />
      <SearchSection search={search} />
      <SearchResult search={search} products={products} />
    </div>
  );
}
