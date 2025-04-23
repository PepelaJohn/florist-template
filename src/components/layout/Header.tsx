'use client'
// src/components/layout/Header.tsx
import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import CartDrawer from '../cart/CartDrawer';

export default function Header() {
  const { itemCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky text-black top-0 left-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-end">
          
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          {/* Logo for mobile */}
          <div className="md:hidden relative">
            <Link href="/" className="font-semibold text-xl uppercase">{process.env.NEXT_PUBLIC_NAME}</Link>
          </div>
          
          {/* Cart and account icons */}
          <div className="flex items-center space-x-4">
            <button 
              className="relative"
              onClick={() => setIsCartOpen(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Desktop navigation */}
        <div className="hidden md:block">
          <div className="flex justify-center  py-4">
            
            <Link href="/" className="font-semibold text-2xl uppercase">{process.env.NEXT_PUBLIC_NAME}</Link>
            
          </div>
          <nav className="flex justify-center text-black  -900 space-x-8 pb-2">
            <Link href="/products" className="uppercase text-sm font-medium hover:text-black  -950">Flowers</Link>
            <Link href="/categories/same-day" className="uppercase text-sm font-medium hover:text-black  -950">Express Delivery</Link>
            <Link href="/categories/occasions" className="uppercase text-sm font-medium hover:text-black  -950">Occasions</Link>
            <Link href="/categories/vases" className="uppercase text-sm font-medium hover:text-black  -950">Vases</Link>
            <Link href="/categories/events" className="uppercase text-sm font-medium hover:text-black  -950">Events</Link>
           
          </nav>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white absolute left-0 right-0 p-4 shadow-md">
            <nav className="flex flex-col space-y-4">
              <Link href="/products" className="uppercase text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
                Flowers
              </Link>
              <Link href="/categories/same-day" className="uppercase text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
                Express Delivery
              </Link>
              <Link href="/subscriptions" className="uppercase text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
                Subscriptions
              </Link>
              <Link href="/categories/occasions" className="uppercase text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
                Occasions
              </Link>
              <Link href="/categories/vases" className="uppercase text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
                Vases
              </Link>
              <Link href="/categories/events" className="uppercase text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
                Events
              </Link>
              <Link href="/services" className="uppercase text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
                Bespoke Services
              </Link>
            </nav>
          </div>
        )}
      </div>
      
      {/* Cart drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
}
