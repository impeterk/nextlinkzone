import { getUserPage } from '@/lib/data';
import {
  LinkList,
  PageHeader,
} from '@/components/dashboard/page/page-components';
import {
  PageOptions,
  NewLink,
  ChangeHeaderColor
} from '@/components/dashboard/page/client-components';
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu';

export default async function DashboardPage({
  params,
}: {
  params: { page: string };
}) {
  const pageData = await getUserPage(params.page);
  if (!pageData) throw new Error('Page was not found');
  // console.log(pageData)

  return (
    <article className='relative'>
      <PageHeader pageData={pageData} />
      {/* <DeletePageForm pagename={params.page} /> */}
      <div className="absolute top-1 right-1 flex flex-col">
      <PageOptions />
      <ChangeHeaderColor currentColor={pageData?.bgColor ?? 'hsl(var(--card))' }/>
      </div>
      <LinkList links={pageData?.links} displayDelete={true} />
      <div className="my-4">
      <DropdownMenuSeparator />
      </div>
      <NewLink />
    </article>
  );
}

// async function UserPage({ name }: { name: string }) {
//   // await new Promise((resolve) => setTimeout(resolve, 5000))
//   unstable_noStore();
//   const pageData = await getUserPage(name);
//   if (!pageData) throw new Error('Page was not found');
//   return (
//     <>
//       <PageHeader pageData={pageData} />
//       {/* <DeletePageForm pagename={name} /> */}
//       <LinkList links={pageData?.links} />
//       <NewLink />
//     </>
//   );
// }
