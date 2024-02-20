import ClaimUsernameForm from '@/components/forms/claim-name-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LuInfo } from 'react-icons/lu';

export default function CreateNewPage({
  searchParams,
}: {
  searchParams: { username: string };
}) {
  return (
    <section className='mx-auto w-full max-w-lg'>
      <Card>
        <CardHeader className='text-center'>
          <CardTitle >Your Desired Username</CardTitle>
          <CardDescription className='flex justify-center items-center gap-1'><LuInfo className='text-emerald-500 dark:text-emerald-400'/> You can change it later</CardDescription>
        </CardHeader>
        <CardContent>
        <ClaimUsernameForm username={searchParams.username} />
        </CardContent>
      </Card>
    </section>
  );
}
