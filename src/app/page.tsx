// app/page.tsx

import Layout from '../components/layout/Layout';
import Hero from '../components/sections/Hero';
import FeaturedProducts from '../components/sections/FeaturedProducts';
import Categories from '../components/sections/Categories';
import Services from '../components/sections/Services';
import Subscriptions from '../components/sections/Subscriptions';
import Testimonials from '../components/sections/Testimonials';
import { Product } from '../types/product';
import { Category } from '../types/category';

async function getData() {
  const featuredProducts: Product[] = [
    {
      id: '1',
      name: 'Ballet Slipper Italian Ranunculus',
      slug: 'ballet-slipper-ranunculus',
      description: 'Delicate pink ranunculus flowers',
      price: 35.0,
      colors: 0,
      images: ['/images/2.jpeg'],
      category: 'seasonal',
    },
    {
      id: '2',
      name: 'Mademoiselle Hyacinth',
      slug: 'mademoiselle-hyacinth',
      description: 'Fragrant pink hyacinth blooms',
      price: 25.0,
      colors: 4,
      images: ['/images/4.jpeg'],
      category: 'seasonal',
    },
    {
      id: '3',
      name: 'Paperwhite Narcissus',
      slug: 'paperwhite-narcissus',
      description: 'Elegant white narcissus flowers',
      price: 28.5,
      colors: 3,
      images: ['/images/6.jpeg'],
      category: 'seasonal',
    },
    {
      id: '4',
      name: 'Petal White Anemone',
      slug: 'petal-white-anemone',
      description: 'Striking white anemone flowers with dark centers',
      price: 30.0,
      colors: 0,
      images: ['/images/10.jpeg'],
      category: 'seasonal',
    },
  ];

  const categories: Category[] = [
    {
      id: '1',
      name: 'Same Day Delivery',
      slug: 'same-day',
      image: '/images/10.jpeg',
    },
    {
      id: '2',
      name: 'Spring Bouquet',
      slug: 'spring-bouquet',
      image: '/images/2.jpeg',
    },
    {
      id: '3',
      name: 'New In',
      slug: 'new-in',
      image: '/images/6.jpeg',
    },
    {
      id: '4',
      name: "Season's Best",
      slug: 'seasons-best',
      image: '/images/1.jpeg',
    },
  ];

  return { featuredProducts, categories };
}

export default async function Home() {
  const { featuredProducts, categories } = await getData();

  return (
    <Layout>
      <Hero />
      <FeaturedProducts products={featuredProducts} />
      <Categories categories={categories} />
      <Services />
      <Subscriptions />
      <Testimonials />
    </Layout>
  );
}
