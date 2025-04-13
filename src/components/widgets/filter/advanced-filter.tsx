'use client';

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { ActiveFiltersSection } from './active-filter-section';
import { FilterContext } from './context';
import { FilterItem } from './filter-item';

export type FilterItemDef = {
  field: string;
  label: React.ReactNode;
  renderActiveContent: (value: unknown) => React.ReactNode;
  renderFilterOptions: (
    accept: (field: string, value: unknown) => void,
    cancel: () => void
  ) => React.ReactNode;
};

export type AdvancedFilterProps = {
  title?: string;
  activeFilterTitle?: string;
  items: FilterItemDef[];
  filterData: Array<{
    field: string;
    data: unknown;
  }>;
  setFilterData: (
    func: (
      data: Array<{
        field: string;
        data: unknown;
      }>
    ) => Array<{
      field: string;
      data: unknown;
    }>
  ) => void;
};

export function AdvancedFilter(props: AdvancedFilterProps) {
  const { title, activeFilterTitle, items, filterData, setFilterData } = props;
  const filterTranslations = useTranslations('Filter');
  const [activePopup, setActivePopup] = useState('');

  const openPopup = (popup: string) => {
    setActivePopup(popup);
  };

  const closePopup = () => setActivePopup('');

  const handleReset = () => {
    setFilterData(() => []);
  };

  const handleDelete = (field: string) => {
    setFilterData((arr) => [...arr.filter((item) => item.field !== field)]);
  };

  const handleFilter = (field: string, data: unknown) => {
    setFilterData((arr) => {
      const existed = arr.find((item) => item.field === field);
      if (existed) {
        existed.data = data;
      } else {
        arr.push({
          field,
          data,
        });
      }

      return [...arr];
    });
  };

  return (
    <FilterContext.Provider
      value={{
        items,
        filterData,
        activePopup,
        openPopup,
        closePopup,
        resetFilter: handleReset,
        deleteFilter: handleDelete,
        onFilter: handleFilter,
      }}
    >
      <div className="flex flex-col gap-2">
        <h3 className="font-medium text-md">{title ?? filterTranslations('filter_by')}</h3>
        <ScrollArea>
          <div className="flex gap-2 pb-3">
            {items.map((item) => (
              <FilterItem {...item} key={item.field} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <ActiveFiltersSection title={activeFilterTitle} />
    </FilterContext.Provider>
  );
}
