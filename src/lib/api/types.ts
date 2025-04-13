export interface GlobalSchema {
  id: number;
  name: string;
  url: string;
  logo?: FileSchema;
  favicon?: FileSchema;
  main_color?: string;
  text_color?: string;
  title?: string;
  description?: string;
  phone_number?: string;
  email?: string;
  address?: string;
  buy_product_redirect_url?: string;
  translations: GlobalTranslationSchema[];
  social_links: SocialLinkSchema[];
  footer_sections: FooterSectionSchema[];
}

export interface GlobalTranslationSchema {
  title?: string;
  description?: string;
}

export interface FooterSectionSchema {
  id: number;
  headline: string;
  translations: FooterSectionTranslationSchema[];
  items: FooterSectionItemSchema[];
}

export interface FooterSectionTranslationSchema {
  id: number;
  headline: string;
}

export interface FooterSectionItemSchema {
  id: number;
  text: string;
  url: string;
  translations: FooterSectionItemTranslationSchema[];
}

export interface FooterSectionItemTranslationSchema {
  id: number;
  text: string;
}

export interface SocialLinkSchema {
  id: number;
  name: string;
  url: string;
  image: FileSchema;
  translations: SocialLinkTranslationSchema[];
}

export interface SocialLinkTranslationSchema {
  id: number;
  Social_Links_id: number;
  language_code: string;
  name: string;
}

export interface DynamicPageSchema {
  id: number;
  name: string;
  title?: string;
  description?: string;
  permalink: string;
  translations: DynamicPageTranslationSchema[];
  blocks: BlockSchema[];
}

export interface DynamicPageTranslationSchema {
  id: number;
  name: string;
  title?: string;
  description?: string;
}

export interface HomePageSchema {
  id: number;
  blocks: BlockSchema[];
}

export interface BlockSchema<T = unknown> {
  id: number;
  hide_bock: boolean;
  sort: number | null;
  collection:
    | 'Block_Alerts'
    | 'Block_Richtexts'
    | 'Block_Heroes'
    | 'Block_Hero_Slides'
    | 'Category_Slides'
    | 'Group_Categories'
    | 'Product_Slides'
    | 'Group_Products'
    | 'Group_Cards';
  item: T;
}

export interface BlockAlertSchema {
  id: number;
  color: string;
  icon: string;
  headline: string;
  content: string;
  translations: BlockAlertTranslationSchema[];
}

export interface BlockAlertTranslationSchema {
  id: number;
  Block_Alerts_id: number;
  language_code: string;
  headline: string;
  content: string;
}

export interface BlockRichtextSchema {
  id: number;
  headline: string;
  content: string;
  translations: BlockRichtextTranslationSchema[];
}

export interface BlockRichtextTranslationSchema {
  id: number;
  Block_Richtexts_id: number;
  language_code: string;
  headline: string;
  content: string;
}

export interface BlockHeroSchema {
  id: number;
  headline: string;
  description?: string;
  image: FileSchema;
  background?: string;
  text_color?: string;
  info_color?: string;
  layout?: 'image_left' | 'image_right' | 'image_center';
  info_position?: 'left' | 'right' | 'center';
  info: boolean;
  url?: string;
  button_group?: BlockButtonGroupSchema;
  buttons: HeroButtonSchema[];
  translations: BlockRichtextTranslationSchema[];
}

export interface HeroButtonSchema {
  id: number;
  hero: BlockHeroSchema;
  button: BlockButtonSchema;
}

export interface BlockHeroSlideSchema {
  id: number;
  heroes: BlockHeroSlideItemsSchema[];
}

export interface BlockHeroSlideItemsSchema {
  id: number;
  hero: BlockHeroSchema;
}

export interface BlockHeroTranslationSchema {
  id: number;
  Block_Heroes_id: number;
  language_code: string;
  headline: string;
  description?: string;
}

export interface BlockButtonGroupSchema {
  id: number;
  buttons: BlockButtonSchema[];
}

export interface BlockButtonSchema {
  id: number;
  sort: number | null;
  variant: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  label: string;
  url: string;
  translations: BlockButtonTranslationSchema[];
}

export interface BlockButtonTranslationSchema {
  id: number;
  Block_Buttons_id: number;
  language_code: string;
  label: string;
}

export interface BlockCategorySlideSchema {
  id: number;
  headline: string;
  action_url?: string;
  categories: BlockCategorySlideItemsSchema[];
  translations: BlockCategorySlideTranslationSchema[];
}

export interface BlockCategorySlideItemsSchema {
  id: number;
  category: CategorySchema;
}

export interface BlockCategorySlideTranslationSchema {
  id: number;
  Block_Category_Slide_id: number;
  language_code: string;
  headline: string;
}

