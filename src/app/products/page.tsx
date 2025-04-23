import ProductsPage from './ProductsPage';
import { Product } from '@/types/product';
import { Category } from '@/types/category';

export default async function ProductsPageWrapper() {
  // Static mock data - normally you'd fetch from API here
  const products: Product[] = [
    {
      id: '1',
      name: 'Ballet Slipper Italian Ranunculus',
      slug: 'ballet-slipper-ranunculus',
      description: 'Delicate pink ranunculus flowers with multiple layers of petals. These exquisite blooms are known for their paper-like texture and romantic quality.',
      price: 3500,
      colors: 0,
     images: ['/images/10.jpeg', '/images/14.jpeg'],
      category: 'seasonal',
      featured: true
    },
    {
      id: '2',
      name: 'Mademoiselle Hyacinth',
      slug: 'mademoiselle-hyacinth',
      description: 'Fragrant pink hyacinth blooms with a sweet aroma that fills the room. These spring favorites are perfect for adding a pop of color and scent to your home.',
      price: 2500,
      colors: 4,
      images: ['/images/11.png', '/images/14.jpeg'],
      category: 'seasonal',
      featured: true
    },
    {
      id: '3',
      name: 'Paperwhite Narcissus',
      slug: 'paperwhite-narcissus',
      description: 'Elegant white narcissus flowers with a delicate fragrance. These classic beauties symbolize rebirth and new beginnings, making them perfect for celebratory occasions.',
      price: 2850,
      colors: 3,
      images: ['/images/12.jpeg', '/images/14.jpeg'],
      category: 'seasonal',
      featured: true
    },
    {
      id: '4',
      name: 'Petal White Anemone',
      slug: 'petal-white-anemone',
      description: 'Striking white anemone flowers with dark centers that create a bold contrast. These elegant blooms add a touch of sophistication to any arrangement.',
      price: 3000,
      colors: 0,
      images: ['/images/3.png', '/images/14.jpeg'],
      category: 'seasonal',
      featured: true
    },
    {
      id: '5',
      name: 'Perfect Peonies',
      slug: 'perfect-peonies',
      description: 'Lush, full peonies in a soft pink shade. Known for their large, romantic blooms and subtle fragrance, these flowers are a favorite for special occasions.',
      price: 4500,
      colors: 3,
      images: ['/images/15.jpeg', '/images/14.jpeg'],
      category: 'luxury'
    },
    {
      id: '6',
      name: 'Sweet Avalanche Roses',
      slug: 'sweet-avalanche-roses',
      description: 'Premium light pink roses with a classic shape and velvety petals. These elegant roses have excellent vase life and open into beautiful, full blooms.',
      price: 4000,
      colors: 5,
      images: ['/images/7.jpeg', '/images/14.jpeg'],
      category: 'roses',
      new: true
    },
    {
      id: '7',
      name: 'Sunshine Tulips',
      slug: 'sunshine-tulips',
      description: "Bright yellow tulips that bring a cheerful splash of color. These spring favorites symbolize happiness and are perfect for brightening someone's day.",
      price: 2200,
      colors: 6,
      images: ['/images/8.jpeg', '/images/13.png'],
      category: 'seasonal',
      new: true
    },
    {
      id: '8',
      name: 'Royal Purple Lilacs',
      slug: 'royal-purple-lilacs',
      description: 'Fragrant purple lilac blooms that create a nostalgic atmosphere. Known for their intoxicating scent and delicate clustered florets.',
      price: 3200,
      colors: 2,
      images: ['/images/2.jpeg', '/images/3.png'],
      category: 'seasonal'
    }
  ];

  const categories: Category[] = [
    {
      id: '1',
      name: 'Seasonal',
      slug: 'seasonal',
      image: '/images/2.jpeg',
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
      image: '/images/2.jpeg',
      description: 'Premium flowers for special occasions'
    }
  ];


  return <ProductsPage products={products} categories={categories} />;
}
