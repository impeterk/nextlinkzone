'use client';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify-icon/react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle } from '../../ui/card';
import Link from 'next/link';
import clsx from 'clsx';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DotsVerticalIcon, PlusIcon, TrashIcon } from '@radix-ui/react-icons';
import { createNewPage, deletePage } from '@/lib/actions';
import { useEffect, useRef, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { ImSpinner2 } from 'react-icons/im';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { TbLinkPlus } from 'react-icons/tb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function UserLink({
  href,
  name,
  icon,
}: {
  href: string;
  name: string;
  icon: string | null;
}) {
  return (
    <a href={href} target='_blank' rel='noopener noreferrer'>
      <Button
        variant={'outline'}
        className='flex w-full items-center justify-center gap-4 p-6 text-xl'
        size={'lg'}
      >
        {icon && (
          <>
            <Icon icon={icon} className='text-3xl' />
          </>
        )}
        {name}
      </Button>
    </a>
  );
}

export function PageCard({ name }: { name: string }) {
  const pathname = usePathname();
  return (
    <Link href={`/dashboard/pages/${name}`}>
      <Card
        className={clsx(
          'group  relative flex min-h-32 items-center justify-center opacity-50 hover:opacity-100',
          {
            'border-emerald-500 opacity-100 dark:border-emerald-400 ':
              pathname.split('/').at(-1) === name,
          }
        )}
      >
        <CardHeader>
          <CardTitle className='text-center text-xl'>{name}</CardTitle>
        </CardHeader>
      </Card>
    </Link>
  );
}

export function NewPage() {
  const [message, dispatch] = useFormState(createNewPage, undefined);
  const [open, setOpen] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  useEffect(() => {
    // @ts-ignore
    if (message?.success) {
      // @ts-ignore
      router.push(`/dashboard/pages/${message.pagename}`);
      closeBtnRef.current?.click();
    }
  }, [message, router]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          className='flex items-center gap-4 py-8 text-xl hover:border-emerald-500'
        >
          <PlusIcon className='size-6' />
          <span>New Page</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <form action={dispatch}>
          <DialogHeader>
            <DialogTitle>Create New Page</DialogTitle>
            <DialogDescription>Create your new unique page</DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='name' className='text-right'>
                Name
              </Label>
              <Input
                id='name'
                placeholder='Cool Page Name'
                name='pagename'
                className='col-span-3'
              />
            </div>
            {message && (
              <div className='text-center text-destructive'>{message.text}</div>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild ref={closeBtnRef}>
              <Button
                type='button'
                variant='outline'
                onClick={() => {
                  console.log('closed');
                }}
              >
                Close
              </Button>
            </DialogClose>
            <NewPageSubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function NewPageSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type='submit' disabled={pending}>
      {pending ? (
        <>
          <ImSpinner2 className='mr-2 size-5 animate-spin' />
          Loading...
        </>
      ) : (
        <>Create New Page</>
      )}
    </Button>
  );
}

export function NewLink() {
  const form = useForm();

  return (
    <footer className='mt-8'>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant='outline'
            className='flex w-full items-center gap-4 py-6  text-xl'
          >
            <TbLinkPlus className='size-6' />
            <span className='font-light'>Create New Link</span>
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <Form {...form}>
            <FormField
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder='shadcn' {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Form>
        </DialogContent>
      </Dialog>
    </footer>
  );
}

export function PageOptions() {
  const pathname = usePathname();

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' size='icon'>
            <DotsVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side='bottom' align='end'>
          <DropdownMenuLabel>Page Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem asChild>
              <Button
                variant='destructive'
                className='flex w-full items-center gap-2'
              >
                <TrashIcon className='size-5' /> Delete
              </Button>
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeletePage />
    </Dialog>
  );
}

function DeletePage() {
  const { page } = useParams<{ page: string }>();
  const form = useForm();
  const { isSubmitting } = form.formState;
  form.setValue('pagename', page);
  async function onSubmit(value: any) {
    return await deletePage(value);
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. Are you sure you want to permanently
          delete this page from our servers?
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form className='space-y-8' onSubmit={form.handleSubmit(onSubmit)}>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type='button'
                variant='secondary'
                onClick={() => {
                  console.log('closed');
                }}
              >
                Close
              </Button>
            </DialogClose>
            <Button
              type='submit'
              variant='destructive'
              className='flex items-center gap-2'
              disabled={isSubmitting}
            >
              {' '}
              {isSubmitting ? (
                <ImSpinner2 className='size-5 animate-spin' />
              ) : (
                <TrashIcon className='size-5' />
              )}
              Delete Page
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
