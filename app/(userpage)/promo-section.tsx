import { Button } from '@/components/ui/button';
import { MdOutlineDatasetLinked } from 'react-icons/md';
import Link from 'next/link';

export default function PromoSection() {
  return (
    <div className='container mb-8 flex justify-center items-center max-sm:mb-4 '>
      <Link href='/signin' >
        <Button variant='secondary' size="lg" className='flex items-center gap-2 shadow-lg'>
          <MdOutlineDatasetLinked className='size-8 text-emerald-500 dark:text-emerald-400' />
          <span className='text-2xl max-sm:text-xl'>Create your OWN Link</span>
        </Button>
      </Link>
    </div>
  );
}
