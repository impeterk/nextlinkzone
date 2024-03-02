'use client';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify-icon/react';
import { redirect, usePathname, useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle } from '../../ui/card';
import Link from 'next/link';
import clsx from 'clsx';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Cross1Icon, PlusIcon } from '@radix-ui/react-icons';
import { createNewPage, deletePage } from '@/app/lib/actions';
import { useEffect, useRef, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { ImSpinner2 } from 'react-icons/im';

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
          'flex  min-h-32 items-center justify-center opacity-50 hover:opacity-100 relative group',
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
  const [message, dispatch] = useFormState(createNewPage, undefined)
  const [open, setOpen] = useState(false)
  const router = useRouter()
  useEffect(() => {
    // @ts-ignore
    if (message?.success) {
      // @ts-ignore
      router.push(`/dashboard/pages/${message.pagename}`)
      setOpen(false)
    }
  }, [message, router])
  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
                placeholder='coolpagename'
                name='pagename'
                className='col-span-3'
              />
            </div>
            {message && <div className="text-destructive text-center">
              {message.text}
            </div>}
          </div>
          <DialogFooter>
            <NewPageSubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
function NewPageSubmitButton() {
  const {pending} = useFormStatus()

  return (
    <Button type='submit' disabled={pending}>
      {pending ? <>
      <ImSpinner2 className='mr-2 animate-spin size-5' />
      Loading...
      </>: <>Create New Page</>}
      </Button>

  )
}