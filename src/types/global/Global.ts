import { FooterSection } from './FooterSection';
import { SocialLink } from './SocialLink';

export type GlobalConfig = {
  siteName: string;
  siteUrl: string;
  logo?: string;
  favicon?: string;
  mainColor?: string;
  mainTextColor?: string;
  siteTitle?: string;
  siteDescription?: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
  buyProductRedirectUrl: string;
  socialLinks: SocialLink[];
  footerSections: FooterSection[];
};
