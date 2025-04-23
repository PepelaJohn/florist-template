'use client'
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '../../types/product';
import Button from './Button';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1
    });
  };

  return (
    <div className="group relative flex flex-col">
      <div className="aspect-square overflow-hidden rounded-sm bg-gray-100">
        <Link href={`/products/${product.slug}`}>
          <div className="h-full w-full relative">
            <Image 
              src={product.images[0]} 
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>
      </div>
      
      {product.colors > 0 && (
        <div className="absolute top-2 left-2 bg-red-200 text-black text-xs px-1.5 py-0.5">
          {product.colors} COLOURS
        </div>
      )}
      
      {product.new && (
        <div className="absolute top-2 right-2 bg-black text-white text-xs px-1.5 py-0.5">
          NEW
        </div>
      )}
      
      <div className="mt-2 flex flex-col">
        <Link href={`/products/${product.slug}`} className="uppercase text-sm font-medium">
          {product.name}
        </Link>
        <span className="text-sm">FROM  KES {product.price.toFixed(2)}</span>
      </div>
      
      <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Button 
          variant="primary" 
          size="sm" 
          fullWidth
          onClick={handleAddToCart}
          className='!border border-gray-300'
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}