import { Button } from './Button';

export type Hero = {
  id: string;
  type: 'hero';
  image: string;
  info?: {
    headline: string;
    description?: string;
    buttons?: Button[];
  };
  layout?: 'image_left' | 'image_right' | 'image_center';
  infoPosition?: 'left' | 'right' | 'center';
  background?: string;
  href?: string;
  infoBackground?: string;
  textColor?: string;
};
