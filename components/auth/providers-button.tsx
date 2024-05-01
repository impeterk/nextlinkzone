'use client';
import { ReactNode } from 'react';
import { Button } from '../ui/button';
import { useFormStatus } from 'react-dom';
import { ReloadIcon } from '@radix-ui/react-icons';

export default function ProviderButton({ children }: { children: ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <Button
      className='flex w-full items-center gap-2'
      disabled={pending}
      size='lg'
    >
      {pending && <ReloadIcon className='mr-2 size-6 animate-spin stroke-2' />}{' '}
      {children}
    </Button>
  );
}
