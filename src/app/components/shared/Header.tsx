import logo from '@/app/assets/images/logo_Acorel.png';
import Image from "next/image";

export default function Header() {
  return (
    <header className='flex justify-center md:justify-start items-center p-4 md:p-8 w-full bg-blue-50 font-[family-name:var(--font-geist-mono)]'>
      <div className='flex gap-4 items-center'>
        <Image src={logo} alt='Acorel Logo' width={100} height={50} priority />
        <h1 className='text-1xl'>Library</h1>
      </div>
    </header>
  )
}