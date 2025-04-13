import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Toggle } from '@/components/ui/toggle';
import { FilterItemDef } from './advanced-filter';
import { useFilterContext } from './context';

export type FilterItemProps = {} & FilterItemDef;

export function FilterItem(props: FilterItemProps) {
  const { label, field, renderFilterOptions } = props;
  const { activePopup, closePopup, openPopup, onFilter, filterData } = useFilterContext();

  const open = activePopup === field;

  const active = open || filterData.some((item) => item.field === field);

  const handleOpenChange = (v: boolean) => {
    if (v) {
      openPopup(field);
    } else {
      closePopup();
    }
  };

  const handleAccept = (field: string, data: unknown) => {
    onFilter(field, data);
    closePopup();
  };

  const handleDiscard = () => closePopup();

  return (
    <Popover modal open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <div>
          <Toggle className="text-xs sm:text-sm" variant="outline" pressed={active}>
            {label}
          </Toggle>
        </div>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="start"
        className="mr-2 w-auto flex shadow-lg"
        style={{ maxWidth: 'calc(100vw - 16px)' }}
      >
        {renderFilterOptions(handleAccept, handleDiscard)}
      </PopoverContent>
    </Popover>
  );
}
