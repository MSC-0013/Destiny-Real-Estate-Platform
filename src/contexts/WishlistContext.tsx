import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '@/lib/api';
import { useAuth } from './AuthContext';

export interface WishlistItem {
  id: string;
  propertyId: string;
  propertyData: {
    title: string;
    location: string;
    price: number;
    image: string;
    type: string;
    rating: number;
    reviews: number;
  };
  addedAt: string;
}

interface WishlistContextType {
  wishlist: WishlistItem[];
  loading: boolean;
  error: string | null;
  addToWishlist: (property: any) => Promise<void>;
  removeFromWishlist: (propertyId: string) => Promise<void>;
  isInWishlist: (propertyId: string) => boolean;
  refreshWishlist: () => Promise<void>;
  clearError: () => void;
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
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Load wishlist from backend when user changes
  useEffect(() => {
    if (user) {
      refreshWishlist();
    } else {
      setWishlist([]);
    }
  }, [user]);

  const refreshWishlist = async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const response = await api.get('/wishlist');
      if (response.data && response.data.wishlist) {
        setWishlist(response.data.wishlist);
      }
    } catch (err: any) {
      console.error('Error fetching wishlist:', err);
      // If backend is not available, use empty array instead of showing error
      if (err.code === 'ERR_NETWORK' || err.response?.status === 404) {
        console.log('Backend not available, using empty wishlist');
        setWishlist([]);
        setError(null);
      } else {
        setError(err.response?.data?.error || 'Failed to fetch wishlist');
      }
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async (property: any) => {
    if (!user) {
      setError('Please login to add items to wishlist');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const propertyData = {
        title: property.title,
        location: property.location,
        price: property.price,
        image: property.image,
        type: property.type,
        rating: property.rating || 0,
        reviews: property.reviews || 0
      };

      const response = await api.post('/wishlist', {
        propertyId: property.id,
        propertyData
      });

      if (response.data && response.data.wishlistItem) {
        setWishlist(prev => [...prev, response.data.wishlistItem]);
      }
    } catch (err: any) {
      console.error('Error adding to wishlist:', err);
      if (err.code === 'ERR_NETWORK' || err.response?.status === 404) {
        console.log('Backend not available, adding to local wishlist');
        // Add to local state for offline functionality
        const localItem = {
          id: Date.now().toString(),
          propertyId: property.id,
          propertyData: {
            title: property.title,
            location: property.location,
            price: property.price,
            image: property.image,
            type: property.type,
            rating: property.rating || 0,
            reviews: property.reviews || 0
          },
          addedAt: new Date().toISOString()
        };
        setWishlist(prev => [...prev, localItem]);
        setError(null);
      } else if (err.response?.status === 409) {
        setError('Property already in wishlist');
      } else {
        setError(err.response?.data?.error || 'Failed to add to wishlist');
      }
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (propertyId: string) => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      await api.delete(`/wishlist/${propertyId}`);
      setWishlist(prev => prev.filter(item => item.propertyId !== propertyId));
    } catch (err: any) {
      console.error('Error removing from wishlist:', err);
      if (err.code === 'ERR_NETWORK' || err.response?.status === 404) {
        console.log('Backend not available, removing from local wishlist');
        // Remove from local state for offline functionality
        setWishlist(prev => prev.filter(item => item.propertyId !== propertyId));
        setError(null);
      } else {
        setError(err.response?.data?.error || 'Failed to remove from wishlist');
      }
    } finally {
      setLoading(false);
    }
  };

  const isInWishlist = (propertyId: string): boolean => {
    return wishlist.some(item => item.propertyId === propertyId);
  };

  const clearError = () => {
    setError(null);
  };

  const value: WishlistContextType = {
    wishlist,
    loading,
    error,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    refreshWishlist,
    clearError
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};