import { getPageLinks, getUserPage } from '@/lib/data';
import {
  LinkList,
  PageHeader,
} from '@/components/dashboard/page/page-components';
// import {UserLink} from "@/components/dashboard/page/client-components";
import { Suspense } from 'react';
import { HeaderSkeleton, LinkListSkeleton } from '@/components/skeleton/UserPageSkeleton';
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
      <Suspense fallback={<HeaderSkeleton />}>
        <Header pagename={params.pageid} />
      </Suspense>
      <main className='mt-40'>
      <Suspense fallback={<LinkListSkeleton />}>
        <Links pagename={params.pageid} />
      </Suspense>
      </main>
    </article>
  );
}

async function Header({pagename}: {pagename: string}) {
  const headerData = await getUserPage(pagename);
  if (!headerData) return null
  return (
    <>
      <PageHeader pageData={headerData} />
    
    </>
  )
}

async function Links({pagename}: {pagename: string}) {
  const linksData = await getPageLinks(pagename)
  if (!linksData) return null
  return (
    <>
        <LinkList links={linksData} />
    </>
  )
}