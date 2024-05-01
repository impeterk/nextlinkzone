import { getUserPages } from '@/lib/data';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await auth();
  const userPages = await getUserPages(session?.user?.id!);
  if (Boolean(userPages.length))
    redirect(`/dashboard/pages/${userPages[0].id}`);
  return (
    <div className='prose flex h-full flex-col items-center justify-center dark:prose-invert md:prose-xl '>
      {!Boolean(userPages.length) && (
        <>
          <h3>No pages created yet...</h3>
          <p>Click on the plus button, to create your first page</p>
        </>
      )}
    </div>
  );
}
