import DynamicAlert from '@/components/widgets/dynamic-alert';
import { Alert } from '@/types/blocks/Alert';
import { createElement } from 'react';

export function alertFactory(alert: Alert) {
  return createElement(DynamicAlert, {
    key: alert.id,
    headline: alert.headline,
    content: alert.content,
    color: alert.color,
    icon: alert.icon,
  });
}
