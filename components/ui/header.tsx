import { ThemeToggle } from '@/components/theme/theme-toggle';
import { Logo } from '@/components/buttons';
import SigninLink from '@/app/(app)/signin/SigninLink';
import { auth } from '@/auth';
import UserDropDown from '@/app/(app)/_components/user-dropdown';

import { UserPages } from '../dashboard/page/page-components';
import { MobileSideBar, NewPage } from '../dashboard/page/client-components';
import GetStartedButton from '@/app/(app)/_components/get-started-btn';

export default async function Header() {
  const session = await auth();
  const user = session?.user;
  return (
    <header className='w-full border-b py-4 shadow'>
      <div className='container flex items-center justify-between'>
        <Logo href={user ? '/dashboard/pages' : '/'} />

        <div className='flex items-center gap-6'>
          <div className='hidden lg:block'>
            <ThemeToggle />
          </div>

          <div className='hidden items-center lg:flex'>
            {!user && (
              <>
                <SigninLink />
              </>
            )}
            {user && (
              <>
                <UserDropDown user={user} />
              </>
            )}
          </div>
          <div className='lg:hidden'>
            <MobileSideBar>
              <div className='item-center flex h-full flex-col py-12'>
                {user ? (
                  <>
                    <NewPage />
                    <div className='pt-16'>
                      <UserPages />
                    </div>
                    <div className='mt-auto flex items-center justify-evenly'>
                      <ThemeToggle />
                      <UserDropDown user={user} />
                    </div>
                  </>
                ): (
                  <>
                  <div className="mt-auto w-full">

                  <GetStartedButton />
                  </div>
                  </>
                )}
              </div>
            </MobileSideBar>
          </div>
        </div>
      </div>
    </header>
  );
}
