export type FooterSectionItem = {
  id: number;
  text: string;
  url: string;
};

export type FooterSection = {
  id: number;
  headline: string;
  items: FooterSectionItem[];
};
