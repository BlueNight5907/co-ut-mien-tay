import Breadcrumb, { BreadCrumbItemData } from '@/components/widgets/breadcrumb';
import ProductImageSlide from '@/components/widgets/product-image-slide';
import ProductInfo from '@/components/widgets/product-info/product-info';
import ProductSlide from '@/components/widgets/product-slide';
import { getProduct, getRelatedProducts } from '@/lib/api/productService';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import React from 'react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  const product = await getProduct({ locale, slug });

  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const [{ locale, slug }, breadcrumbTranslations] = await Promise.all([
    params,
    getTranslations('Breadcrumb'),
  ] as const);

  const product = await getProduct({ locale, slug });
  const relatedProducts = await getRelatedProducts({
    locale,
    id: product.id,
  });

  const categoryBreadcrumbItems: BreadCrumbItemData[] = [
    {
      label: breadcrumbTranslations('home'),
      href: '/',
    },
    {
      href: '/products',
      label: breadcrumbTranslations('products'),
    },
    {
      label: product.name,
    },
  ];

  const productInfoTranslation = await getTranslations('ProductInfo');

  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <Breadcrumb items={categoryBreadcrumbItems} />
      <div className="grid col-start-1 row-start-1 grid-cols-1 lg:grid-cols-2 gap-4 xl:gap-8">
        <ProductImageSlide images={[product.thumbnail, ...product.images]} />
        <ProductInfo product={product} />
      </div>
      {product.detail && (
        <div className="flex flex-col gap-4">
          <p className="font-medium">{productInfoTranslation('detail')}</p>
          <div
            className="richtext min-h-[200px]"
            dangerouslySetInnerHTML={{ __html: product.detail }}
          ></div>
        </div>
      )}
      {relatedProducts.length > 0 && (
        <ProductSlide
          headline={productInfoTranslation('related_products')}
          items={relatedProducts}
        />
      )}
    </div>
  );
}
