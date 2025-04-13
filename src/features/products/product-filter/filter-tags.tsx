'use client';

import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useFilterContext } from '@/components/widgets/filter';
import { ProductTag } from '@/types/products/ProductTag';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export type FilterTagsProps = {
  tags: ProductTag[];
  onAccept: (field: string, value: unknown) => void;
  onCancel: () => void;
};

export function FilterTags(props: FilterTagsProps) {
  const { tags, onAccept, onCancel } = props;
  const { filterData } = useFilterContext();
  const commonTranslations = useTranslations('Common');
  const existed = filterData.find((item) => item.field === 'tags');
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
            {tags.map((tag) => (
              <ToggleGroupItem className="flex-none" key={tag.id} value={tag.id}>
                {tag.label}
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
        <Button onClick={() => onAccept('tags', selected)}>
          {commonTranslations('view_result')}
        </Button>
      </div>
    </div>
  );
}
