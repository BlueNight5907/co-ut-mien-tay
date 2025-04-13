import { Block } from '../blocks/Block';

export type DynamicPage = {
  name: string;
  permalink: string;
  title?: string;
  description?: string;
  blocks: Block[];
};