export interface BlockCategoryGroupSchema {
  id: number;
  headline: string;
  action_url?: string;
  border: boolean;
  categories: BlockCategoryGroupItemsSchema[];
  translations: BlockCategoryGroupTranslationSchema[];
}

export interface BlockCategoryGroupItemsSchema {
  id: number;
  category: CategorySchema;
}

export interface BlockCategoryGroupTranslationSchema {
  id: number;
  Block_Category_Group_id: number;
  language_code: string;
  headline: string;
}

export interface BlockProductSlideSchema {
  id: number;
  headline: string;
  action_url?: string;
  products: BlockProductSlideItemsSchema[];
  translations: BlockProductSlideTranslationSchema[];
}

export interface BlockProductSlideItemsSchema {
  id: number;
  product: ProductSchema;
}

export interface BlockProductSlideTranslationSchema {
  id: number;
  Block_Product_Slide_id: number;
  language_code: string;
  headline: string;
}

export interface BlockProductGroupSchema {
  id: number;
  headline: string;
  action_url?: string;
  border: boolean;
  products: BlockProductGroupItemsSchema[];
  translations: BlockProductGroupTranslationSchema[];
}

export interface BlockProductGroupItemsSchema {
  id: number;
  product: ProductSchema;
}

export interface BlockProductGroupTranslationSchema {
  id: number;
  Block_Product_Groups_id: number;
  language_code: string;
  headline: string;
}

export interface BlockCardGroupSchema {
  id: number;
  headline: string;
  action_url?: string;
  border: boolean;
  cards: BlockCardGroupItemsSchema[];
  translations: BlockCardGroupTranslationSchema[];
}

export interface BlockCardGroupItemsSchema {
  id: number;
  card: BlockCardSchema;
}

export interface BlockCardGroupTranslationSchema {
  id: number;
  Block_Card_Groups_id: number;
  language_code: string;
  headline: string;
}

export interface BlockCardSchema {
  id: number;
  headline: string;
  description?: string;
  content?: string;
  image?: FileSchema;
  buttons: CardButtonSchema[];
  translations: BlockCardTranslationSchema[];
}

export interface CardButtonSchema {
  id: number;
  card: BlockCardSchema;
  button: BlockButtonSchema;
}

export interface BlockCardTranslationSchema {
  id: number;
  Block_Cards_id: number;
  language_code: string;
  headline: string;
  description?: string;
  content?: string;
}

export interface CategorySchema {
  id: number;
  status: 'published' | 'draft' | 'archived';
  user_created: string;
  date_created: string;
  user_updated?: string;
  date_updated?: string;
  name: string;
  slug: string;
  image: FileSchema;
  background: string;
  translations: CategoryTranslationSchema[];
}

export interface CategoryTranslationSchema {
  id: number;
  category_id: number;
  language_code: string;
  name: string;
}

export interface ProductSchema {
  id: number;
  status: 'published' | 'draft' | 'archived';
  user_created: string;
  date_created: string;
  user_updated?: string;
  date_updated?: string;
  name: string;
  slug: string;
  description: string;
  detail: string;
  thumbnail: FileSchema;
  images: ProductImageSchema[];
  new: boolean;
  featured: boolean;
  best_seller: boolean;
  translations: ProductTranslationSchema[];
  variants: ProductVariantSchema[];
}

export interface ProductImageSchema {
  id: number;
  file: FileSchema;
}

export interface RelatedProductSchema {
  id: number;
  product: number;
  related_product: ProductSchema;
}

export interface ProductVariantSchema {
  id: number;
  name: string;
  sku: string;
  weight: number;
  product_status: number;
  unit: ProductUnitSchema;
  image: FileSchema;
  price?: PriceSchema;
  origin_price?: PriceSchema;
  translations: ProductVariantTranslationSchema[];
}

export interface ProductUnitSchema {
  id: number;
  name: string;
  translations: ProductUnitTranslationSchema[];
}

export interface ProductUnitTranslationSchema {
  id: number;
  name: string;
}

export interface PriceSchema {
  id: number;
  value: number;
}

export interface ProductTranslationSchema {
  id: number;
  category_id: number;
  language_code: string;
  name: string;
  description: string;
  detail: string;
}

export interface ProductVariantTranslationSchema {
  id: number;
  name: string;
}

export interface FileSchema {
  id: string;
  storage: string;
  filename_disk: string;
  filename_download: string;
  title: string;
  type: string;
  folder: string;
  uploaded_by: string;
  created_on: string;
  modified_by?: string;
  modified_on?: string;
  charset: unknown;
  filesize: string;
  width: number;
  height: 901;
  metadata: Record<string, unknown>;
  uploaded_on: string;
}
