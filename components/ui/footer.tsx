import { SiNextdotjs } from 'react-icons/si';
export default function Header() {
  return (
    <footer className='py-2 font-mono text-muted-foreground '>
      <div className='container flex items-center justify-center gap-2 max-sm:flex-col '>
        <p>&copy; NaP Developers {new Date().getFullYear()}</p>
        <span className='max-sm:hidden'>|</span>

        <p className='flex items-center gap-2'>
          powered by
          <SiNextdotjs className='text-xl' />
        </p>
      </div>
    </footer>
  );
}
