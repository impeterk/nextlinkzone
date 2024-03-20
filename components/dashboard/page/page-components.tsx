
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserPages } from "@/lib/data"
import { auth } from "@/auth"
import {NewLink, PageCard, UserLink} from "./client-components";



export async function PageHeader({pageData}: {pageData: any}) {
    return (
        <header>
        <Card className='flex h-fit min-h-60 flex-col justify-center shadow'>
          <CardContent className='mt-auto text-center text-3xl'>
            {pageData.id}
          </CardContent>
          <CardFooter className='mt-auto flex justify-center'>
            <div className='relative'>
              <UserImage image={pageData?.image} fallback={pageData.id}/>
            </div>
          </CardFooter>
        </Card>
      </header>
        )
}

export function LinkList({links}: {links: any}) {
  return (
    <main className='mt-40'>
        <ul className='space-y-4'>
          {Boolean(links.length) && links.map((link: any) => (
            <li key={link.id}><UserLink href={link.href} icon={link?.icon} name={link.name} /></li>
          ))}
          {!Boolean(links.length) && <>
          <div className="w-full h-full flex items-center justify-center">
            <span className="prose">

            <h3 className="text-muted-foreground dark:text-muted">No Links Created Yet</h3>
            </span>
          </div>
          </>}
        </ul>
      </main>
  )
}


function UserImage({image, fallback}: {image: string | null, fallback:string}) {

    return (
      <Avatar className='absolute -left-20 -top-12 size-40  border-2 border-primary'>
         {image && <AvatarImage src={image} alt={`user page avatar`} />}
        <AvatarFallback className="capitalize text-5xl">{fallback[0]}</AvatarFallback>
      </Avatar>
    );
  }

export async function UserPages() {
    const session = await auth()
    const user = session?.user
    if (!user) return null
    const usersPages = await getUserPages(user.id!)
    return (
        <>
        <ul className="space-y-4 max-h-[60vh] overflow-y-auto">
            {usersPages.map((page) => (
                <li  key={page.id}>
                <PageCard name={page.id} />
                </li>
            ))}
        </ul>
        </>
    )
}