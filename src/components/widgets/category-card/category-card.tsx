'use client';

import categoryFallbackImage from '@/assets/images/category_fallback.jpg';
import { Link } from '@/i18n/navigation';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import rgba from 'color-rgba';
import Image, { StaticImageData } from 'next/image';
import { CSSProperties, useState } from 'react';
import Tooltip from '../tooltip';

const MAX_ALPHA = 0.1;

export type CategoryCardProps = {
  name: string;
  slug: string;
  color?: string;
  image: string;
};

export function CategoryCard(props: CategoryCardProps) {
  const { name = '', slug, image: defaultImage = '', color } = props;

  const [image, setImage] = useState<string | StaticImageData>(defaultImage);

  let style: CSSProperties | undefined;
  if (color) {
    const [r, g, b, alpha] = rgba(color);
    style = {
      borderColor: color,
      backgroundColor: `rgba(${r},${g},${b}, ${alpha && alpha > MAX_ALPHA ? MAX_ALPHA : alpha})`,
    };
  }

  const href = `/products?filter_categories=${JSON.stringify([slug])}`;

  return (
    <Link
      href={href}
      style={style}
      className="group/category-card block border p-4 rounded-xl hover:shadow-sm"
    >
      <AspectRatio className="flex flex-col items-center gap-3" ratio={3 / 3.5}>
        <div className="w-full">
          <AspectRatio ratio={1 / 0.7}>
            <Image
              className="w-full h-full inline-block rounded"
              width={500}
              height={400}
              priority
              src={image}
              alt={name}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                setImage(categoryFallbackImage);
              }}
            />
          </AspectRatio>
        </div>
        <div className="flex flex-grow items-center justify-center text-sm text-foreground font-medium group-hover/category-card:text-primary px-2">
          <Tooltip title={name} className="max-w-[200px]">
            <span className="text-center line-clamp-2 xl:line-clamp-3">{name}</span>
          </Tooltip>
        </div>
      </AspectRatio>
    </Link>
  );
}
