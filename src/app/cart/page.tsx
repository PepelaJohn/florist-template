'use client'
import { useRouter } from 'next/navigation';
import Layout from '../../components/layout/Layout';
import { useCart } from '../../context/CartContext';
import Button from '../../components/ui/Button';
import Image from 'next/image';
import Link from 'next/link';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const router = useRouter();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-medium text-center mb-8">Your Cart</h1>
        
        {cart.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-xl mb-4">Your cart is empty</h2>
            <p className="text-black  -500 mb-6">Add some beautiful flowers to your cart first!</p>
            <Button onClick={() => router.push('/products')}>Continue Shopping</Button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart items */}
            <div className="flex-1">
              <div className="border-b border-gray-200 pb-2 mb-4 hidden md:grid md:grid-cols-12 gap-4 text-sm font-medium text-black  -500">
                <div className="md:col-span-6">Product</div>
                <div className="md:col-span-2 text-center">Price</div>
                <div className="md:col-span-2 text-center">Quantity</div>
                <div className="md:col-span-2 text-right">Total</div>
              </div>
              
              <div className="space-y-6">
                {cart.map((item) => (
                  <div key={item.productId} className="border-b border-gray-200 pb-6 md:grid md:grid-cols-12 gap-4 items-center">
                    <div className="md:col-span-6 flex items-center">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-sm bg-gray-100">
                        <Image 
                          src={item.image} 
                          alt={item.name}
                          width={96}
                          height={96}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-sm font-medium">{item.name}</h3>
                        <button 
                          className="text-sm text-black  -500 hover:text-black  -700 mt-1"
                          onClick={() => removeFromCart(item.productId)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    
                    <div className="md:col-span-2 text-center mt-4 md:mt-0">
                      <span className="md:hidden text-sm text-black  -500 mr-2">Price:</span>
                      <span> KES {item.price.toFixed(2)}</span>
                    </div>
                    
                    <div className="md:col-span-2 flex justify-center mt-4 md:mt-0">
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
                    </div>
                    
                    <div className="md:col-span-2 text-right mt-4 md:mt-0">
                      <span className="md:hidden text-sm text-black  -500 mr-2">Total:</span>
                      <span className="font-medium"> KES {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Cart summary */}
            <div className="lg:w-80">
              <div className="bg-gray-50 p-6 rounded-sm">
                <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <p className="text-black  -500">Subtotal</p>
                    <p> KES {cartTotal.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-black  -500">Shipping</p>
                    <p>Calculated at checkout</p>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between text-lg font-medium">
                    <p>Total</p>
                    <p> KES {cartTotal.toFixed(2)}</p>
                  </div>
                </div>
                
                <Link href="/checkout" passHref>
                  <Button variant="primary" fullWidth>
                    Proceed to Checkout
                  </Button>
                </Link>
                
                <div className="mt-4">
                  <Button variant="outline" fullWidth onClick={() => router.push('/products')}>
                    Continue Shopping
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}