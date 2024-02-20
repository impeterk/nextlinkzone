import { navigateToCreate } from '@/app/lib/actions';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';

export default function HeroForm() {
  return (
    <Card>
        <CardHeader>
            <CardTitle>Your Unique Link</CardTitle>
            <CardDescription>Create your unique link with all of your Socials to share with others.</CardDescription>
        </CardHeader>

      <CardContent>
        <form  action={navigateToCreate}>
          <div className='my-2 inline-flex w-full flex-col items-center justify-center text-xl shadow md:flex-row'>
            <p className='bg-white py-4 pl-2 text-center text-slate-600 max-md:w-full md:text-right'>
              mylinkz.one/
            </p>
            <Input
              className='h-full w-full rounded-none border-0 pl-0 text-xl outline-none focus-visible:ring-0 max-md:text-center shadow-none'
              placeholder='Your user name'
              name='username'
            />
            <Button
              type='submit'
              variant='default'
              className='w-full rounded-none bg-emerald-500 sm:py-8 font-semibold dark:bg-emerald-400 max-md:mt-2'
            >
              Join for Free!
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
