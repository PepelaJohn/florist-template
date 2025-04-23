// src/components/sections/Hero.tsx
import Image from 'next/image';
import Link from 'next/link';
import Button from '../ui/Button';

export default function Hero() {
  return (
    <div className="relative">
      <div className="w-full h-[50vh] md:h-[65vh] bg-red-600 relative">
        <Image
          src="/images/2.jpeg"
          alt="Shop with next day delivery"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="max-w-xl px-4">
            <h1 className="text-white text-3xl md:text-5xl font-light uppercase tracking-wide mb-4">
              Shop with next day delivery
            </h1>
            <p className="text-white text-lg mb-6">Delivered by tomorrow</p>
            <Link href="/products" passHref>
              <Button size="lg">Shop Now</Button>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="w-full bg-white  px-4 py-6">
        <div className="flex justify-center mx-auto w-1/2 space-x-8">
          <Image src="/images/MOBILE_PRESS_LOGOS-4.jpeg" alt="Vogue" className='w-full' width={500} height={200} />
        </div>
      </div>
    </div>
  );
}