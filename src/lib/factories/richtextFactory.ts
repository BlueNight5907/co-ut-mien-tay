import DynamicRichText from '@/components/widgets/dynamic-richtext';
import { RichText } from '@/types/blocks/RichText';
import { createElement } from 'react';

export function richtextFactory(richtext: RichText) {
  return createElement(DynamicRichText, {
    key: richtext.id,
    headline: richtext.headline,
    content: richtext.content,
  });
}
