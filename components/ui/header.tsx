import { ThemeToggle } from "@/components/theme/theme-toggle";
import { LogOut, Logo } from '@/components/buttons'
import NavLinks from "./nav-links";
import CreateLink from "@/app/(main)/create/CreateLink";
import LoginLink from "@/app/(main)/login/LoginLink";

export default function Header() {
  const user = true
  return (

    <header className="border-b w-full shadow py-4">
      <div className="flex justify-between container items-center">
        <Logo />

        <div className="flex items-center gap-6">
          <div className="flex items-center">
            {!user && (
              <><CreateLink />
                <LoginLink />
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
