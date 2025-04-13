'use client';

import productFallbackImage from '@/assets/images/product_fallback.jpg';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useRouter } from '@/i18n/navigation';
import { ProductStatus } from '@/lib/constants/product-status';
import { cn, convertCurrency } from '@/lib/utils';

import { debounce } from 'lodash';
import { useTranslations } from 'next-intl';
import Image, { StaticImageData } from 'next/image';
import { useMemo, useState } from 'react';

export type ProductVariantDef = {
  id: number;
  name: string;
  image: string;
  productStatus: number;
  originPrice?: number;
  currentPrice?: number;
};

export type ProductCardProps = {
  isNew?: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  name: string;
  description: string;
  slug: string;
  thumbnail: string;
  variants: ProductVariantDef[];
};

export function ProductCard(props: ProductCardProps) {
  const {
    name,
    description,
    slug,
    isNew,
    isBestSeller,
    isFeatured,
    thumbnail: defaultImage,
    variants = [],
  } = props;

  const router = useRouter();

  const getDefaultData = () => {
    let currentPrice: number | undefined;
    let originPrice: number | undefined;
    let productStatus: number | undefined;

    if (variants.length > 0) {
      currentPrice = variants[0].currentPrice;
      originPrice = variants[0].originPrice;
      productStatus = variants[0].productStatus;
    }

    return {
      image: defaultImage,
      currentPrice,
      originPrice,
      productStatus,
    };
  };

  const [data, setData] = useState<{
    image: string | StaticImageData;
    currentPrice?: number;
    originPrice?: number;
    productStatus?: number;
    variantName?: string;
  }>(getDefaultData);

  const [selected, setSelected] = useState<number | undefined>();

  const productCardTranslation = useTranslations('ProductCard');

  const debouncedReset = useMemo(
    () =>
      debounce(() => {
        setData(getDefaultData);
        setSelected(undefined);
      }, 5000),
    []
  );

  const href = `/product/${slug}`;
  const { image, currentPrice, originPrice } = data;

  const renderInfoTicket = () => {
    const arr: React.ReactNode[] = [];
    if (isNew) {
      arr.push(
        <span
          className="bg-green-500 block text-primary-foreground  w-[90px] text-xs py-0.5 pl-5 z-5 rounded-full"
          key="new"
        >
          {productCardTranslation('new')}
        </span>
      );
    }

    if (isBestSeller) {
      arr.push(
        <span
          className="bg-red-500 block text-primary-foreground  w-[90px] text-xs py-0.5 pl-5 z-5 rounded-full"
          key="best_seller"
        >
          {productCardTranslation('best_seller')}
        </span>
      );
    }

    if (isFeatured) {
      arr.push(
        <span
          className="bg-amber-500 block text-primary-foreground  w-[90px] text-xs py-0.5 pl-5 z-5 rounded-full"
          key="featured"
        >
          {productCardTranslation('featured')}
        </span>
      );
    }

    return <div className="absolute flex flex-col gap-1  top-[12px] left-[-16px]">{arr}</div>;
  };

  const renderDiscount = () => {
    if (!originPrice || !currentPrice || originPrice < currentPrice) {
      return null;
    }

    const label = `-${(((originPrice - currentPrice) / originPrice) * 100).toFixed(2)}%`;

    return <span className="text-red-400 text-xs inline-block">{label}</span>;
  };

  const renderPrice = () => {
    let content: React.ReactNode;

    switch (data.productStatus) {
      case ProductStatus.IN_STOCK:
        content = (
          <>
            <div className="flex gap-1">
              {currentPrice && (
                <span className="inline-block text-xs font-bold text-red-700">
                  {convertCurrency(currentPrice)}
                </span>
              )}
              {originPrice && (
                <span className="inline-block text-xs font-medium line-through text-muted-foreground">
                  {convertCurrency(originPrice)}
                </span>
              )}
            </div>
            {renderDiscount()}
          </>
        );
        break;

      case ProductStatus.COMING_SOON:
        content = (
          <span className="inline-block text-xs font-bold text-foreground">
            {productCardTranslation('coming_soon')}
          </span>
        );
        break;

      case ProductStatus.OUT_OF_STOCK:
        content = (
          <span className="inline-block text-xs font-bold text-foreground">
            {productCardTranslation('out_of_stock')}
          </span>
        );
        break;

      default:
        content = (
          <span className="inline-block text-xs font-bold text-foreground">
            {productCardTranslation('coming_soon')}
          </span>
        );
    }

    return <div className="flex items-center gap-2 py-1">{content}</div>;
  };

  return (
    <div
      onClick={() => router.push(href)}
      className="group/product-card bg-card relative flex flex-col gap-2 p-2 h-full border rounded-xl hover:shadow-sm overflow-hidden cursor-pointer"
      onMouseLeave={debouncedReset}
      onMouseEnter={debouncedReset.cancel}
    >
      {renderInfoTicket()}
      <div className="w-full">
        <AspectRatio className="rounded-sm overflow-hidden" ratio={16 / 11}>
          <Image
            className="transition-all w-full h-full inline-block object-cover group-hover/product-card:scale-120"
            width={800}
            height={550}
            src={image}
            alt={name}
            priority
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              setData((item) => ({
                ...item,
                image: productFallbackImage,
              }));
            }}
          />
        </AspectRatio>
      </div>
      <ScrollArea className="-mb-2" onClick={(e) => e.stopPropagation()}>
        <div className="pb-2.5">
          <div className="flex items-center gap-2">
            {variants.map((variant, index) => (
              <Image
                key={index}
                src={variant.image}
                onClick={(e) => {
                  e.preventDefault();
                  setData({
                    image: variant.image,
                    currentPrice: variant.currentPrice,
                    originPrice: variant.originPrice,
                    productStatus: variant.productStatus,
                    variantName: variant.name,
                  });
                  setSelected(index);
                }}
                className={cn('h-[32px] w-[32px] block rounded-xs border cursor-pointer', {
                  'border-primary': index === selected,
                })}
                priority
                width={32}
                height={32}
                alt="product variant image"
              />
            ))}
          </div>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div className="flex flex-col flex-grow gap-1">
        <p className="font-medium text-sm line-clamp-2 group-hover/product-card:text-primary">
          {name}
          {data.variantName && ` - ${data.variantName}`}
        </p>
        <span className="font-light text-xs line-clamp-2">{description}</span>
      </div>
      {renderPrice()}
    </div>
  );
}
