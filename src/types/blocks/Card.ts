import { Button } from './Button';

export type Card = {
  id: string;
  type: 'card';
  title: string;
  description?: string;
  content?: string;
  image?: string;
  buttons?: Button[];
};
