import Image from 'next/image';
import JoinContents from '@app/join/[id]/_components/JoinContents';

const Join = () => {
  return (
    <>
      <header className={`w-full fixed top-0 left-0 right-0 z-10`}>
        <div className="px-5 h-12 flex items-center justify-start">
          <Image src="/icons/modakLogo.webp" width={80} height={34} alt="Modak Modak Logo" className="w-20 h-10" />
        </div>
      </header>
      <main className="h-screen w-screen">
        <JoinContents />
      </main>
    </>
  );
};

export default Join;
