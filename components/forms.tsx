'use client';

import { Form, useForm } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { deletePage } from '@/lib/actions';
import { useParams } from 'next/navigation';
import { TrashIcon } from '@radix-ui/react-icons';
import { Children, ReactElement } from 'react';

export function DeletePageForm({ children }: { children: any }) {
  const { page } = useParams<{ page: string }>();

  const form = useForm();

  return (
    <Form {...form}>
      <form className='space-y-8'>
        <input hidden name='pageid' value={page} readOnly />
        {/* {Children} */}
      </form>
    </Form>
  );
}
