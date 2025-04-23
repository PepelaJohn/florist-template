import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import { Category } from '@/types/category';

export default async function CategoriesPage() {
  // In a real app, you'd fetch this from your backend or CMS
  const categories: Category[] = [
    {
      id: '1',
      name: 'Seasonal',
      slug: 'seasonal',
      image: '/images/10.jpeg',
      description: 'Our selection of the finest seasonal blooms'
    },
    {
      id: '2',
      name: 'Roses',
      slug: 'roses',
      image: '/images/2.jpeg',
      description: 'Classic and timeless rose arrangements'
    },
    {
      id: '3',
      name: 'Luxury',
      slug: 'luxury',
      image: '/images/6.jpeg',
      description: 'Premium flowers for special occasions'
    },
    {
      id: '4',
      name: 'Same Day Delivery',
      slug: 'same-day',
      image: '/images/1.jpeg',
      description: 'Flowers delivered today for those last-minute moments'
    },
    {
      id: '5',
      name: 'Occasions',
      slug: 'occasions',
       image: '/images/10.jpeg',
      description: 'Perfect arrangements for birthdays, anniversaries, and more'
    },
    {
      id: '6',
      name: 'Events',
      slug: 'events',
       image: '/images/10.jpeg',

      description: 'Beautiful flowers for weddings, corporate events, and special gatherings'
    },
    
    {
      id: '7',
      name: 'Vases',
      slug: 'vases',
       image: '/images/11.jpeg',

      description: 'Beautiful flowers for weddings, corporate events, and special gatherings'
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-medium text-center mb-8">Shop by Category</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map(category => (
            <Link 
              key={category.id} 
              href={`/categories/${category.slug}`}
              className="group"
            >
              <div className="aspect-square overflow-hidden bg-gray-100 relative">
                <Image 
                  src={category.image} 
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                  <h2 className="text-white text-2xl font-light uppercase tracking-wider">{category.name}</h2>
                </div>
              </div>
              
              {category.description && (
                <p className="text-center text-gray-600 mt-2">{category.description}</p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
