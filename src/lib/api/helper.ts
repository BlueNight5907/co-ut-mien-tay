import { Alert } from '@/types/blocks/Alert';
import { Button } from '@/types/blocks/Button';
import { Hero } from '@/types/blocks/Hero';
import { HeroSlide } from '@/types/blocks/HeroSlide';
import { RichText } from '@/types/blocks/RichText';
import { uniqueId } from 'lodash';
import { Color } from '../constants/color';
import { Icon } from '../constants/icon';
import { getImageLink } from '../utils';
import {
  BlockAlertSchema,
  BlockButtonSchema,
  BlockCardGroupSchema,
  BlockCardSchema,
  BlockCategoryGroupSchema,
  BlockCategorySlideSchema,
  BlockHeroSchema,
  BlockHeroSlideSchema,
  BlockProductGroupSchema,
  BlockProductSlideSchema,
  BlockRichtextSchema,
  CategorySchema,
  DynamicPageSchema,
  FooterSectionItemSchema,
  FooterSectionSchema,
  GlobalSchema,
  HomePageSchema,
  ProductSchema,
  ProductVariantSchema,
  SocialLinkSchema,
} from './types';
import { Category } from '@/types/categories/Category';
import { ProductVariant } from '@/types/products/ProductVariant';
import { Product } from '@/types/products/Product';
import { CategorySlide } from '@/types/blocks/CategorySlide';
import { CategoryGroup } from '@/types/blocks/CategoryGroup';
import { ProductSlide } from '@/types/blocks/ProductSlide';
import { ProductGroup } from '@/types/blocks/ProductGroup';
import { Card } from '@/types/blocks/Card';
import { CardGroup } from '@/types/blocks/CardGroup';
import { SocialLink } from '@/types/global/SocialLink';
import { GlobalConfig } from '@/types/global/Global';
import { FooterSection, FooterSectionItem } from '@/types/global/FooterSection';
import { DynamicPage } from '@/types/dynamic-pages/DynamicPage';
import { Block } from '@/types/blocks/Block';
import { Home } from '@/types/home/Home';

export function parseFooterSectionItem(schema: FooterSectionItemSchema): FooterSectionItem {
  let text = schema.text;

  if (schema.translations.length > 0) {
    text = schema.translations[0].text;
  }

  return {
    id: schema.id,
    text,
    url: schema.url,
  };
}

export function parseFooterSection(schema: FooterSectionSchema): FooterSection {
  let headline = schema.headline;

  if (schema.translations.length > 0) {
    headline = schema.translations[0].headline;
  }

  return {
    id: schema.id,
    headline,
    items: schema.items.map(parseFooterSectionItem),
  };
}

export function parseSocialLink(schema: SocialLinkSchema): SocialLink {
  let name = schema.name;

  if (schema.translations.length > 0) {
    name = schema.translations[0].name;
  }

  return {
    id: schema.id,
    name,
    image: getImageLink(schema.image),
    href: schema.url,
  };
}

export function parseGlobalConfig(schema: GlobalSchema): GlobalConfig {
  let siteTitle = schema.title;
  let siteDescription = schema.description;

  if (schema.translations.length > 0) {
    siteTitle = schema.translations[0].title;
    siteDescription = schema.translations[0].description;
  }

  return {
    siteName: schema.name,
    siteUrl: schema.url,
    buyProductRedirectUrl: schema.buy_product_redirect_url ?? '/',
    logo: getImageLink(schema.logo),
    favicon: getImageLink(schema.favicon),
    mainColor: schema.main_color,
    mainTextColor: schema.text_color,
    siteTitle,
    siteDescription,
    email: schema.email,
    address: schema.address,
    phoneNumber: schema.phone_number,
    socialLinks: schema.social_links.map(parseSocialLink),
    footerSections: schema.footer_sections.map(parseFooterSection),
  };
}

export function parseVariant(schema: ProductVariantSchema): ProductVariant {
  let name = schema.name;
  let unit = schema.unit.name;

  if (schema.translations.length > 0) {
    name = schema.translations[0].name;
  }

  if (schema.unit.translations.length > 0) {
    unit = schema.unit.translations[0].name;
  }

  return {
    id: schema.id,
    image: getImageLink(schema.image),
    name,
    sku: schema.sku,
    unit,
    productStatus: Number(schema.product_status),
    weight: schema.weight,
    originPrice: schema.origin_price?.value ? Number(schema.origin_price.value) : undefined,
    currentPrice: schema.price?.value ? Number(schema.price.value) : undefined,
    discounts: [],
  };
}

