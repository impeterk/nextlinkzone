import { getUserPage } from '@/app/lib/db';
import { auth } from '@/auth';
import { AvatarImage, Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

export default async function DashboardPage({params}: {params: {page: string}}) {
  const pageData =  (await getUserPage(params.page))
  console.log(pageData)
  if (!pageData) return null
  return (
    <article>
      <header>
        <Card className='flex h-fit min-h-60 flex-col justify-center shadow'>
          <CardContent className='mt-auto text-center text-3xl'>
            {pageData.id}
          </CardContent>
          <CardFooter className='mt-auto flex justify-center'>
            <div className='relative'>
              <UserImage />
            </div>
          </CardFooter>
        </Card>
      </header>
      <main>
        <ul>
          {pageData.links && pageData.links.map(link => (
            <li key={link.id}>{link.href}</li>
          ))}
        </ul>
      </main>
    </article>
  );
}

async function UserImage() {
  const session = await auth();
  if (!session?.user) return null;
  const user = session.user;
  let userInitials = user.name!.split(' ').map(word => word[0]).join('')
  return (
    <Avatar className='absolute -left-20 -top-12 size-40  border-2 border-primary'>
      <AvatarImage src={user.image!} alt={`${user.name} avatar`} />
      <AvatarFallback>{userInitials}</AvatarFallback>
    </Avatar>
  );
}
