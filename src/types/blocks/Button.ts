import { buttonVariants } from '@/components/ui/button';
import { VariantProps } from 'class-variance-authority';

export type Button = {
  type: 'button';
  label: string;
  href: string;
} & VariantProps<typeof buttonVariants>;
