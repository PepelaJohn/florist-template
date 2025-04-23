// src/components/sections/Categories.tsx
import { Category } from '../../types/category';
import Image from 'next/image';
import Link from 'next/link';

interface CategoriesProps {
  categories: Category[];
  title?: string;
}

export default function Categories({ categories, title = "SHOP TRENDING CATEGORIES" }: CategoriesProps) {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-xl uppercase mb-8">{title}</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map(category => (
            <Link 
              key={category.id} 
              href={`/categories/${category.slug}`}
              className="group"
            >
              <div className="aspect-square overflow-hidden bg-white">
                <div className="h-full w-full relative">
                  <Image 
                    src={category.image} 
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              <h3 className="text-center uppercase text-sm font-medium mt-2">{category.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
