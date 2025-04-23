import Image from 'next/image';

interface Testimonial {
  id: string;
  name: string;
  quote: string;
  stars: number;
}

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Sophie',
      quote: 'I ordered a beautiful bouquet for my mother\'s birthday and she was thrilled! The flowers were fresh and lasted for weeks. Will definitely order again.',
      stars: 5
    },
    {
      id: '2',
      name: 'James',
      quote: 'Exceptional service and stunning flowers. The delivery was prompt and the arrangement looked even better than the photos online.',
      stars: 5
    },
    {
      id: '3',
      name: 'Emma',
      quote: 'My subscription has been a joy - fresh seasonal flowers every two weeks that brighten up my home office. The quality is consistently excellent.',
      stars: 5
    },
    {
      id: '4',
      name: 'Michael',
      quote: 'Sent flowers to my wife for our anniversary. The packaging was beautiful and the flowers were arranged perfectly. Great value for money.',
      stars: 4
    }
  ];

  // Render stars based on the rating
  const renderStars = (count: number) => {
    return Array(5).fill(0).map((_, i) => (
      <span key={i} className="text-yellow-400">
        {i < count ? '★' : '☆'}
      </span>
    ));
  };

  return (
    <section className="py-16 bg-gray-50 text-black">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-xl uppercase mb-12">What Our Customers Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 shadow-sm">
              <div className="flex justify-center mb-3">
                {renderStars(testimonial.stars)}
              </div>
              <p className="text-center text-black  -600 mb-4 italic">"{testimonial.quote}"</p>
              <p className="text-center font-medium">{testimonial.name}</p>
            </div>
          ))}
        </div>
        
        {/* <div className="mt-12 text-center">
          <div className="flex items-center justify-center space-x-6">
            <div className="flex items-center">
              <Image 
                src="/images/icons/trustpilot.svg" 
                alt="Trustpilot" 
                width={24} 
                height={24} 
              />
              <span className="ml-2 text-sm">4.9 on Trustpilot</span>
            </div>
            <div className="flex items-center">
              <Image 
                src="/images/icons/google.svg" 
                alt="Google" 
                width={24} 
                height={24} 
              />
              <span className="ml-2 text-sm">4.8 on Google</span>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}