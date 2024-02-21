import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Providers from '@/components/ui/providers';
import { LuInfo } from 'react-icons/lu';

export default function CreateNewPage({
  searchParams,
}: {
  searchParams: { username: string };
}) {
  return (
    <section className='mx-auto w-full max-w-lg flex flex-col justify-center h-full'>
      <Card>
        <CardHeader className='text-center'>
          <CardTitle >Create New Account</CardTitle>
          <CardDescription className='flex justify-center items-center gap-1'><LuInfo className='text-emerald-500 dark:text-emerald-400'/> Create new account with one provided options</CardDescription>
        </CardHeader>
        <CardContent>
        <Providers />
        </CardContent>
      </Card>
    </section>
  );
}
