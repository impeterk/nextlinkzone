import { getUserPage } from '@/app/lib/data';
import { PageHeader } from '@/components/dashboard/page/page-components';
import {UserLink} from '@/components/dashboard/page/client-components';
import { Button } from '@/components/ui/button';
import { Cross1Icon } from '@radix-ui/react-icons';
import { deletePage } from '@/app/lib/actions';

export default async function DashboardPage({params}: {params: {page: string}}) {
  const pageData =  (await getUserPage(params.page))
  if (!pageData) return null
  return (
    <article className='relative'>
      <PageHeader pageData={pageData} />
      <form 
        action={deletePage}
        className='absolute top-1 right-1 text-destructive'>
          <input name="pagename" value={params.page} hidden />
        <Button variant={'ghost'}
        >
          <Cross1Icon className='size-4 mr-2' />
          <span>Delete Page</span>
        </Button>
          </form>
      <main className='mt-40'>
        <ul className='space-y-4'>
          {pageData.links && pageData.links.map(link => (
            <li key={link.id}><UserLink href={link.href} icon={link?.icon} name={link.name} /></li>
          ))}
        </ul>
      </main>
    </article>
  );
}


