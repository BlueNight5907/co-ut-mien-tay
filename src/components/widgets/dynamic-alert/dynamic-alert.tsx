import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Color } from '@/lib/constants/color';
import { Icon } from '@/lib/constants/icon';
import { Check, Info, TriangleAlert } from 'lucide-react';
export type DynamicAlertProps = {
  headline: string;
  content: string;
  color?: Color;
  icon?: Icon;
};
export function DynamicAlert(props: DynamicAlertProps) {
  const { headline, content, color = Color.Primary, icon } = props;

  const classes: { border: string; text: string } = {
    border: 'border',
    text: 'text-foreground',
  };

  switch (color) {
    case Color.Primary:
      classes.border = 'border-primary';
      classes.text = 'text-primary';
      break;
    case Color.Secondary:
      classes.border = 'border-secondary';
      classes.text = 'text-secondary';
      break;
    case Color.Warning:
      classes.border = 'border-warning';
      classes.text = 'text-warning';
      break;
    case Color.Info:
      classes.border = 'border-info';
      classes.text = 'text-info';
      break;
    case Color.Error:
      classes.border = 'border-error';
      classes.text = 'text-error';
      break;
    case Color.Success:
      classes.border = 'border-success';
      classes.text = 'text-success';
      break;
    default:
      break;
  }

  const renderIcon = () => {
    switch (icon) {
      case Icon.Info:
        return <Info size={24} className={classes.text} />;
      case Icon.Warning:
        return <TriangleAlert className={classes.text} />;
      case Icon.Success:
        return <Check className={classes.text} />;
      default:
        return null;
    }
  };

  return (
    <Alert className={classes.border}>
      {renderIcon()}
      <AlertTitle className={classes.text}>{headline}</AlertTitle>
      <AlertDescription
        className={classes.text}
        dangerouslySetInnerHTML={{ __html: content }}
      ></AlertDescription>
    </Alert>
  );
}
