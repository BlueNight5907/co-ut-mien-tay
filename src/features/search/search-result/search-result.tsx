'use client';

import { Product } from '@/types/products/Product';
import React from 'react';
import searchDefaultImage from '@/assets/images/default_search.svg';
import searchNotFoundImage from '@/assets/images/product_not_found.jpg';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import ProductCard from '@/components/widgets/product-card';

export type SearchResultProps = {
  search?: string;
  products: Product[];
};

export function SearchResult(props: SearchResultProps) {
  const { search, products } = props;
  const exploreTranslations = useTranslations('ExplorePage');

  const renderDefault = () => (
    <div className="flex justify-center px-2 py-8 w-full">
      <Image
        className="block w-full h-auto max-w-[280px]"
        src={searchDefaultImage}
        width={1000}
        height={1000}
        alt="default search"
      />
    </div>
  );

  const renderSearchNotFound = () => (
    <div className="flex flex-col items-center gap-6 px-2 py-8 w-full">
      <Image
        className="block w-full h-auto max-w-[280px]"
        src={searchNotFoundImage}
        width={1000}
        height={1000}
        alt="search not found"
      />
      <h4 className="text-md lg:text-lg font-medium">{exploreTranslations('search_not_found')}</h4>
    </div>
  );

  const renderListProduct = () => (
    <ul className="grid col-start-1 row-start-1 xl:px-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 lg:gap-3 justify-items-stretch">
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
  );

  return (
    <div>
      {!search
        ? renderDefault()
        : products.length === 0
        ? renderSearchNotFound()
        : renderListProduct()}
    </div>
  );
}
