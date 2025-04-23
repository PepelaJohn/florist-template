'use client'
import {  useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../../components/layout/Layout';
import { useCart } from '../../context/CartContext';
import Button from '../../components/ui/Button';
import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { motion } from 'framer-motion';
interface CartItem {
  productId: string | number;
  image: string | StaticImport;
  name: string;
  quantity: number;
  price: number;
}
export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const [activeStep, setActiveStep] = useState<'details' | 'delivery' | 'payment'>('details');
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'card' >('mpesa');
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
    cvv: '',
    phoneNumber: ''
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
    // const orderId = 'ORD' + Math.floor(Math.random() * 1000000);
    router.push(`/`);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  useEffect(() => {
    // Scroll to top when step changes
    window.scrollTo(0, 0);
  }, [activeStep]);

  if (cart.length === 0) {
    return (
      <Layout>
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={fadeIn}
          className="container mx-auto px-4 py-16 text-center"
        >
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
            <div className="mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h1 className="text-2xl font-medium mb-3">Your cart is empty</h1>
            <p className="mb-6 text-gray-600">Add some beautiful flowers to your cart first!</p>
            <Button 
              onClick={() => router.push('/products')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
            >
              Continue Shopping
            </Button>
          </div>
        </motion.div>
      </Layout>
    );
  }

  const CheckoutProgress = () => (
    <div className="mb-10">
      <div className="flex items-center justify-center">
        {['details', 'delivery', 'payment'].map((step, index) => (
          <div key={step} className="flex items-center">
            <div 
              className={`flex items-center justify-center w-10 h-10 rounded-full ${
                step === activeStep 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md' 
                  : index < ['details', 'delivery', 'payment'].indexOf(activeStep) 
                    ? 'bg-green-100 text-green-500 border border-green-200' 
                    : 'bg-gray-100 text-gray-400'
              } transition-all duration-300`}
            >
              {index < ['details', 'delivery', 'payment'].indexOf(activeStep) ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                index + 1
              )}
            </div>
            {index < 2 && (
              <div className={`w-20 h-1 ${
                index < ['details', 'delivery', 'payment'].indexOf(activeStep) 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                  : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-2">
        <div className="flex w-full max-w-lg justify-between px-8">
          <span className={`text-sm ${activeStep === 'details' ? 'font-medium text-purple-600' : 'text-gray-600'}`}>Details</span>
          <span className={`text-sm ${activeStep === 'delivery' ? 'font-medium text-purple-600' : 'text-gray-600'}`}>Delivery</span>
          <span className={`text-sm ${activeStep === 'payment' ? 'font-medium text-purple-600' : 'text-gray-600'}`}>Payment</span>
        </div>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 text-black max-w-6xl">
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={fadeIn}
        >
          <h1 className="text-3xl font-medium text-center mb-2">Checkout</h1>
          <p className="text-center text-gray-600 mb-8">Complete your purchase securely</p>
          
          <CheckoutProgress />

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main checkout form */}
            <div className="flex-1 bg-white rounded-lg shadow-md p-6">
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-medium flex items-center">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs mr-2">1</span>
                    Your Information
                  </h2>
                  {activeStep !== 'details' && (
                    <button 
                      className="text-sm text-purple-600 hover:text-purple-800 font-medium transition-colors flex items-center"
                      onClick={() => setActiveStep('details')}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                      Edit
                    </button>
                  )}
                </div>
                
                {activeStep === 'details' ? (
                  <form>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                          First Name *
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none transition-all"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none transition-all"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none transition-all"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none transition-all"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-3 text-gray-800">Shipping Address</h3>
                      
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label htmlFor="address1" className="block text-sm font-medium text-gray-700 mb-1">
                            Address Line 1 *
                          </label>
                          <input
                            type="text"
                            id="address1"
                            name="address1"
                            value={formData.address1}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none transition-all"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="address2" className="block text-sm font-medium text-gray-700 mb-1">
                            Address Line 2
                          </label>
                          <input
                            type="text"
                            id="address2"
                            name="address2"
                            value={formData.address2}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none transition-all"
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                              City *
                            </label>
                            <input
                              type="text"
                              id="city"
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                              required
                              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none transition-all"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                              Postal Code *
                            </label>
                            <input
                              type="text"
                              id="postalCode"
                              name="postalCode"
                              value={formData.postalCode}
                              onChange={handleInputChange}
                              required
                              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none transition-all"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                            Country *
                          </label>
                          <select
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none transition-all appearance-none bg-white"
                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1rem' }}
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
                    
                    <div className="mt-8">
                      <Button 
                        variant="primary" 
                        fullWidth
                        onClick={() => setActiveStep('delivery')}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-md hover:from-purple-600 hover:to-pink-600 transform hover:-translate-y-1 transition-all duration-300"
                      >
                        Continue to Delivery
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="bg-gray-50 p-4 rounded-md border-l-4 border-purple-500">
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="font-medium">{formData.firstName} {formData.lastName}</p>
                        <p className="text-sm text-gray-600">{formData.email}</p>
                        <p className="text-sm text-gray-600">{formData.phone}</p>
                        <p className="text-sm text-gray-600">{formData.address1}</p>
                        {formData.address2 && <p className="text-sm text-gray-600">{formData.address2}</p>}
                        <p className="text-sm text-gray-600">{formData.city}, {formData.postalCode}</p>
                        <p className="text-sm text-gray-600">{formData.country}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-medium flex items-center">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs mr-2">2</span>
                    Delivery Options
                  </h2>
                  {activeStep !== 'delivery' && activeStep === 'payment' && (
                    <button 
                      className="text-sm text-purple-600 hover:text-purple-800 font-medium transition-colors flex items-center"
                      onClick={() => setActiveStep('delivery')}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                      Edit
                    </button>
                  )}
                </div>
                
                {activeStep === 'delivery' ? (
                  <form>
                    <div className="space-y-4">
                      <div className="border border-gray-200 p-4 rounded-md flex items-start hover:border-purple-300 hover:bg-purple-50 transition-all cursor-pointer">
                        <input
                          type="radio"
                          id="delivery-standard"
                          name="delivery"
                          className="mt-1 text-purple-600 focus:ring-purple-500"
                          defaultChecked
                        />
                        <div className="ml-3">
                          <label htmlFor="delivery-standard" className="block text-sm font-medium">
                            Standard Delivery (Free)
                          </label>
                          <p className="text-sm text-gray-600">Delivered within 2-3 working days</p>
                        </div>
                      </div>
                      
                      <div className="border border-gray-200 p-4 rounded-md flex items-start hover:border-purple-300 hover:bg-purple-50 transition-all cursor-pointer">
                        <input
                          type="radio"
                          id="delivery-next-day"
                          name="delivery"
                          className="mt-1 text-purple-600 focus:ring-purple-500"
                        />
                        <div className="ml-3">
                          <label htmlFor="delivery-next-day" className="block text-sm font-medium">
                            Next Day Delivery (KES 5.95)
                          </label>
                          <p className="text-sm text-gray-600">Order before 5pm for next working day delivery</p>
                        </div>
                      </div>
                      
                      <div className="border border-gray-200 p-4 rounded-md flex items-start hover:border-purple-300 hover:bg-purple-50 transition-all cursor-pointer">
                        <input
                          type="radio"
                          id="delivery-same-day"
                          name="delivery"
                          className="mt-1 text-purple-600 focus:ring-purple-500"
                        />
                        <div className="ml-3">
                          <label htmlFor="delivery-same-day" className="block text-sm font-medium">
                            Same Day Delivery (KES 9.95)
                          </label>
                          <p className="text-sm text-gray-600">Available for select London postcodes. Order before 2pm.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <label htmlFor="deliveryDate" className="block text-sm font-medium text-gray-700 mb-1">
                        Preferred Delivery Date
                      </label>
                      <input
                        type="date"
                        id="deliveryDate"
                        name="deliveryDate"
                        value={formData.deliveryDate}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none transition-all"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    
                    <div className="mt-4">
                      <label htmlFor="deliveryNotes" className="block text-sm font-medium text-gray-700 mb-1">
                        Delivery Notes (Optional)
                      </label>
                      <textarea
                        id="deliveryNotes"
                        name="deliveryNotes"
                        value={formData.deliveryNotes}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none transition-all"
                        placeholder="Any special instructions for delivery"
                      />
                    </div>
                    
                    <div className="mt-8">
                      <Button 
                        variant="primary" 
                        fullWidth
                        onClick={() => setActiveStep('payment')}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-md hover:from-purple-600 hover:to-pink-600 transform hover:-translate-y-1 transition-all duration-300"
                      >
                        Continue to Payment
                      </Button>
                    </div>
                  </form>
                ) : (
                  activeStep === 'payment' && (
                    <div className="bg-gray-50 p-4 rounded-md border-l-4 border-purple-500">
                      <div className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                          <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1h5a1 1 0 00.95-.68l3-8.5A1 1 0 0020 4H3zm14.5 8H15V8h4.5l-2 4z" />
                        </svg>
                        <div>
                          <p className="font-medium">Standard Delivery (Free)</p>
                          {formData.deliveryDate && <p className="text-sm text-gray-600">Delivery on: {formData.deliveryDate}</p>}
                          {formData.deliveryNotes && <p className="text-sm text-gray-600">Notes: {formData.deliveryNotes}</p>}
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
              
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-medium flex items-center">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs mr-2">3</span>
                    Payment
                  </h2>
                </div>
                
                {activeStep === 'payment' && (
  <form onSubmit={handleSubmit}>
    <div className="bg-gray-50 p-4 rounded-md mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">Payment Methods</h3>
        <div className="flex space-x-2">
          <svg className="h-8 w-auto" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="24" rx="4" fill="#1434CB"/>
            <path d="M15.2397 16.3413H12.623L10.1123 9.1244C10.0249 8.87261 9.86519 8.65187 9.64824 8.52222C9.02274 8.13226 8.31542 7.83282 7.5249 7.65869V7.30775H11.8325C12.3711 7.30775 12.7267 7.74219 12.8103 8.19471L13.984 13.2823L16.153 7.30775H18.6814L15.2397 16.3413Z" fill="white"/>
            <path d="M19.2202 16.3413H16.7726L18.7628 7.30775H21.2104L19.2202 16.3413Z" fill="white"/>
            <path d="M26.0933 7.57874C25.5547 7.57874 25.0347 7.74219 24.6792 8.02356C24.0723 8.45799 23.6359 9.16712 23.6359 10.0437C23.6359 11.2766 24.5103 11.982 25.638 12.3332C26.3453 12.5692 26.6822 12.8119 26.6822 13.1801C26.6822 13.7067 26.1436 13.9767 25.4363 13.9767C24.6384 13.9767 23.9496 13.7418 23.3427 13.3535L22.844 15.3655C23.451 15.7537 24.3254 15.9865 25.2183 15.9865C26.9253 15.9865 29.1482 15.223 29.1482 12.9294C29.1482 11.6965 28.2739 10.9169 27.0841 10.5287C26.3768 10.2926 26.0399 10.05 26.0399 9.68137C26.0399 9.19089 26.5784 8.92052 27.2643 8.92052C27.9717 8.92052 28.6374 9.1244 29.1345 9.33441L29.6331 7.3576C29.0679 7.14757 28.3197 7.02865 27.5985 7.02865C27.4466 7.0112 26.6822 7.0112 26.0933 7.57874Z" fill="white"/>
            <path d="M33.1661 7.30775L31.7932 13.2297L31.5609 14.5333H29.1272L31.6683 7.30775H33.1661Z" fill="white"/>
          </svg>
          <svg className="h-8 w-auto" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="24" rx="4" fill="#FF5F00"/>
            <path d="M14.5 16H25.5V8H14.5V16Z" fill="#FF5F00"/>
            <path d="M15.2001 12C15.2001 10.3 16.0001 8.8 17.2001 7.8C16.3001 7.1 15.2001 6.8 14.1001 6.8C10.8001 6.8 8.2001 9.2 8.2001 12.1C8.2001 15 10.8001 17.4 14.1001 17.4C15.3001 17.4 16.4001 17 17.2001 16.3C16.0001 15.2 15.2001 13.7 15.2001 12Z" fill="#EB001B"/>
            <path d="M31.8001 12.1C31.8001 15 29.2001 17.4 25.9001 17.4C24.7001 17.4 23.6001 17 22.8001 16.3C24.0001 15.3 24.8001 13.7 24.8001 12C24.8001 10.3 24.0001 8.8 22.8001 7.8C23.7001 7.1 24.8001 6.8 25.9001 6.8C29.2001 6.8 31.8001 9.2 31.8001 12.1Z" fill="#F79E1B"/>
          </svg>
          <svg className="h-8 w-auto" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="24" rx="4" fill="#43B02A"/>
            <path d="M20 7.5L17 16.5H23L26 7.5H20Z" fill="white"/>
            <path d="M15.5 7.5C14.1193 7.5 13 8.61929 13 10V14C13 15.3807 14.1193 16.5 15.5 16.5H17L20 7.5H15.5Z" fill="white"/>
            <text x="8" y="19" fill="white" fontSize="6" fontWeight="bold">M-PESA</text>
          </svg>
        </div>
      </div>
      
      <div className="mt-2">
        <div className="flex space-x-4">
          <div 
            className={`flex-1 p-3 border rounded-md cursor-pointer ${paymentMethod === 'card' ? 'border-purple-500 bg-purple-50' : 'border-gray-300'}`}
            onClick={() => setPaymentMethod('card')}
          >
            <div className="flex items-center">
              <input
                type="radio"
                id="cardPayment"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={() => setPaymentMethod('card')}
                className="h-4 w-4 text-purple-600"
              />
              <label htmlFor="cardPayment" className="ml-2 block text-sm font-medium text-gray-700">
                Credit/Debit Card
              </label>
            </div>
          </div>
          
          <div 
            className={`flex-1 p-3 border rounded-md cursor-pointer ${paymentMethod === 'mpesa' ? 'border-purple-500 bg-purple-50' : 'border-gray-300'}`}
            onClick={() => setPaymentMethod('mpesa')}
          >
            <div className="flex items-center">
              <input
                type="radio"
                id="mpesaPayment"
                name="paymentMethod"
                value="mpesa"
                checked={paymentMethod === 'mpesa'}
                onChange={() => setPaymentMethod('mpesa')}
                className="h-4 w-4 text-purple-600"
              />
              <label htmlFor="mpesaPayment" className="ml-2 block text-sm font-medium text-gray-700">
                M-Pesa
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    {paymentMethod === 'card' && (
      <div className="space-y-4">
        <div>
          <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
            Name on Card *
          </label>
          <input
            type="text"
            id="cardName"
            name="cardName"
            value={formData.cardName}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none transition-all"
          />
        </div>
        
        <div>
          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Card Number *
          </label>
          <div className="relative">
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none transition-all"
              placeholder="1234 5678 9012 3456"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg className="h-5 w-auto" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="16" rx="2" fill="#F3F4F6"/>
                <path d="M7 10.5V11.5H6V10.5H7ZM10 10.5V11.5H8V10.5H10Z" fill="#6B7280"/>
                <path d="M13 10.5V11.5H11V10.5H13ZM16 10.5V11.5H14V10.5H16Z" fill="#6B7280"/>
                <path d="M19 10.5V11.5H17V10.5H19Z" fill="#6B7280"/>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
              Expiry Date *
            </label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none transition-all"
              placeholder="MM/YY"
            />
          </div>
          
          <div>
            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
              CVV *
            </label>
            <div className="relative">
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={formData.cvv}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none transition-all"
                placeholder="123"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                title="CVV is the 3-digit security code on the back of your card"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex items-center mt-6">
          <input
            type="checkbox"
            id="saveCard"
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
          />
          <label htmlFor="saveCard" className="ml-2 block text-sm text-gray-700">
            Save card details securely for next purchase
          </label>
        </div>
      </div>
    )}
    
    {paymentMethod === 'mpesa' && (
      <div className="space-y-4">
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
            M-Pesa Phone Number *
          </label>
          <div className="relative">
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber || ''}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none transition-all"
              placeholder="0712345678"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">Enter the phone number registered with M-Pesa</p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-md border border-green-200">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">
                You will receive an M-Pesa payment request on your phone. Enter your M-Pesa PIN to complete the payment.
              </p>
            </div>
          </div>
        </div>
      </div>
    )}
    
    <div className="mt-6">
      <Button 
        type="submit" 
        variant="primary" 
        fullWidth
        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-md hover:from-purple-600 hover:to-pink-600 transform hover:-translate-y-1 transition-all duration-300"
      >
        <span className="flex items-center justify-center">
          <span>Complete Order</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </span>
      </Button>
    </div>
    
    <div className="mt-4 text-center">
      <p className="text-xs text-gray-500 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        Your payment information is encrypted and secure
      </p>
    </div>
  </form>
)}
              </div>
            </div>
            
            {/* Order summary */}
            <div className="lg:w-96">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white p-6 rounded-lg shadow-md sticky top-6"
              >
                <h2 className="text-xl font-medium mb-4 pb-2 border-b border-gray-200">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  {cart.map((item: CartItem) => (
                    <div key={item.productId} className="flex items-start">
                      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 shadow-sm">
                        <Image 
                          src={item.image} 
                          alt={typeof item?.name === 'string' ? item.name : 'Product image'}
                          width={64}
                          height={64}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        <p className="text-sm font-medium text-gray-900">KES {(item.price * (typeof item.quantity === 'number' ? item.quantity : 0)).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-gray-200 pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <p className="text-gray-600">Subtotal</p>
                    <p className="font-medium">KES {cartTotal.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <p className="text-gray-600">Shipping</p>
                    <p className="font-medium text-green-600">Free</p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <p className="text-gray-600">Tax</p>
                    <p className="font-medium">KES {(cartTotal * 0.16).toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-3 mt-3">
                    <p className="font-medium text-lg">Total</p>
                    <div className="text-right">
                      <p className="font-semibold text-lg">KES {(cartTotal + cartTotal * 0.16).toFixed(2)}</p>
                      <p className="text-xs text-gray-500">Including VAT</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 bg-gray-50 p-4 rounded-md border border-gray-200">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm">Your order qualifies for free shipping!</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <div className="rounded-md border border-gray-200 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium">Have a promo code?</p>
                      <button className="text-sm text-purple-600 hover:text-purple-800 font-medium">Apply</button>
                    </div>
                    <div className="flex">
                      <input
                        type="text"
                        className="flex-1 p-2 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none"
                        placeholder="Enter code"
                      />
                      <button className="bg-gray-100 px-4 py-2 border border-gray-300 border-l-0 rounded-r-md hover:bg-gray-200 transition-colors">
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}