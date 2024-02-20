'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { LuUserPlus } from "react-icons/lu";
import clsx from 'clsx';
import { usePathname } from 'next/navigation';


export default function CreateLink() {
  const pathname = usePathname()
  return (

    <Link href='/create'>
      <Button variant={'link'} className={clsx(
        'flex items-center gap-2',
        {
          'underline text-emerald-500 dark:text-emerald-400': pathname === '/create'
        }
      )}>
        <LuUserPlus className='size-5' />
        <span>Create New</span>
      </Button>
    </Link >
  )
}
