import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MdOutlineDatasetLinked } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";

export function LogOut() {
  return (
    <Button variant={'link'} className="flex items-center gap-2">
      <LuLogOut className='size-5' />
      <span>Log Out</span>
    </Button>
  )
}

export function Logo() {
  return (
    <Link href="/">
      <Button variant="link" className="text-3xl tracking-wider flex items-center gap-2 px-0" >
        < MdOutlineDatasetLinked className="size-10" />
        <span>My<span className="text-emerald-500 dark:text-emerald-400">Link</span>Zone</span>
      </Button>
    </Link>
  )
}
