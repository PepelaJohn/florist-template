// src/components/sections/Services.tsx
import Image from 'next/image';
import Link from 'next/link';
import Button from '../ui/Button';

export default function Services() {
  return (
    <section className="py-12 bg-[#f4f4f4] text-black">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-xl uppercase mb-8">DISCOVER THE WORLD OF FLOWERBOX</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8  mx-auto">
          <div className="flex flex-col items-center text-center">
            <div className="mb-3">
              <Image 
                src="/images/icons/delivery.png" 
                alt="Express Delivery" 
                width={250} 
                height={250}
              />
            </div>
            <p className="text-xs">Express Delivery</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="mb-3">
              <Image 
                src="/images/icons/personal.png" 
                alt="Complimentary Gift Wrapping" 
                width={250} 
                height={250}
              />
            </div>
            <p className="text-xs">Complimentary Gift Wrapping</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="mb-3">
              <Image 
                src="/images/icons/art.png" 
                alt="Named-Day Delivery" 
                width={250} 
                height={250}
              />
            </div>
            <p className="text-xs">Named-Day Delivery</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="mb-3">
              <Image 
                src="/images/icons/grower.jpg" 
                alt="Direct from the Grower" 
                width={250} 
                height={250}
              />
            </div>
            <p className="text-xs">Direct from the Grower</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="mb-3">
              <Image 
                src="/images/icons/carbon.png" 
                alt="100% Carbon Neutral" 
                width={250} 
                height={250}
              />
            </div>
            <p className="text-xs">100% Carbon Neutral</p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-16">
        <h2 className="text-center text-xl uppercase mb-8">FIND YOUR FLOWER SUBSCRIPTION</h2>
        <p className="text-center max-w-2xl mx-auto mb-6">
          Enjoy fresh flowers, delivered on repeat, without lifting a finger. Choose between weekly or biweekly deliveries from £35
        </p>
        <div className="text-center">
          <Link href="/subscriptions" passHref>
            <Button className='text-white'>Subscribe Now</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}