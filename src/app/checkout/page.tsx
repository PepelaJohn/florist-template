'use client'
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../../components/layout/Layout';
import { useCart } from '../../context/CartContext';
import Button from '../../components/ui/Button';
import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const [activeStep, setActiveStep] = useState<'details' | 'delivery' | 'payment'>('details');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    postalCode: '',
    country: 'United Kingdom',
    deliveryDate: '',
    deliveryNotes: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Process payment and order here
    // For demo, we'll just simulate a successful order
    clearCart();
    const orderId = 'ORD' + Math.floor(Math.random() * 1000000);
    router.push(`/order-confirmation?orderId=${orderId}`);
  };

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-medium mb-4">Your cart is empty</h1>
          <p className="mb-6">Add some beautiful flowers to your cart first!</p>
          <Button onClick={() => router.push('/products')}>Continue Shopping</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-medium text-center mb-8">Checkout</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main checkout form */}
          <div className="flex-1">
            <div className="mb-8">
              <div className="flex justify-between mb-4">
                <h2 className="text-xl font-medium">Your Information</h2>
                {activeStep !== 'details' && (
                  <button 
                    className="text-sm text-black  -500"
                    onClick={() => setActiveStep('details')}
                  >
                    Edit
                  </button>
                )}
              </div>
              
              {activeStep === 'details' ? (
                <form>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-black  -700 mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-sm"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-black  -700 mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-sm"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-black  -700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-sm"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-black  -700 mb-1">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-sm"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h3 className="text-lg font-medium mb-2">Shipping Address</h3>
                    
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label htmlFor="address1" className="block text-sm font-medium text-black  -700 mb-1">
                          Address Line 1 *
                        </label>
                        <input
                          type="text"
                          id="address1"
                          name="address1"
                          value={formData.address1}
                          onChange={handleInputChange}
                          required
                          className="w-full p-2 border border-gray-300 rounded-sm"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="address2" className="block text-sm font-medium text-black  -700 mb-1">
                          Address Line 2
                        </label>
                        <input
                          type="text"
                          id="address2"
                          name="address2"
                          value={formData.address2}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-sm"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="city" className="block text-sm font-medium text-black  -700 mb-1">
                            City *
                          </label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-sm"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="postalCode" className="block text-sm font-medium text-black  -700 mb-1">
                            Postal Code *
                          </label>
                          <input
                            type="text"
                            id="postalCode"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleInputChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-sm"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="country" className="block text-sm font-medium text-black  -700 mb-1">
                          Country *
                        </label>
                        <select
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          required
                          className="w-full p-2 border border-gray-300 rounded-sm"
                        >
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="United States">United States</option>
                          <option value="Canada">Canada</option>
                          <option value="France">France</option>
                          <option value="Germany">Germany</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Button 
                      variant="primary" 
                      fullWidth
                      onClick={() => setActiveStep('delivery')}
                    >
                      Continue to Delivery
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="bg-gray-50 p-4 rounded-sm">
                  <p>{formData.firstName} {formData.lastName}</p>
                  <p>{formData.email}</p>
                  <p>{formData.phone}</p>
                  <p>{formData.address1}</p>
                  {formData.address2 && <p>{formData.address2}</p>}
                  <p>{formData.city}, {formData.postalCode}</p>
                  <p>{formData.country}</p>
                </div>
              )}
            </div>
            
            <div className="mb-8">
              <div className="flex justify-between mb-4">
                <h2 className="text-xl font-medium">Delivery Options</h2>
                {activeStep !== 'delivery' && activeStep === 'payment' && (
                  <button 
                    className="text-sm text-black  -500"
                    onClick={() => setActiveStep('delivery')}
                  >
                    Edit
                  </button>
                )}
              </div>
              
              {activeStep === 'delivery' ? (
                <form>
                  <div className="space-y-4">
                    <div className="border border-gray-200 p-4 rounded-sm flex items-start">
                      <input
                        type="radio"
                        id="delivery-standard"
                        name="delivery"
                        className="mt-1"
                        defaultChecked
                      />
                      <div className="ml-3">
                        <label htmlFor="delivery-standard" className="block text-sm font-medium">
                          Standard Delivery (Free)
                        </label>
                        <p className="text-sm text-black  -500">Delivered within 2-3 working days</p>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 p-4 rounded-sm flex items-start">
                      <input
                        type="radio"
                        id="delivery-next-day"
                        name="delivery"
                        className="mt-1"
                      />
                      <div className="ml-3">
                        <label htmlFor="delivery-next-day" className="block text-sm font-medium">
                          Next Day Delivery (£5.95)
                        </label>
                        <p className="text-sm text-black  -500">Order before 5pm for next working day delivery</p>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 p-4 rounded-sm flex items-start">
                      <input
                        type="radio"
                        id="delivery-same-day"
                        name="delivery"
                        className="mt-1"
                      />
                      <div className="ml-3">
                        <label htmlFor="delivery-same-day" className="block text-sm font-medium">
                          Same Day Delivery (£9.95)
                        </label>
                        <p className="text-sm text-black  -500">Available for select London postcodes. Order before 2pm.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <label htmlFor="deliveryDate" className="block text-sm font-medium text-black  -700 mb-1">
                      Preferred Delivery Date
                    </label>
                    <input
                      type="date"
                      id="deliveryDate"
                      name="deliveryDate"
                      value={formData.deliveryDate}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-sm"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  
                  <div className="mt-4">
                    <label htmlFor="deliveryNotes" className="block text-sm font-medium text-black  -700 mb-1">
                      Delivery Notes (Optional)
                    </label>
                    <textarea
                      id="deliveryNotes"
                      name="deliveryNotes"
                      value={formData.deliveryNotes}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full p-2 border border-gray-300 rounded-sm"
                      placeholder="Any special instructions for delivery"
                    />
                  </div>
                  
                  <div className="mt-6">
                    <Button 
                      variant="primary" 
                      fullWidth
                      onClick={() => setActiveStep('payment')}
                    >
                      Continue to Payment
                    </Button>
                  </div>
                </form>
              ) : (
                activeStep === 'payment' && (
                  <div className="bg-gray-50 p-4 rounded-sm">
                    <p>Standard Delivery (Free)</p>
                    {formData.deliveryDate && <p>Deliver on: {formData.deliveryDate}</p>}
                    {formData.deliveryNotes && <p>Notes: {formData.deliveryNotes}</p>}
                  </div>
                )
              )}
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-medium mb-4">Payment</h2>
              
              {activeStep === 'payment' && (
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="cardName" className="block text-sm font-medium text-black  -700 mb-1">
                        Name on Card *
                      </label>
                      <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-sm"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-black  -700 mb-1">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-sm"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiryDate" className="block text-sm font-medium text-black  -700 mb-1">
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          id="expiryDate"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          required
                          className="w-full p-2 border border-gray-300 rounded-sm"
                          placeholder="MM/YY"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-black  -700 mb-1">
                          CVV *
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          required
                          className="w-full p-2 border border-gray-300 rounded-sm"
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Button 
                      type="submit" 
                      variant="primary" 
                      fullWidth
                    >
                      Complete Order
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
          
          {/* Order summary */}
          <div className="lg:w-96">
            <div className="bg-gray-50 p-6 rounded-sm">
              <h2 className="text-xl font-medium mb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {cart.map((item: { productId: Key | null | undefined; image: string | StaticImport; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; quantity: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; price: number; }) => (
                  <div key={item.productId} className="flex items-start">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-sm bg-gray-100">
                      <Image 
                        src={item.image} 
                        alt={typeof item?.name === 'string' ? item.name : 'Product image'}
                        width={64}
                        height={64}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-sm font-medium">{item.name}</h3>
                      <p className="text-sm text-black  -500">Qty: {item.quantity}</p>
                      <p className="text-sm font-medium">£{(item.price * (typeof item.quantity === 'number' ? item.quantity : 0)).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between">
                  <p className="text-sm text-black  -500">Subtotal</p>
                  <p className="text-sm font-medium">£{cartTotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-black  -500">Shipping</p>
                  <p className="text-sm font-medium">Free</p>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-2">
                  <p className="font-medium">Total</p>
                  <p className="font-medium">£{cartTotal.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}