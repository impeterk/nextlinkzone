import { ThemeToggle } from "@/components/theme/theme-toggle";
import { LogOut, Logo } from '@/components/buttons'
import NavLinks from "../nav-links";
import SigninLink from "@/app/(app)/signin/SigninLink";
import {auth} from '@/auth'

export default async  function Header() {
  const session = await auth()
  const user = session?.user
  return (

    <header className="border-b w-full shadow py-4">
      <div className="flex justify-between container items-center">
        <Logo href={user ? '/dashboard/pages' : '/' }/>
        {user && <>
        <h3 className="text-xl text-popover-foreground">👋 Hello {user.name}</h3>
        </>}

        <div className="flex items-center gap-6">
          <div className="flex items-center">
            {!user && (
              <>
                <SigninLink />
              </>)}
            {user && (
              <>
                <NavLinks />
                <LogOut />
              </>
            )}
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
