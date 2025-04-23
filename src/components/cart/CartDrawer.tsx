// src/components/cart/CartDrawer.tsx
import { useCart } from '../../context/CartContext';
import Button from '../ui/Button';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  useEffect(() => {
    if (isOpen) {
      const originalScroll = window.onscroll;

      window.onscroll = () => {};
      return () => {
        window.onscroll = originalScroll; // Restore original scroll handler
      };
    }
  }, [isOpen]);
  
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/70" onClick={onClose}></div>
      
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md transform transition ease-in-out duration-500">
          <div className="h-full flex flex-col bg-white shadow-xl">
            <div className="flex items-center justify-between px-4 py-6 border-b">
              <h2 className="text-lg font-medium">Your Cart</h2>
              <button onClick={onClose}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto px-4 py-6">
              {cart.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-black  -500 mb-4">Your cart is empty</p>
                  <Button variant="outline" onClick={onClose}>Continue Shopping</Button>
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {cart.map((item) => (
                    <li key={item.productId} className="py-6 flex">
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
                          <p className="text-sm font-medium"> KES {(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center border border-gray-200">
                            <button 
                              className="px-2 py-1"
                              onClick={() => item.quantity > 1 && updateQuantity(item.productId, item.quantity - 1)}
                            >
                              -
                            </button>
                            <span className="px-4">{item.quantity}</span>
                            <button 
                              className="px-2 py-1"
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                          
                          <button 
                            className="text-sm text-black  -500 hover:text-black  -700"
                            onClick={() => removeFromCart(item.productId)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            {cart.length > 0 && (
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-black  -900 mb-4">
                  <p>Subtotal</p>
                  <p> KES {cartTotal.toFixed(2)}</p>
                </div>
                <p className="text-sm text-black  -500 mb-4">
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
