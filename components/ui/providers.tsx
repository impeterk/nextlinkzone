import { FaGithub, FaGoogle } from 'react-icons/fa';
import { Button } from './button';
import { logInWithProvider } from '@/app/lib/actions';
const providers = [{ name: 'google', icon: FaGoogle }, {name: 'github', icon: FaGithub}];

export default function Providers() {
  return (
    <ul className='mx-auto flex flex-col justify-center items-center w-full max-w-xs gap-2'>
      {providers.map((provider) => {
        const ProviderIcon = provider.icon;
        return (<li key={provider.name} className='w-full'>
            <form className='w-full' action={logInWithProvider}>
                <input type="hidden" name="provider" value={provider.name} />
                <Button className='w-full flex items-center gap-2' size="lg">
                    <ProviderIcon className='size-6'/>
                    <span className="capitalize text-xl">{provider.name}</span>
                </Button>
            </form>
        </li>);
      })}
    </ul>
  );
}
