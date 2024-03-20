import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <section className='w-full max-w-lg space-y-20 md:mt-20'>
        <div className='prose text-pretty dark:prose-invert md:prose-xl'>
          <h1>
            Your <strong>ONE</strong> link to share with rest of the world
          </h1>
          <p>
            One link to help you share everything you create, curate and sell
            from all your social media profiles.
          </p>
        <Link href='/signin'>
          <Button
            className='w-full bg-emerald-500 py-6 text-xl font-semibold dark:bg-emerald-400'
            size='lg'
          >
            Join for free
          </Button>
        </Link>
        </div>
      </section>
    </>
  );
}
