import searchNotFoundImage from '@/assets/images/product_not_found.jpg';
import ProductCard from '@/components/widgets/product-card';
import ProductPagination from '@/features/products/product-pagination';
import { countProducts, getProducts, LIMIT_PRODUCT_ITEMS } from '@/lib/api/productService';
import { ProductSortParams } from '@/lib/constants/product-sort';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export default async function ProductsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; page_number: number }>;
  searchParams: Promise<{
    sort?: ProductSortParams;
    filter_price?: string;
    filter_categories?: string;
  }>;
}) {
  const [
    { locale, page_number: rawPage },
    { sort, filter_price, filter_categories },
    productsPageTranslation,
  ] = await Promise.all([params, searchParams, getTranslations('ProductsPage')] as const);

  const page = rawPage ? Number(rawPage) : 1;

  if (Number.isNaN(page) || page < 1) {
    notFound();
  }

  let filterPrice: number[] | undefined;
  let filterCategories: string[] | undefined;

  try {
    if (filter_price) {
      filterPrice = JSON.parse(filter_price);
    }

    if (filter_categories) {
      filterCategories = JSON.parse(filter_categories);
    }
  } catch {}

  const products = await getProducts({
    locale,
    sort,
    filter: {
      price: filterPrice,
      categories: filterCategories,
    },
    page,
  });

  const totalProducts = await countProducts({
    filter: {
      price: filterPrice,
      categories: filterCategories,
    },
  });

  const firstPage = 1;
  const lastPage = Math.ceil(totalProducts / LIMIT_PRODUCT_ITEMS);

  const renderSearchNotFound = () => (
    <div className="flex flex-col items-center gap-6 px-2 py-8 w-full min-h-[50dvh] justify-center">
      <Image
        className="block w-full h-auto max-w-[280px]"
        src={searchNotFoundImage}
        width={1000}
        height={1000}
        alt="search not found"
      />
      <h4 className="text-md lg:text-lg font-medium">{productsPageTranslation('empty_data')}</h4>
    </div>
  );

  const renderList = () => (
    <>
      <div className="min-h-[50dvh]">
        <ul className="grid col-start-1 row-start-1 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 lg:gap-3 justify-items-stretch">
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard
                thumbnail={product.thumbnail}
                name={product.name}
                description={product.description}
                slug={product.slug}
                variants={product.variants}
                isNew={product.isNew}
                isFeatured={product.isFeatured}
                isBestSeller={product.isBestSeller}
              />
            </li>
          ))}
        </ul>
      </div>
      {lastPage >= firstPage && (
        <ProductPagination firstPage={firstPage} lastPage={lastPage} currentPage={page} />
      )}
    </>
  );

  return products.length > 0 ? renderList() : renderSearchNotFound();
}
