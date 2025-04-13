'use client';

import DynamicCard, { CardDef } from '../dynamic-card';

export type DynamicCardGroupProps = {
  headline: string;
  items: CardDef[];
};

export function DynamicCardGroup(props: DynamicCardGroupProps) {
  const { headline, items } = props;

  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-semibold text-md">{headline}</h3>
      <ul className="grid col-start-1 row-start-1 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 justify-items-stretch">
        {items.map((item, index) => (
          <li key={index}>
            <DynamicCard {...item} className="h-full" />
          </li>
        ))}
      </ul>
    </div>
  );
}
