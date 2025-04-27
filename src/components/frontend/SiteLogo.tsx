import Logo from '../icons/Logo';
import WireContainer from './WireContainer';

export default function SiteLogo() {
  return (
    <WireContainer>
      <h1 className="font-header flex-start flex p-1 px-2 text-3xl font-normal">
        <span className="text-secondary-700 dark:text-secondary-500">eduardo</span>
        <Logo className="mt-1 size-6" />
        <span className="flex font-semibold">
          <span className="hidden">c</span>hiaro
        </span>
      </h1>
    </WireContainer>
  );
}
