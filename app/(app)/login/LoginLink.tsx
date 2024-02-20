
'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { LuUserPlus } from "react-icons/lu";
import clsx from 'clsx';
import { usePathname } from 'next/navigation';


export default function LoginLink() {
  const pathname = usePathname()
  return (

    <Link href='/login'>
      <Button variant={'link'} className={clsx(
        'flex items-center gap-2',
        {
          'underline text-emerald-500 dark:text-emerald-400': pathname === '/login'
        }
      )}>
        <LuUserPlus className='size-5' />
        <span>Log In</span>
      </Button>
    </Link >
  )
}
