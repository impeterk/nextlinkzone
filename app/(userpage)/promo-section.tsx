import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import logo from "@/app/icon.png"


export default function PromoSection() {
  return (
    <div className='container mb-8 flex items-center justify-center max-sm:mb-4 '>
      <Link href='/'>
        <Button
          variant='secondary'
          size='lg'
          className='flex items-center gap-2 shadow-lg'
        >
        <Image src={logo} alt="my link zone logo" priority className='size-12 dark:invert' />

          <span className='text-2xl max-sm:text-xl'>Create your OWN Link</span>
        </Button>
      </Link>
    </div>
  );
}
