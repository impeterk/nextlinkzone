import { mailer } from '@/lib/mailer';

export async function POST(request: Request) {
  console.log(request);
  const formData = await request.formData();
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;
  const response = await mailer({ email, name, message });

  if (!response) {
    return new Response('Something went wrong', {
      status: 400,
    });
  }

  return new Response(String('mail was sent'));
}
