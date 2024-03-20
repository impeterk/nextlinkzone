import { getUserPage } from '@/lib/data';
import {
  LinkList,
  PageHeader,
} from '@/components/dashboard/page/page-components';
import {
  UserLink,
  NewLink,
  PageOptions,
} from '@/components/dashboard/page/client-components';
import { Suspense } from 'react';
import UserPageSkeleton, {
  HeaderSkeleton,
} from '@/components/skeleton/UserPageSkeleton';
import { unstable_noStore } from 'next/cache';

export default async function DashboardPage({
  params,
}: {
  params: { page: string };
}) {
  const pageData = await getUserPage(params.page);
  if (!pageData) throw new Error('Page was not found');

  return (
    <article className='relative'>
      <PageHeader pageData={pageData} />
      {/* <DeletePageForm pagename={params.page} /> */}
      <div className="absolute top-1 right-1">

      <PageOptions />
      </div>
      <LinkList links={pageData?.links} />
      <NewLink />
    </article>
  );
}

async function UserPage({ name }: { name: string }) {
  // await new Promise((resolve) => setTimeout(resolve, 5000))
  unstable_noStore();
  const pageData = await getUserPage(name);
  if (!pageData) throw new Error('Page was not found');

  return (
    <>
      <PageHeader pageData={pageData} />
      {/* <DeletePageForm pagename={name} /> */}
      <LinkList links={pageData?.links} />
      <NewLink />
    </>
  );
}
