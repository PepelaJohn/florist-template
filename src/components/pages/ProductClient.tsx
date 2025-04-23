'use client';

import { useState } from 'react';
import Image from 'next/image';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';
import FeaturedProducts from '@/components/sections/FeaturedProducts';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';

interface ProductClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductClient({ product, relatedProducts }: ProductClientProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(0);

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[selectedColor] || product.images[0],
      quantity
    });
  };

  const colorOptions = [
    { id: 0, name: 'Original', color: 'bg-pink-200' },
    { id: 1, name: 'White', color: 'bg-white border border-gray-300' },
    { id: 2, name: 'Yellow', color: 'bg-yellow-200' },
    { id: 3, name: 'Red', color: 'bg-red-400' },
    { id: 4, name: 'Purple', color: 'bg-purple-300' }
  ].slice(0, product.colors + 1);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product images */}
          <div>
            <div className="aspect-square bg-gray-100 relative mb-4">
              <Image 
                src={product.images[selectedColor] || product.images[0]} 
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button 
                    key={index}
                    className={`aspect-square bg-gray-100 text-black relative ${index === selectedColor ? 'ring-2 ring-black' : ''}`}
                    onClick={() => setSelectedColor(index)}
                  >
                    <Image 
                      src={image} 
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div>
            <h1 className="text-2xl font-medium mb-2">{product.name}</h1>
            <p className="text-lg mb-4"> KES {product.price.toFixed(2)}</p>

            <p className="text-gray-700 mb-6">{product.description}</p>

            {product.colors > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Color</h3>
                <div className="flex space-x-2">
                  {colorOptions.map(option => (
                    <button
                      key={option.id}
                      className={`h-8 w-8 rounded-full ${option.color} ${selectedColor === option.id ? 'ring-2 ring-offset-2 ring-black' : ''}`}
                      onClick={() => setSelectedColor(option.id)}
                      aria-label={option.name}
                    ></button>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Quantity</h3>
              <div className="flex items-center border border-gray-300 w-32">
                <button 
                  className="px-3 py-1"
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                >
                  -
                </button>
                <span className="flex-1 text-center">{quantity}</span>
                <button 
                  className="px-3 py-1"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <Button 
              variant="primary" 
              size="lg" 
              fullWidth 
              className="mb-4"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>

            <div className="border-t border-gray-200 pt-6 space-y-4 text-sm text-gray-500">
              <div>
                <h3 className="font-medium text-gray-900">Delivery</h3>
                <p>Free standard delivery on all orders over  KES 350.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Returns</h3>
                <p>Not completely satisfied? We offer a 7-day freshness guarantee.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related products */}
        <FeaturedProducts products={relatedProducts} title="YOU MAY ALSO LIKE" />
      </div>
    </Layout>
  );
}
