import { Card } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

export default function UserPageSkeleton() {
  return (
    <>
      <HeaderSkeleton />
      <LinkListSkeleton />
    </>
  );
}

export function HeaderSkeleton() {
  return (
    <div className='relative'>
      <Skeleton className='h-60 w-full rounded-xl' />
      <div className='absolute -bottom-1/3 right-1/2 size-40    translate-x-1/2  rounded-full border-2 border-primary bg-background'>
        <Skeleton className='size-full rounded-full' />
      </div>
    </div>
  );
}

export function LinkListSkeleton() {
  return (
    <ul className='mt-32 w-full space-y-4 '>
      <li>
        <Skeleton className='h-16 w-full' />
      </li>
      <li>
        <Skeleton className='h-16 w-full' />
      </li>
      <li>
        <Skeleton className='h-16 w-full' />
      </li>
      <li>
        <Skeleton className='h-16 w-full' />
      </li>
      <li>
        <Skeleton className='h-16 w-full' />
      </li>
    </ul>
  );
}
