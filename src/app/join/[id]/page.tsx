import Link from 'next/link';
import JoinContents from '@app/join/[id]/_components/JoinContents';
import { Logo } from '@components/icons';

const Join = () => {
  return (
    <>
      <header className={`w-full fixed top-0 left-0 right-0 z-10`}>
        <div className="px-5 h-12 flex items-center justify-start">
          <Link href={'/'}>
            <Logo className="w-20 h-10" />
          </Link>
        </div>
      </header>
      <main className="h-screen w-screen">
        <JoinContents />
      </main>
    </>
  );
};

export default Join;
