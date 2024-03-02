import {NewPage, PageCard }from '@/components/dashboard/page/client-components';
import {UserPages} from '@/components/dashboard/page/page-components';

export default function DashboardPagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className='grid h-full grid-cols-5 '>
      <div className='col-span-1 flex max-h-fit flex-col gap-4 '>
        <div className='prose border-b px-8 pb-4 dark:prose-invert md:prose-xl'>
          <h2>Pages</h2>
        </div>
        <NewPage />
        <UserPages />
      </div>
      <section className='col-span-4 ml-8'>
        {children}
      </section>
    </div>
  );
}
