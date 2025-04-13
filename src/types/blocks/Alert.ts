import { Color } from '@/lib/constants/color';
import { Icon } from '@/lib/constants/icon';

export type Alert = {
  id: string;
  type: 'alert';
  headline: string;
  content: string;
  color?: Color;
  icon?: Icon;
};
