import { create } from 'zustand';

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  featured?: boolean;
};

export type CartItem = Product & {
  quantity: number;
};

interface AppState {
  products: Product[];
  cart: CartItem[];
  isAdmin: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  toggleAdmin: () => void;
  addProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
}

export const useStore = create<AppState>((set) => ({
  products: [
    {
      id: '1',
      name: 'Void Silk Dress',
      description: 'Hand-woven ethereal black silk that absorbs light. Designed for the midnight gala.',
      price: 1200,
      image: '/images/product-coat.png', // Using the coat image as a placeholder for now if needed or I can swap
      category: 'Womenswear',
      featured: true,
    },
    {
      id: '2',
      name: 'Nebula Structured Coat',
      description: 'Architectural wool blend with nano-fiber reinforcement. A silhouette for the future.',
      price: 2400,
      image: '/images/product-coat.png',
      category: 'Menswear',
      featured: true,
    },
    {
      id: '3',
      name: 'Obsidian Tote',
      description: 'Minimalist leather carry with bio-metric lock hardware.',
      price: 850,
      image: '/images/product-bag.png',
      category: 'Accessories',
      featured: true,
    },
    {
      id: '4',
      name: 'Quantum Blazer',
      description: 'Sharp lines meets fluid movement. The essential executive armor.',
      price: 1500,
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop',
      category: 'Menswear',
    },
    {
      id: '5',
      name: 'Aether Gown',
      description: 'Floor-length translucent layers. Weightless elegance.',
      price: 3200,
      image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000&auto=format&fit=crop',
      category: 'Womenswear',
    },
  ],
  cart: [],
  isAdmin: false,
  addToCart: (product) =>
    set((state) => {
      const existing = state.cart.find((item) => item.id === product.id);
      if (existing) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      }
      return { cart: [...state.cart, { ...product, quantity: 1 }] };
    }),
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    })),
  toggleAdmin: () => set((state) => ({ isAdmin: !state.isAdmin })),
  addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
  deleteProduct: (id) =>
    set((state) => ({ products: state.products.filter((p) => p.id !== id) })),
}));
