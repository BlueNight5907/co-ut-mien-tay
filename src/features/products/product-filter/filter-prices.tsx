'use client';

import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useFilterContext } from '@/components/widgets/filter';
import { convertCurrency } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

const MIN_PRICE = 0;
const MAX_PRICE = 1000000;

export type FilterPricesProps = {
  onAccept: (field: string, value: unknown) => void;
  onCancel: () => void;
};

export function FilterPrices(props: FilterPricesProps) {
  const { onAccept, onCancel } = props;
  const { filterData, deleteFilter } = useFilterContext();
  const commonTranslations = useTranslations('Common');
  const existed = filterData.find((item) => item.field === 'price');
  const getDefaultRange = () => {
    if (!existed) {
      return [MIN_PRICE, MAX_PRICE];
    }
    const data = existed.data as [number, number];
    if (data.length !== 2 || data[0] > data[1]) {
      return [MIN_PRICE, MAX_PRICE];
    }
    const from = data[0] >= MIN_PRICE ? data[0] : MIN_PRICE;
    const to = data[1] <= MAX_PRICE ? data[1] : MAX_PRICE;

    return [from, to];
  };
  const [range, setRange] = useState(getDefaultRange);

  const toPercent = (value: number) => (value / MAX_PRICE) * 100;
  const toPrice = (value: number) => (value * MAX_PRICE) / 100;

  return (
    <div className="max-w-md w-dvw flex-grow flex flex-col gap-4">
      <div>
        <div className="flex justify-between">
          <span>{convertCurrency(range[0])}</span>
          <span>{convertCurrency(range[1])}</span>
        </div>
        <Slider
          value={range.map(toPercent)}
          onValueChange={(value) => {
            if (value[1] - value[0] <= 0) {
              return;
            }
            setRange(value.map(toPrice));
          }}
        />
      </div>
      <div className="flex justify-center gap-2">
        <Button
          onClick={() => {
            onCancel();
            setRange(getDefaultRange());
          }}
          variant="outline"
        >
          {commonTranslations('close')}
        </Button>
        <Button
          onClick={() => {
            if (range.length === 0) {
              deleteFilter('price');
            }
            onAccept('price', range);
          }}
        >
          {commonTranslations('view_result')}
        </Button>
      </div>
    </div>
  );
}
