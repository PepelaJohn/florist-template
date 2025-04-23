// src/components/sections/Subscriptions.tsx
import Image from 'next/image';
import Link from 'next/link';
import Button from '../ui/Button';

export default function Subscriptions() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-3">
            <div className="grid grid-cols-3 gap-2">
              <div>
                <Image 
                  src="/images/3.png" 
                  alt="Subscription flowers" 
                  width={400}
                  height={300}
                  className="w-full h-auto"
                />
              </div>
              <div>
                <Image 
                  src="/images/4.png" 
                  alt="Subscription flowers" 
                  width={400}
                  height={300}
                  className="w-full h-auto"
                />
              </div>
              <div>
                <Image 
                  src="/images/5.png" 
                  alt="Subscription flowers" 
                  width={400}
                  height={300}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <h3 className="uppercase font-medium mb-2">The Signature Subscription</h3>
            <p className="text-sm mb-4">Perfect for: Bright, long-lasting seasonal blooms</p>
            <Link href="/subscriptions/signature" passHref>
              <Button variant="outline" className='text-white hover:text-black' size="sm">Shop Now</Button>
            </Link>
          </div>
          
          <div className="text-center">
            <h3 className="uppercase font-medium mb-2">The Prestige Subscription</h3>
            <p className="text-sm mb-4">Perfect for: Flower lovers with professional styling</p>
            <Link href="/subscriptions/prestige" passHref>
            <Button variant="outline" className='text-white hover:text-black' size="sm">Shop Now</Button>
            </Link>
          </div>
          
          <div className="text-center">
            <h3 className="uppercase font-medium mb-2">The Seasonal Subscription</h3>
            <p className="text-sm mb-4">New seasonal floral selects every month</p>
            <Link href="/subscriptions/seasonal" passHref>
            <Button variant="outline" className='text-white hover:text-black' size="sm">Shop Now</Button>
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <div className="relative h-64 md:h-96">
            <Image
              src="/images/8.jpeg" 
              alt="Super Bouquets" 
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-white text-2xl font-light uppercase tracking-wider">Super Bouquets</h3>
            </div>
          </div>
          
          <div className="relative h-64 md:h-96">
            <Image
              src="/images/15.jpeg" 
              alt="New Season Tulips" 
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-white text-2xl font-light uppercase tracking-wider">New Season Tulips</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}