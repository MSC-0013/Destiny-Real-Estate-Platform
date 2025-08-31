import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Property } from '@/data/properties';

interface WishlistContextType {
  wishlist: Property[];
  addToWishlist: (property: Property) => void;
  removeFromWishlist: (propertyId: string) => void;
  isInWishlist: (propertyId: string) => boolean;
  clearWishlist: () => void;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

interface WishlistProviderProps {
  children: ReactNode;
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {
  const [wishlist, setWishlist] = useState<Property[]>([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      try {
        const parsedWishlist = JSON.parse(savedWishlist);
        setWishlist(parsedWishlist);
      } catch (error) {
        console.error('Error parsing wishlist from localStorage:', error);
        localStorage.removeItem('wishlist');
      }
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (property: Property) => {
    setWishlist(prev => {
      // Check if property is already in wishlist
      if (prev.some(item => item.id === property.id)) {
        return prev;
      }
      return [...prev, property];
    });
  };

  const removeFromWishlist = (propertyId: string) => {
    setWishlist(prev => prev.filter(item => item.id !== propertyId));
  };

  const isInWishlist = (propertyId: string) => {
    return wishlist.some(item => item.id === propertyId);
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  const wishlistCount = wishlist.length;

  const value: WishlistContextType = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
    wishlistCount
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};
