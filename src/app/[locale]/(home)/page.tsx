import { getHomePage } from '@/lib/api/homeService';
import { blockFactory } from '@/lib/factories/blockFactory';
import { Home } from '@/types/home/Home';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const home: Home = await getHomePage({
    locale,
  });
  const blocks = home.blocks;
  return (
    <div className="flex flex-col gap-4 xl:gap-6">{blocks.map((block) => blockFactory(block))}</div>
  );
}
