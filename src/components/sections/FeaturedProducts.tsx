// src/components/sections/FeaturedProducts.tsx
import { Product } from '../../types/product';
import ProductCard from '../ui/ProductCard';
import Button from '../ui/Button';
import Link from 'next/link';

interface FeaturedProductsProps {
  products: Product[];
  title?: string;
}

export default function FeaturedProducts({ products, title = "FLOWERS PICKS: OUR TOP RECOMMENDATIONS OF THE WEEK" }: FeaturedProductsProps) {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-xl uppercase mb-8">{title}</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Link href="/products" passHref>
            <Button className='text-white hover:text-black' variant="outline">View All Flowers</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}