import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Providers from '@/components/auth/providers';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoCircledIcon } from '@radix-ui/react-icons';
export default function LoginCard() {
  return (
    <Card>
      <CardHeader className='prose text-center dark:prose-invert'>
        <CardTitle className='text-4xl'>Sign In</CardTitle>
        <CardDescription>
          Sign in to your account with one of provided options
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Providers />
      </CardContent>
      <CardFooter>
        <Alert className='mx-auto max-w-sm space-x-2 border-yellow-500 bg-yellow-400/50 dark:border-yellow-400 dark:bg-transparent'>
          <InfoCircledIcon className='size-6 ' />
          <AlertTitle>No Credentials Support</AlertTitle>
          <AlertDescription className='text-balance'>
            We do not provide username and password as option, since passwords
            are 💩
          </AlertDescription>
        </Alert>
      </CardFooter>
    </Card>
  );
}
