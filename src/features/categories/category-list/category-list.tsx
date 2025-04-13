import CategoryCard from '@/components/widgets/category-card';
import { Category } from '@/types/categories/Category';
import React from 'react';

type Props = {
  items: Category[];
};

export function CategoryList(props: Props) {
  const { items } = props;
  return (
    <ul className="grid col-start-1 row-start-1 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 xl:gap-4 justify-items-stretch">
      {items.map((item) => (
        <li key={item.id}>
          <CategoryCard name={item.name} slug={item.slug} image={item.image} color={item.color} />
        </li>
      ))}
    </ul>
  );
}
