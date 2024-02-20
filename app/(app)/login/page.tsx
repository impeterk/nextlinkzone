import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Providers from "@/components/ui/providers";

export default function LoginPage() {
  return (
    <>
    <section className="w-full max-w-lg mx-auto">
    <Card>
      <CardHeader className="text-center prose dark:prose-invert">
        <CardTitle className="text-4xl">
          Log In
        </CardTitle>
        <CardDescription>
          Log in to your account with one of provided options
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Providers />
      </CardContent>
      </Card>
    </section>
    </>
  )
}
