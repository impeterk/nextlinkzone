import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Providers from "@/components/auth/providers";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoCircledIcon } from "@radix-ui/react-icons";

export default function LoginPage() {
  return (
    <>
    <section className="w-full max-w-lg mx-auto flex flex-col justify-center h-full
    ">
    <Card>
      <CardHeader className="text-center prose dark:prose-invert">
        <CardTitle className="text-4xl">
          Sign In
        </CardTitle>
        <CardDescription>
          Sign in to your account with one of provided options
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Providers />
      </CardContent>
      <CardFooter >
        <Alert className="border-yellow-500 bg-yellow-400/50 dark:bg-transparent dark:border-yellow-400 space-x-2 mx-auto max-w-sm">
          <InfoCircledIcon className="size-6 "/>
          <AlertTitle>No Credentials Support</AlertTitle>
          <AlertDescription className="text-balance">We do not provide username and password as option, since passwords are 💩</AlertDescription>
        </Alert>
      </CardFooter>
      </Card>
    </section>
    </>
  )
}
