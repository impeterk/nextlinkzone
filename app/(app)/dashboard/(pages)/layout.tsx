import PageCard from '@/components/dashboard/page-card';

export default function DashboardPagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='grid h-full grid-cols-5 '>
      <div className='col-span-1 flex h-full flex-col gap-4 '>
        <div className='prose border-b px-8 pb-4 dark:prose-invert md:prose-xl'>
          <h2>Pages</h2>
        </div>
        <PageCard />
      </div>
      <section className='col-span-4 ml-8'>
        {children}
      </section>
    </div>
  );
}
