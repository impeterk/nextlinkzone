import { getUserPageWithLinks } from '@/lib/data';
import {
  LinkList,
  PageHeader,
} from '@/components/dashboard/page/page-components';
import {
  PageOptions,
  NewLink,
  ChangeHeaderColor,
  ChangeUserImage,
  PageMain,
} from '@/components/dashboard/page/client-components';
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu';

export default async function DashboardPage({
  params,
}: {
  params: { page: string };
}) {
  const pageData = await getUserPageWithLinks(params.page);
  if (!pageData) throw new Error('Page was not found');

  return (
    <article className='relative'>
      <PageHeader pageData={pageData}>
        <ChangeUserImage userImg={pageData?.image || ''} />
      </PageHeader>
      {/* <DeletePageForm pagename={params.page} /> */}
      <div className='absolute right-1 top-1 flex flex-col'>
        <PageOptions />
        <ChangeHeaderColor
          
        />
      </div>
      <main className='mt-40'>
      <PageMain
      currentBgColor={pageData?.bgColor ?? 'hsl(var(--card))'}
      currentColor={pageData?.color ?? 'hsl(var(--card-foreground))'}
      >
        <>
          <LinkList links={pageData?.links} displayDelete={true} />
          <div className='my-4'>
            <DropdownMenuSeparator />
          </div>
          <NewLink />
        </>
      </PageMain>
      </main>
    </article>
  );
}