export function parseProduct(schema: ProductSchema): Product {
  let name = schema.name;
  let description = schema.description;
  let detail = schema.detail;

  if (schema.translations.length > 0) {
    name = schema.translations[0].name;
    description = schema.translations[0].description;
    detail = schema.translations[0].detail;
  }

  return {
    id: schema.id,
    thumbnail: getImageLink(schema.thumbnail),
    slug: schema.slug,
    name,
    description,
    detail,
    isNew: schema.new,
    isFeatured: schema.featured,
    isBestSeller: schema.best_seller,
    images: schema.images.map((image) => getImageLink(image.file)),
    variants: schema.variants.map(parseVariant),
  };
}

export function parseCategory(schema: CategorySchema): Category {
  let name = schema.name;

  if (schema.translations.length > 0) {
    name = schema.translations[0].name;
  }

  return {
    id: schema.id,
    image: getImageLink(schema.image),
    slug: schema.slug,
    name: name,
    color: schema.background,
  };
}

export function parseAlert(schema: BlockAlertSchema): Alert {
  let headline = schema.headline;
  let content = schema.content;

  if (schema.translations.length > 0) {
    headline = schema.translations[0].headline;
    content = schema.translations[0].content;
  }

  return {
    id: uniqueId(),
    type: 'alert',
    headline,
    content,
    color: schema.color as Color,
    icon: schema.icon as Icon,
  };
}

export function parseRichtext(schema: BlockRichtextSchema): RichText {
  let headline = schema.headline;
  let content = schema.content;

  if (schema.translations.length > 0) {
    headline = schema.translations[0].headline;
    content = schema.translations[0].content;
  }

  return {
    id: uniqueId(),
    type: 'rich_text',
    headline,
    content,
  };
}

export function parseHero(schema: BlockHeroSchema): Hero {
  let info: { headline: string; description?: string; buttons?: Button[] } | undefined;

  if (schema.info) {
    let headline = schema.headline;
    let description = schema.description;

    if (schema.translations.length > 0) {
      headline = schema.translations[0].headline;
      description = schema.translations[0].content;
    }

    info = {
      headline,
      description,
      buttons: schema.buttons?.map((item) => parseButton(item.button)),
    };
  }

  return {
    id: uniqueId(),
    type: 'hero',
    info,
    textColor: schema.text_color,
    background: schema.background,
    infoBackground: schema.info_color,
    image: getImageLink(schema.image),
    href: schema.url,
    layout: schema.layout,
    infoPosition: schema.info_position,
  };
}

export function parseHeroSlide(schema: BlockHeroSlideSchema): HeroSlide {
  return {
    id: uniqueId(),
    type: 'hero_slide',
    items: schema.heroes.map((item) => parseHero(item.hero)),
  };
}

export function parseButton(schema: BlockButtonSchema): Button {
  let label = schema.label;

  if (schema.translations.length > 0) {
    label = schema.translations[0].label;
  }

  return {
    type: 'button',
    label,
    href: schema.url,
    variant: schema.variant,
  };
}

export function parseCategorySlide(schema: BlockCategorySlideSchema): CategorySlide {
  let headline = schema.headline;

  if (schema.translations.length > 0) {
    headline = schema.translations[0].headline;
  }

  return {
    id: uniqueId(),
    type: 'category_slide',
    headline,
    actionUrl: schema.action_url,
    items: schema.categories.map((item) => parseCategory(item.category)),
  };
}

export function parseCategoryGroup(schema: BlockCategoryGroupSchema): CategoryGroup {
  let headline = schema.headline;

  if (schema.translations.length > 0) {
    headline = schema.translations[0].headline;
  }

  return {
    id: uniqueId(),
    type: 'category_group',
    headline,
    border: schema.border,
    actionUrl: schema.action_url,
    items: schema.categories.map((item) => parseCategory(item.category)),
  };
}

export function parseProductSlide(schema: BlockProductSlideSchema): ProductSlide {
  let headline = schema.headline;

  if (schema.translations.length > 0) {
    headline = schema.translations[0].headline;
  }

  return {
    id: uniqueId(),
    type: 'product_slide',
    headline,
    actionUrl: schema.action_url,
    items: schema.products.map((item) => parseProduct(item.product)),
  };
}

