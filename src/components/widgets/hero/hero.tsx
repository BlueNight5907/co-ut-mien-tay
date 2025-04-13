'use client';

import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useRouter } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import ButtonLinkGroup, { ButtonLinkDef } from '../button-link-group';

export type HeroDef = {
  image: string;
  info?: {
    headline: string;
    description?: string;
    buttons?: ButtonLinkDef[];
  };
  layout?: 'image_left' | 'image_right' | 'image_center';
  infoPosition?: 'left' | 'right' | 'center';
  background?: string;
  href?: string;
  infoBackground?: string;
  textColor?: string;
};

export type HeroProps = {
  image: string;
  info?: {
    headline: string;
    description?: string;
    buttons?: ButtonLinkDef[];
  };
  className?: string;
  layout?: 'image_left' | 'image_right' | 'image_center';
  infoPosition?: 'left' | 'right' | 'center';
  background?: string;
  href?: string;
  infoBackground?: string;
  textColor?: string;
};

export function Hero(props: HeroProps) {
  const {
    layout,
    infoPosition,
    href = '',
    background,
    infoBackground,
    textColor,
    image,
    info,
    className,
  } = props;
  const router = useRouter();

  const classes = {
    info: '',
    image: '',
  };

  switch (layout) {
    case 'image_left':
      classes.info = 'items-end';
      classes.image = 'justify-start';
      break;
    case 'image_right':
      classes.info = 'items-start';
      classes.image = 'justify-end';
      break;
    case 'image_center':
      switch (infoPosition) {
        case 'left':
          classes.info = 'items-start';
          break;

        case 'right':
          classes.info = 'items-end';
          break;

        case 'center':
          classes.info = 'items-center';
          break;

        default:
          break;
      }
      classes.image = 'justify-center [&>img]:w-full [&>img]:h-full p-0';
      break;
    default:
      break;
  }

  return (
    <Card
      onClick={() => href && router.push(href)}
      style={{ backgroundColor: background }}
      className={cn('w-full h-48 sm:h-64 md:h-72 lg:h-86 p-0 overflow-hidden', className)}
    >
      <CardContent className="flex relative justify-between h-full gap-4 px-0 flex-grow">
        {info && (
          <div
            className={cn(
              'absolute left-0 top-0 flex flex-col justify-center z-10 w-full h-full',
              classes.info
            )}
            style={{
              backgroundColor: infoBackground,
            }}
          >
            <div className="flex flex-col justify-center min-h-0 h-full w-full sm:w-auto sm:h-auto  p-4 lg:p-8 gap-2 xl:gap-4 max-w-[320px] lg:max-w-[520px]">
              <h4
                className="font-semibold text-sm sm:text-md lg:text-lg"
                style={{ color: textColor }}
              >
                {info.headline}
              </h4>
              {info.description && (
                <ScrollArea className="min-h-0">
                  <div
                    className="text-xs sm:text-sm"
                    dangerouslySetInnerHTML={{ __html: info.description }}
                    style={{ color: textColor }}
                  ></div>
                  <ScrollBar orientation="vertical" />
                </ScrollArea>
              )}

              {info.buttons && <ButtonLinkGroup orientation="horizontal" items={info.buttons} />}
            </div>
          </div>
        )}
        <div
          className={cn('absolute left-0 top-0 z-5 right-0 p-4 h-full w-full flex', classes.image)}
        >
          <Image
            className="w-auto h-auto max-h-full block object-contain"
            src={image}
            width={540}
            height={400}
            priority
            alt="hero image"
          />
        </div>
      </CardContent>
    </Card>
  );
}
