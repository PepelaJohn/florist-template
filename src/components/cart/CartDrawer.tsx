// src/components/cart/CartDrawer.tsx
import { useCart } from '../../context/CartContext';
import Button from '../ui/Button';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  
  useEffect(() => {
    if (isOpen) {
      const originalScroll = window.onscroll;
      document.body.style.overflow = 'hidden';
      
      window.onscroll = () => {};
      return () => {
        window.onscroll = originalScroll; // Restore original scroll handler
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);
  
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <motion.div 
            className="absolute inset-0 bg-black/70" 
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          
          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <motion.div 
              className="w-screen max-w-md"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ 
                type: 'spring', 
                stiffness: 300, 
                damping: 30
              }}
            >
              <div className="h-full flex flex-col bg-white shadow-xl">
                <motion.div 
                  className="flex items-center justify-between px-4 py-6 border-b"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  <h2 className="text-lg font-medium">Your Cart</h2>
                  <motion.button 
                    onClick={onClose}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </motion.div>
                
                <div className="flex-1 overflow-y-auto px-4 py-6">
                  {cart.length === 0 ? (
                    <motion.div 
                      className="text-center py-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                    >
                      <p className="text-black mb-4">Your cart is empty</p>
                      <Button variant="outline" onClick={onClose}>Continue Shopping</Button>
                    </motion.div>
                  ) : (
                    <ul className="divide-y divide-gray-200">
                      {cart.map((item, index) => (
                        <motion.li 
                          key={item.productId} 
                          className="py-6 flex"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 + index * 0.1, duration: 0.3 }}
                        >
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-sm">
                            <Image 
                              src={item.image} 
                              alt={item.name}
                              width={96}
                              height={96}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          
                          <div className="ml-4 flex flex-1 flex-col">
                            <div className="flex justify-between">
                              <h3 className="text-sm font-medium">{item.name}</h3>
                              <p className="text-sm font-medium">KES {(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                            
                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center border border-gray-200">
                                <motion.button 
                                  className="px-2 py-1"
                                  onClick={() => item.quantity > 1 && updateQuantity(item.productId, item.quantity - 1)}
                                  whileHover={{ backgroundColor: "#f3f4f6" }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  -
                                </motion.button>
                                <span className="px-4">{item.quantity}</span>
                                <motion.button 
                                  className="px-2 py-1"
                                  onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                  whileHover={{ backgroundColor: "#f3f4f6" }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  +
                                </motion.button>
                              </div>
                              
                              <motion.button 
                                className="text-sm text-black hover:text-black"
                                onClick={() => removeFromCart(item.productId)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                Remove
                              </motion.button>
                            </div>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </div>
                
                {cart.length > 0 && (
                  <motion.div 
                    className="border-t border-gray-200 px-4 py-6 sm:px-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                  >
                    <div className="flex justify-between text-base font-medium text-black mb-4">
                      <p>Subtotal</p>
                      <p>KES {cartTotal.toFixed(2)}</p>
                    </div>
                    <p className="text-sm text-black mb-4">
                      Shipping and taxes calculated at checkout.
                    </p>
                    <div className="space-y-2">
                      <Link href="/checkout" passHref>
                        <Button variant="primary" fullWidth onClick={onClose}>
                          Checkout
                        </Button>
                      </Link>
                      <Button variant="outline" fullWidth onClick={onClose}>
                        Continue Shopping
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}