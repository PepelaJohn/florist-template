// app/categories/[slug]/page.tsx
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/ui/ProductCard';
import { Category } from '@/types/category';
import { Product } from '@/types/product';
import { notFound } from 'next/navigation';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

// Mock data (you could move this to a separate file or fetch from an API)
 const categories: Category[] = [
    {
      id: '1',
      name: 'Seasonal',
      slug: 'seasonal',
      image: '/images/7.jpeg',
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
       image: '/images/9.jpeg',
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
       image: '/images/11.png',

      description: 'Beautiful flowers for weddings, corporate events, and special gatherings'
    }
  ];

const allProducts: Product[] = [
  {
    id: '1',
    name: 'Ballet Slipper Italian Ranunculus',
    slug: 'ballet-slipper-ranunculus',
    description: 'Delicate pink ranunculus flowers...',
    price: 3500,
    colors: 0,
    images: ['/images/10.jpeg', '/images/14.jpeg'],
    category: 'seasonal',
    featured: true,
  },
  {
    id: '2',
    name: 'Mademoiselle Hyacinth',
    slug: 'mademoiselle-hyacinth',
    description: 'Fragrant pink hyacinth blooms...',
    price: 2500,
    colors: 4,
    images: ['/images/11.png', '/images/14.jpeg'],
    category: 'seasonal',
    featured: true,
  },
  {
    id: '3',
    name: 'Paperwhite Narcissus',
    slug: 'paperwhite-narcissus',
    description: 'Elegant white narcissus flowers...',
    price: 2850,
    colors: 3,
    images: ['/images/12.jpeg', '/images/14.jpeg'],
    category: 'seasonal',
    featured: true,
  },
  {
    id: '4',
    name: 'Petal White Anemone',
    slug: 'petal-white-anemone',
    description: 'Striking white anemone flowers...',
    price: 3000,
    colors: 0,
    images: ['/images/3.png', '/images/14.jpeg'],
    category: 'seasonal',
    featured: true,
  },
  {
    id: '5',
    name: 'Perfect Peonies',
    slug: 'perfect-peonies',
    description: 'Lush, full peonies in a soft pink shade...',
    price: 4500,
    colors: 3,
    images: ['/images/15.jpeg', '/images/14.jpeg'],
    category: 'luxury',
  },
  {
    id: '6',
    name: 'Sweet Avalanche Roses',
    slug: 'sweet-avalanche-roses',
    description: 'Premium light pink roses...',
    price: 4000,
    colors: 5,
    images: ['/images/7.jpeg', '/images/14.jpeg'],
    category: 'roses',
    new: true,
  },
  {
    id: '7',
    name: 'Sunshine Tulips',
    slug: 'sunshine-tulips',
    description: "Bright yellow tulips...",
    price: 2200,
    colors: 6,
    images: ['/images/8.jpeg', '/images/13.png'],
    category: 'seasonal',
    new: true,
  },
  {
    id: '8',
    name: 'Royal Purple Lilacs',
    slug: 'royal-purple-lilacs',
    description: 'Fragrant purple lilac blooms...',
    price: 3200,
    colors: 2,
    images: ['/images/2.jpeg', '/images/3.png'],
    category: 'seasonal',
  },
  {
    id: '9',
    name: 'Royal Purple Lilacs',
    slug: 'royal-purple-lilacs',
    description: 'Fragrant purple lilac blooms...',
    price: 3200,
    colors: 2,
    images: ['/images/2.jpeg', '/images/3.png'],
    category: 'vases',
  },
];

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = categories.find((c) => c.slug === params.slug);

  if (!category) {
    notFound();
  }

  let products: Product[];

  if (params.slug === 'same-day') {
    products = allProducts.slice(0, 6);
  } else if (['occasions', 'events'].includes(params.slug)) {
    products = allProducts.filter((_, index) => index % 2 === 0);
  } else {
    products = allProducts.filter((p) => p.category === params.slug);
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-medium text-center mb-2">{category.name}</h1>

      {category.description && (
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">{category.description}</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
    </Layout>
  );
}
