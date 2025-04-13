import { AspectRatio } from '@/components/ui/aspect-ratio';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import ButtonLinkGroup, { ButtonLinkDef } from '../button-link-group';
import { cn } from '@/lib/utils';

export type CardDef = {
  title: string;
  description?: string;
  image?: string;
  content?: string;
  buttons?: ButtonLinkDef[];
};

export type DynamicCardProps = {
  title: string;
  description?: string;
  image?: string;
  content?: string;
  buttons?: ButtonLinkDef[];
  className?: string;
};

export function DynamicCard(props: DynamicCardProps) {
  const { title, description, content, image, buttons, className } = props;
  return (
    <Card className={cn('w-full p-4', className)}>
      <CardHeader className="px-0">
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="flex flex-col gap-4 px-0 flex-grow">
        {image && (
          <AspectRatio ratio={16 / 10}>
            <Image
              className="w-full h-full object-cover"
              src={image}
              width={540}
              height={400}
              alt={title}
              priority
            />
          </AspectRatio>
        )}
        {content && <div dangerouslySetInnerHTML={{ __html: content }} />}
      </CardContent>
      <CardFooter className="px-0">
        {buttons && <ButtonLinkGroup orientation="horizontal" items={buttons} />}
      </CardFooter>
    </Card>
  );
}
