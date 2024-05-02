import { getUserPage } from '@/lib/data';
import {
  LinkList,
  PageHeader,
} from '@/components/dashboard/page/page-components';
// import {UserLink} from "@/components/dashboard/page/client-components";
import { Suspense } from 'react';
import UserPageSkeleton from '@/components/skeleton/UserPageSkeleton';
import { Metadata, ResolvingMetadata } from 'next';

 
export async function generateMetadata(
  {
    params,
  }: {
    params: { pageid: string };
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { pageid } = params;
  return {
    title: `@${pageid}`,
  };
}


export default async function Page({ params }: { params: { pageid: string } }) {
  // const pageData =  (await getUserPage(params.pageid))
  // if (!pageData) return null
  return (
    <article className='mx-auto max-w-4xl pt-10'>
      <Suspense fallback={<UserPageSkeleton />}>
        <PageData pagename={params.pageid} />
      </Suspense>
    </article>
  );
}

async function PageData({ pagename }: { pagename: string }) {
  const pageData = await getUserPage(pagename);
  if (!pageData) return null;

  return (
    <>
      <PageHeader pageData={pageData} />
      <LinkList links={pageData?.links} />
    </>
  );
}
