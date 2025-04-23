export type Order = {
    items: CartItem[];
    subtotal: number;
    shipping: number;
    total: number;
    customerInfo?: {
      name: string;
      email: string;
      phone: string;
      address: {
        line1: string;
        line2?: string;
        city: string;
        postalCode: string;
        country: string;
      }
    }
    deliveryDate?: string;
    deliveryNotes?: string;
    paymentMethod?: string;
  }

  export type CartItem = {
    productId: string;
    quantity: number;
    price: number;
    name: string;
    image: string;
  }
  