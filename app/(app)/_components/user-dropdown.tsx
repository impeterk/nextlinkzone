'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { signUserOut } from '@/lib/actions';
import clsx from 'clsx';
import { User } from 'next-auth';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LuHome, LuLogOut, LuUserCog } from 'react-icons/lu';

const links = [
  { name: 'Dashboard', href: '/dashboard/pages', icon: LuHome },
  {
    name: 'Profile',
    href: '/dashboard/profile',
    icon: LuUserCog,
  },
];

async function handleSignOut() {
  await signUserOut();
}

export default function UserDropDown({ user }: { user: User }) {
  const pathname = usePathname();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className='flex h-fit gap-2'>
          <Avatar>
            <AvatarImage src={user.image || ''} alt='user avatar' />
            <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
          </Avatar>
          <span>{user.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className="w-full">
        {links.map((link) => {
          const LinkIcon = link.icon;
          return (
            <Link key={link.name} href={link.href}>
              <DropdownMenuItem 
                className={clsx('flex items-center gap-2 px-6 py-4', {
                  'text-emerald-500 underline hover:text-emerald-500 dark:text-emerald-400 hover:dark:text-emerald-400':
                    pathname.includes(link.href),
                })}
              >

                <LinkIcon className='size-5' />
                <span>{link.name}</span>
              </DropdownMenuItem>
            </Link>
          );
        })}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className='flex items-center gap-2 bg-rose-400/60 py-2 px-6'
          onClick={handleSignOut}
        >
          <LuLogOut className='size-5' />
          <span className='flex w-full items-center justify-between'>
            Sign Out
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
