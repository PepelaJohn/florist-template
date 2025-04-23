'use client'
// src/components/layout/Header.tsx
import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import CartDrawer from '../cart/CartDrawer';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const { itemCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.4,
        when: "beforeChildren",
        staggerChildren: 0.1,
        staggerDirection: 1
      }
    }
  };

  const itemVariants = {
    closed: { 
      opacity: 0, 
      y: -10,
      transition: { duration: 0.2 }
    },
    open: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <header className="sticky text-black top-0 left-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center md:justify-end">
          
          {/* Mobile menu button */}
          <motion.button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </motion.button>
          
          {/* Logo for mobile */}
          <div className="md:hidden relative flex-1 flex items-center justify-center">
            <Link href="/" className="font-semibold text-lg uppercase">{process.env.NEXT_PUBLIC_NAME}</Link>
          </div>
          
          {/* Cart and account icons */}
          <div className="flex items-center space-x-4">
            <motion.button 
              className="relative"
              onClick={() => setIsCartOpen(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <AnimatePresence>
                {itemCount > 0 && (
                  <motion.span 
                    className="absolute -top-2 -right-2 bg-black text-white rounded-full text-xs w-5 h-5 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    {itemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </motion.button>
          </div>
        </div>
        
        {/* Desktop navigation */}
        <div className="hidden md:block">
          <div className="flex justify-center py-4">
            <Link href="/" className="font-semibold text-2xl uppercase">{process.env.NEXT_PUBLIC_NAME}</Link>
          </div>
          <nav className="flex justify-center text-black space-x-8 pb-2">
            <Link href="/products" className="uppercase text-sm font-medium hover:text-black-950">Flowers</Link>
            <Link href="/categories/same-day" className="uppercase text-sm font-medium hover:text-black-950">Express Delivery</Link>
            <Link href="/categories/occasions" className="uppercase text-sm font-medium hover:text-black-950">Occasions</Link>
            <Link href="/categories/vases" className="uppercase text-sm font-medium hover:text-black-950">Vases</Link>
            <Link href="/categories/events" className="uppercase text-sm font-medium hover:text-black-950">Events</Link>
            <Link href="/categories" className="uppercase text-sm font-medium hover:text-black-950">Categories</Link>
          </nav>
        </div>
        
        {/* Mobile menu with animations */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="md:hidden bg-white absolute left-0 right-0 p-4 shadow-md overflow-hidden"
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
            >
              <nav className="flex flex-col space-y-4">
                <motion.div variants={itemVariants}>
                  <Link href="/products" className="uppercase text-sm font-medium block py-2" onClick={() => setIsMenuOpen(false)}>
                    Flowers
                  </Link>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <Link href="/categories/same-day" className="uppercase text-sm font-medium block py-2" onClick={() => setIsMenuOpen(false)}>
                    Express Delivery
                  </Link>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <Link href="/categories/vases" className="uppercase text-sm font-medium block py-2" onClick={() => setIsMenuOpen(false)}>
                    Vases
                  </Link>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <Link href="/categories/events" className="uppercase text-sm font-medium block py-2" onClick={() => setIsMenuOpen(false)}>
                    Events
                  </Link>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <Link href="/categories" className="uppercase text-sm font-medium block py-2" onClick={() => setIsMenuOpen(false)}>
                    Categories
                  </Link>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Cart drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
}