export function parseProductGroup(schema: BlockProductGroupSchema): ProductGroup {
  let headline = schema.headline;

  if (schema.translations.length > 0) {
    headline = schema.translations[0].headline;
  }

  return {
    id: uniqueId(),
    type: 'product_group',
    headline,
    border: schema.border,
    actionUrl: schema.action_url,
    items: schema.products.map((item) => parseProduct(item.product)),
  };
}

export function parseCard(schema: BlockCardSchema): Card {
  let headline = schema.headline;
  let description = schema.description;
  let content = schema.content;

  if (schema.translations.length > 0) {
    headline = schema.translations[0].headline;
    description = schema.translations[0].description;
    content = schema.translations[0].content;
  }

  return {
    id: uniqueId(),
    type: 'card',
    title: headline,
    description,
    content,
    image: schema.image ? getImageLink(schema.image) : undefined,
    buttons: schema.buttons?.map((item) => parseButton(item.button)),
  };
}

export function parseCardGroup(schema: BlockCardGroupSchema): CardGroup {
  let headline = schema.headline;

  if (schema.translations.length > 0) {
    headline = schema.translations[0].headline;
  }

  return {
    id: uniqueId(),
    type: 'card_group',
    headline,
    items: schema.cards.map((item) => parseCard(item.card)),
  };
}

export function parseDynamicPage(schema: DynamicPageSchema): DynamicPage {
  let name = schema.name;
  let title = schema.title;
  let description = schema.description;

  const blocks: Block[] = [];

  if (schema.translations.length > 0) {
    name = schema.translations[0].name;
    title = schema.translations[0].title;
    description = schema.translations[0].description;
  }

  schema.blocks.forEach((block) => {
    switch (block.collection) {
      case 'Block_Alerts':
        blocks.push(parseAlert(block.item as BlockAlertSchema));
        break;

      case 'Block_Richtexts':
        blocks.push(parseRichtext(block.item as BlockRichtextSchema));
        break;

      case 'Block_Heroes':
        blocks.push(parseHero(block.item as BlockHeroSchema));
        break;

      case 'Block_Hero_Slides':
        blocks.push(parseHeroSlide(block.item as BlockHeroSlideSchema));
        break;

      case 'Category_Slides':
        blocks.push(parseCategorySlide(block.item as BlockCategorySlideSchema));
        break;

      case 'Group_Categories':
        blocks.push(parseCategoryGroup(block.item as BlockCategoryGroupSchema));
        break;

      case 'Product_Slides':
        blocks.push(parseProductSlide(block.item as BlockProductSlideSchema));
        break;

      case 'Group_Products':
        blocks.push(parseProductGroup(block.item as BlockProductGroupSchema));
        break;

      case 'Group_Cards':
        blocks.push(parseCardGroup(block.item as BlockCardGroupSchema));
        break;

      default:
        break;
    }
  });

  return {
    name,
    title,
    description,
    permalink: schema.permalink,
    blocks,
  };
}

export function parseHomePage(schema: HomePageSchema): Home {
  const blocks: Block[] = [];

  schema.blocks.forEach((block) => {
    switch (block.collection) {
      case 'Block_Alerts':
        blocks.push(parseAlert(block.item as BlockAlertSchema));
        break;

      case 'Block_Richtexts':
        blocks.push(parseRichtext(block.item as BlockRichtextSchema));
        break;

      case 'Block_Heroes':
        blocks.push(parseHero(block.item as BlockHeroSchema));
        break;

      case 'Block_Hero_Slides':
        blocks.push(parseHeroSlide(block.item as BlockHeroSlideSchema));
        break;

      case 'Category_Slides':
        blocks.push(parseCategorySlide(block.item as BlockCategorySlideSchema));
        break;

      case 'Group_Categories':
        blocks.push(parseCategoryGroup(block.item as BlockCategoryGroupSchema));
        break;

      case 'Product_Slides':
        blocks.push(parseProductSlide(block.item as BlockProductSlideSchema));
        break;

      case 'Group_Products':
        blocks.push(parseProductGroup(block.item as BlockProductGroupSchema));
        break;

      case 'Group_Cards':
        blocks.push(parseCardGroup(block.item as BlockCardGroupSchema));
        break;

      default:
        break;
    }
  });

  return {
    blocks,
  };
}
