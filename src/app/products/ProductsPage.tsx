'use client';

import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/ui/ProductCard';
import { Product } from '@/types/product';
import { Category } from '@/types/category';

interface ProductsPageProps {
  products: Product[];
  categories: Category[];
}

export default function ProductsPage({ products, categories }: ProductsPageProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredProducts = activeFilter === 'all'
    ? products
    : products.filter(product => product.category === activeFilter);

  return (
    <Layout>
      <div className="container mx-auto text-balck px-4 py-8">
        <h1 className="text-2xl font-medium text-center mb-8">All Flowers</h1>

        {/* Filter by category */}
        <div className="flex flex-wrap justify-center mb-8 space-x-2">
          <button
            className={`px-4 py-2 text-sm ${activeFilter === 'all' ? 'bg-black text-white' : 'bg-gray-100 text-black'}`}
            onClick={() => setActiveFilter('all')}
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category.id}
              className={`px-4 py-2 text-sm ${activeFilter === category.slug ? 'bg-black text-white' : 'bg-gray-100 text-black'}`}
              onClick={() => setActiveFilter(category.slug)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
