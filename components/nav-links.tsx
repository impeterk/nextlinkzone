"use client"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { LuUserCog, LuHome } from "react-icons/lu";
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
const links = [
  { name: 'Dashboard', href: '/dashboard', icon: LuHome },
  {
    name: 'Profile',
    href: '/dashboard/profile',
    icon: LuUserCog,
  },
];

export default function NavLinks() {
  const pathname = usePathname()
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon
        return (
          <Link key={link.name} href={link.href}>
            <Button variant={'link'} className={clsx(
              'flex items-center gap-2',
              {
                'underline text-emerald-500 dark:text-emerald-400': pathname === link.href
              }
            )}>
              <LinkIcon className='size-5' />
              <span>{link.name}</span>

            </Button>
          </Link>
        )
      })}
    </>
  )
}
