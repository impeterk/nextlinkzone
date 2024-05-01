'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LuLogIn } from 'react-icons/lu';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

export default function Signinink() {
  const pathname = usePathname();
  return (
    <Link href='/signin'>
      <Button
        variant={'link'}
        className={clsx('flex items-center gap-2', {
          'text-emerald-500 underline dark:text-emerald-400':
            pathname === '/signin',
        })}
      >
        <LuLogIn className='size-5' />
        <span>Sign In</span>
      </Button>
    </Link>
  );
}
