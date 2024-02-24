import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { LuLogOut } from "react-icons/lu";
import logo from "@/app/icon.png"
import Image from 'next/image';
import {signOut, auth} from '@/auth'

export function LogOut() {
  return (
    <form
        action={
          async() => {
            'use server';
            await signOut({redirectTo: "/"})
          }
        }>
    <Button variant={'link'} className="flex items-center gap-2">
      <LuLogOut className='size-5' />
      <span>Log Out</span>
    </Button>
    </form>
  )
}

export function Logo({href = '/'}) {
  return (
    <Link href={href}>
      <Button variant="link" className="text-3xl tracking-wider flex items-center gap-2 px-0" >
        <Image src={logo} alt="my link zone logo" priority className='size-16 dark:invert' />
        <span>My<span className="text-emerald-500 dark:text-emerald-400">Link</span>Zone</span>
      </Button>
    </Link>
  )
}
