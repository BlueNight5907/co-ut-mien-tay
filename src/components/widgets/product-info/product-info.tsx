'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProductStatus } from '@/lib/constants/product-status';
import { useGlobalConfig } from '@/lib/global-configs/context';
import { cn, convertCurrency } from '@/lib/utils';
import { Product } from '@/types/products/Product';
import { ProductVariant } from '@/types/products/ProductVariant';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

type Props = {
  product: Product;
};

export default function ProductInfo({ product }: Props) {
  const productInfoTranslation = useTranslations('ProductInfo');
  const { buyProductRedirectUrl } = useGlobalConfig();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants[0]
  );

  const renderBadges = () => {
    const badges: React.ReactNode[] = [];

    if (product.isNew) {
      badges.push(
        <Badge className="bg-green-500 py-1 px-2" key="new">
          {productInfoTranslation('new')}
        </Badge>
      );
    }

    if (product.isBestSeller) {
      badges.push(
        <Badge className="bg-red-500 py-1 px-2" key="best_seller">
          {productInfoTranslation('best_seller')}
        </Badge>
      );
    }

    if (product.isFeatured) {
      badges.push(
        <Badge className="bg-amber-500 py-1 px-2" key="featured">
          {productInfoTranslation('featured')}
        </Badge>
      );
    }

    return <div className="flex gap-1">{badges}</div>;
  };

  const renderDiscount = () => {
    if (!selectedVariant) {
      return null;
    }

    const { originPrice, currentPrice } = selectedVariant;

    if (!originPrice || !currentPrice || originPrice < currentPrice) {
      return null;
    }

    const label = `-${(((originPrice - currentPrice) / originPrice) * 100).toFixed(2)}%`;

    return <span className="text-red-500 text-xs inline-block">{label}</span>;
  };

  const renderPrice = () => {
    let content: React.ReactNode;

    if (!selectedVariant) {
      return null;
    }

    switch (selectedVariant.productStatus) {
      case ProductStatus.IN_STOCK:
        content = (
          <>
            <p>{productInfoTranslation('price')}</p>
            <div className="flex gap-2">
              {selectedVariant.currentPrice && (
                <span className="inline-block font-bold text-red-700">
                  {convertCurrency(selectedVariant.currentPrice)}
                </span>
              )}
              {selectedVariant.originPrice && (
                <span className="inline-block font-medium line-through text-muted-foreground">
                  {convertCurrency(selectedVariant.originPrice)}
                </span>
              )}
            </div>
            {renderDiscount()}
          </>
        );
        break;

      case ProductStatus.COMING_SOON:
        content = null;
        break;

      case ProductStatus.OUT_OF_STOCK:
        content = null;
        break;

      default:
        content = null;
    }

    return <div className="flex gap-1">{content}</div>;
  };

  const renderVariant = () => {
    if (!selectedVariant) {
      return <Badge variant="secondary">{productInfoTranslation('coming_soon')}</Badge>;
    }

    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          {product.variants.map((variant, index) => (
            <Image
              key={index}
              src={variant.image}
              onClick={() => {
                setSelectedVariant(variant);
              }}
              className={cn(
                'h-[32px] w-[48px] block rounded-xs border cursor-pointer object-contain',
                {
                  'border-primary': selectedVariant?.id === variant.id,
                }
              )}
              width={48}
              height={32}
              alt="product variant image"
            />
          ))}
        </div>
        <p>
          {productInfoTranslation('sku')} {selectedVariant.sku}
        </p>
        <p>
          {productInfoTranslation('unit')} {selectedVariant.unit}
        </p>
        <p>
          {productInfoTranslation('weight')} {Number(selectedVariant.weight)}
        </p>
        {renderPrice()}
      </div>
    );
  };

  const renderButtonText = () => {
    let content: React.ReactNode;

    switch (selectedVariant?.productStatus) {
      case ProductStatus.IN_STOCK:
        content = productInfoTranslation('buy_now');
        break;

      case ProductStatus.COMING_SOON:
        content = productInfoTranslation('coming_soon');
        break;

      case ProductStatus.OUT_OF_STOCK:
        content = productInfoTranslation('out_of_stock');
        break;

      default:
        content = productInfoTranslation('buy_now');
    }

    return content;
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col flex-wrap gap-y-2 gap-x-4">
        {renderBadges()}
        <h2 className="text-md sm:text-xl font-semibold">
          {product.name}
          {selectedVariant ? ` - ${selectedVariant.name}` : ''}
        </h2>
      </div>
      <p>{product.description}</p>
      <div>{renderVariant()}</div>
      <Button
        className={cn('lg:px-12', {
          'pointer-events-none': selectedVariant?.productStatus !== ProductStatus.IN_STOCK,
        })}
        variant={
          selectedVariant?.productStatus !== ProductStatus.IN_STOCK ? 'secondary' : 'default'
        }
        asChild
      >
        <Link href={buyProductRedirectUrl} target="_blank">
          {renderButtonText()}
        </Link>
      </Button>
    </div>
  );
}
