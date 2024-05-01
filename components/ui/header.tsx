import { ThemeToggle } from '@/components/theme/theme-toggle';
import { Logo } from '@/components/buttons';
import SigninLink from '@/app/(app)/signin/SigninLink';
import { auth } from '@/auth';
import UserDropDown from '@/app/(app)/_components/user-dropdown';

export default async function Header() {
  const session = await auth();
  const user = session?.user;
  return (
    <header className='w-full border-b py-4 shadow'>
      <div className='container flex items-center justify-between'>
        <Logo href={user ? '/dashboard/pages' : '/'} />

        <div className='flex items-center gap-6'>
          <div className='flex items-center'>
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
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
