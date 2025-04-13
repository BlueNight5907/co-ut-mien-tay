import React, { useContext } from 'react';
import { FilterItemDef } from './advanced-filter';

type FilterContextProps = {
  activePopup: string;
  filterData: Array<{
    field: string;
    data: unknown;
  }>;
  items: FilterItemDef[];
  openPopup: (popup: string) => void;
  closePopup: () => void;
  resetFilter: () => void;
  deleteFilter: (field: string) => void;
  onFilter: (field: string, data: unknown) => void;
};

export const FilterContext = React.createContext<FilterContextProps>({
  items: [],
  filterData: [],
  activePopup: '',
  openPopup: () => {},
  closePopup: () => {},
  resetFilter: () => {},
  deleteFilter: () => {},
  onFilter: () => {},
});

export function useFilterContext() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilterContext should place inside FilterContext');
  }

  return context;
}
