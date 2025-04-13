import { Alert } from './Alert';
import { CardGroup } from './CardGroup';
import { CategoryGroup } from './CategoryGroup';
import { CategorySlide } from './CategorySlide';
import { Hero } from './Hero';
import { HeroSlide } from './HeroSlide';
import { ProductGroup } from './ProductGroup';
import { ProductSlide } from './ProductSlide';
import { RichText } from './RichText';

export type Block =
  | Alert
  | CardGroup
  | CategoryGroup
  | CategorySlide
  | Hero
  | HeroSlide
  | ProductGroup
  | ProductSlide
  | RichText;
