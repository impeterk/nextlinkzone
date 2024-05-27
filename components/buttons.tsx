import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export function Logo({ href = '/' }) {
  return (
    <Link href={href}>
      <Button
        variant='link'
        className='flex items-center gap-2 px-0 text-3xl tracking-wider'
      >
        <Image
          src='/logo.webp'
          alt='my link zone logo'
          priority
          width={64}
          height={64}
          className='size-16 dark:invert'
        />
        <span>
          My<span className='text-emerald-500 dark:text-emerald-400'>Link</span>
          Zone
        </span>
      </Button>
    </Link>
  );
}
