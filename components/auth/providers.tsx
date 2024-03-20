import { FaGithub} from 'react-icons/fa';
import { logInWithProvider } from '@/lib/actions';
import ProviderButton from './providers-button';
import { FcGoogle } from "react-icons/fc";

const providers = [{ name: 'google', icon: FcGoogle }, {name: 'github', icon: FaGithub}];

export default function Providers() {

  return (
    <ul className='mx-auto flex flex-col justify-center items-center w-full max-w-xs gap-2'>
      {providers.map((provider) => {
        const ProviderIcon = provider.icon;
        return (<li key={provider.name} className='w-full'>
            <form className='w-full' action={logInWithProvider}>
                <input type="hidden" name="provider" value={provider.name} />
                <ProviderButton>
                    <ProviderIcon className='size-6'/>
                    <span className="capitalize text-xl">{provider.name}</span>
                </ProviderButton>
            </form>
        </li>);
      })}
    </ul>
  );
}
