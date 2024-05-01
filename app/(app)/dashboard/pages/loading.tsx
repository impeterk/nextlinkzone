import { ImSpinner2 } from 'react-icons/im';

export default function PagesLoading() {
  return (
    <>
      <div className='flex h-full flex-col items-center justify-center gap-4'>
        <ImSpinner2 className='animate-spin text-7xl' />
        Loading...
      </div>
    </>
  );
}
