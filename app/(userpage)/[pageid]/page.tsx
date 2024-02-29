import { getUserPage } from "@/app/lib/db"
import { PageHeader } from "@/components/dashboard/page/page-components";
import UserLink from "@/components/dashboard/page/user-linkl";

export default async function Page({params}: {params: {pageid: string}}){
    const pageData =  (await getUserPage(params.pageid))
    if (!pageData) return null
    return (
      <article>
        <PageHeader pageData={pageData} />
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