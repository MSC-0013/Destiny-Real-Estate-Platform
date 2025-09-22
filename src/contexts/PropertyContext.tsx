import { createContext, useContext, useState, ReactNode } from 'react';

export interface PropertyFormData {
  title: string;
  description: string;
  location: string;
  city: string;
  state: string;
  price: string;
  duration: string;
  type: string;
  bedrooms: string;
  bathrooms: string;
  guests: string;
  area: string;
  amenities: string[];
  images: string[];
  available: boolean;
  verified: boolean;
}

interface PropertyContextType {
  formData: PropertyFormData;
  setFormData: React.Dispatch<React.SetStateAction<PropertyFormData>>;
}

const defaultFormData: PropertyFormData = {
  title: '',
  description: '',
  location: '',
  city: '',
  state: '',
  price: '',
  duration: 'month',
  type: 'apartment',
  bedrooms: '',
  bathrooms: '',
  guests: '',
  area: '',
  amenities: [],
  images: [],
  available: true,
  verified: false
};

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const PropertyProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<PropertyFormData>(defaultFormData);
  return (
    <PropertyContext.Provider value={{ formData, setFormData }}>
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (!context) throw new Error('useProperty must be used within a PropertyProvider');
  return context;
};
