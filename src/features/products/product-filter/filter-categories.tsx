'use client';

import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useFilterContext } from '@/components/widgets/filter';
import { Category } from '@/types/categories/Category';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export type FilterCategoriesProps = {
  categories: Category[];
  onAccept: (field: string, value: unknown) => void;
  onCancel: () => void;
};

export function FilterCategories(props: FilterCategoriesProps) {
  const { categories, onAccept, onCancel } = props;
  const { filterData, deleteFilter } = useFilterContext();
  const commonTranslations = useTranslations('Common');
  const existed = filterData.find((item) => item.field === 'categories');
  const getDefaultSelected = () => {
    if (!existed) {
      return [];
    }
    const data = existed.data as string[];
    return [...data];
  };
  const [selected, setSelected] = useState(getDefaultSelected);

  return (
    <div className="max-w-lg w-dvw flex-grow flex flex-col gap-4">
      <ScrollArea className="max-h-[60dvw] lg:max-h-[40dvw]" type="always">
        <div>
          <ToggleGroup
            className="flex gap-2 flex-wrap"
            type="multiple"
            value={selected}
            onValueChange={(value) => setSelected(value)}
            variant="outline"
          >
            {categories.map((category) => (
              <ToggleGroupItem className="flex-none" key={category.id} value={category.slug}>
                {category.name}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>

      <div className="flex justify-center gap-2">
        <Button
          onClick={() => {
            onCancel();
            setSelected(getDefaultSelected());
          }}
          variant="outline"
        >
          {commonTranslations('close')}
        </Button>
        <Button
          onClick={() => {
            if (selected.length === 0) {
              deleteFilter('categories');
            }
            onAccept('categories', selected);
          }}
        >
          {commonTranslations('view_result')}
        </Button>
      </div>
    </div>
  );
}
