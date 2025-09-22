  import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
  import { api } from '@/lib/api';
  import { Property } from '@/data/properties';
  import { useAuth } from './AuthContext';
  import { v4 as uuidv4 } from 'uuid';

  export interface Order {
    id: string;
    property: Property;
    userId: string;
    startDate: string;
    endDate: string;
    totalAmount: number;
    status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';
    paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
    guests: number;
    specialRequests?: string;
    createdAt: string;
    updatedAt: string;
  }

  export interface ConstructionProject {
    id: string;
    title: string;
    description: string;
    type: 'residential' | 'commercial' | 'renovation' | 'interior';
    location: string;
    budget: number;
    timeline: string;
    status: 'planning' | 'in-progress' | 'completed' | 'cancelled';
    progress: number;
    clientId: string;
    contractorId?: string;
    milestones: {
      id: string;
      title: string;
      description: string;
      dueDate: string;
      completed: boolean;
      completedAt?: string;
    }[];
    materials: {
      id: string;
      name: string;
      quantity: number;
      unit: string;
      pricePerUnit: number;
      supplier: string;
      status: 'ordered' | 'delivered' | 'pending';
    }[];
    workers: {
      id: string;
      name: string;
      role: string;
      contact: string;
      dailyRate: number;
      availability: 'available' | 'busy' | 'unavailable';
    }[];
    createdAt: string;
    updatedAt: string;
  }

  interface OrdersContextType {
    orders: Order[];
    constructionProjects: ConstructionProject[];
    loading: boolean;
    error: string | null;
    createOrder: (property: Property, bookingDetails: {
      startDate: string;
      endDate: string;
      guests: number;
      specialRequests?: string;
    }) => Promise<Order>;
    updateOrderStatus: (orderId: string, status: Order['status']) => Promise<void>;
    updatePaymentStatus: (orderId: string, status: Order['paymentStatus']) => Promise<void>;
    getUserOrders: (userId: string) => Order[];
    fetchUserOrders: (userId: string) => Promise<void>;
    createConstructionProject: (projectData: Omit<ConstructionProject, 'id' | 'createdAt' | 'updatedAt' | 'milestones' | 'materials' | 'workers'>) => ConstructionProject;
    updateProjectProgress: (projectId: string, progress: number) => void;
    addProjectMilestone: (projectId: string, milestone: Omit<ConstructionProject['milestones'][0], 'id'>) => void;
    completeProjectMilestone: (projectId: string, milestoneId: string) => void;
    getUserProjects: (userId: string) => ConstructionProject[];
    totalSpent: (userId: string) => number;
    orderStats: {
      total: number;
      active: number;
      completed: number;
      pending: number;
    };
    refreshOrders: () => Promise<void>;
  }

  const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

  export const useOrders = () => {
    const context = useContext(OrdersContext);
    if (context === undefined) {
      throw new Error('useOrders must be used within an OrdersProvider');
    }
    return context;
  };

  interface OrdersProviderProps {
    children: ReactNode;
  }

  export const OrdersProvider: React.FC<OrdersProviderProps> = ({ children }) => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [constructionProjects, setConstructionProjects] = useState<ConstructionProject[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();

    // Load data from localStorage on mount
    useEffect(() => {
      const savedOrders = localStorage.getItem('orders');
      if (savedOrders) {
        try {
          const parsedOrders = JSON.parse(savedOrders);
          setOrders(parsedOrders);
        } catch (error) {
          console.error('Error parsing orders from localStorage:', error);
          localStorage.removeItem('orders');
        }
      }

      const savedProjects = localStorage.getItem('constructionProjects');
      if (savedProjects) {
        try {
          const parsedProjects = JSON.parse(savedProjects);
          setConstructionProjects(parsedProjects);
        } catch (error) {
          console.error('Error parsing construction projects from localStorage:', error);
          localStorage.removeItem('constructionProjects');
        }
      }
    }, []);

    // Save orders to localStorage whenever they change
    useEffect(() => {
      localStorage.setItem('orders', JSON.stringify(orders));
    }, [orders]);

    // Save construction projects to localStorage whenever they change
    useEffect(() => {
      localStorage.setItem('constructionProjects', JSON.stringify(constructionProjects));
    }, [constructionProjects]);

    const createOrder = async (property: Property, bookingDetails: {
      startDate: string;
      endDate: string;
      guests: number;
      specialRequests?: string;
    }): Promise<Order> => {
      if (!user) {
        throw new Error('User must be authenticated to create an order');
      }

      // Calculate total amount based on duration
      const startDate = new Date(bookingDetails.startDate);
      const endDate = new Date(bookingDetails.endDate);
      const durationInDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      
      let totalAmount = 0;
      if (property.duration === 'day') {
        totalAmount = property.price * durationInDays;
      } else if (property.duration === 'week') {
        totalAmount = property.price * Math.ceil(durationInDays / 7);
      } else if (property.duration === 'month') {
        totalAmount = property.price * Math.ceil(durationInDays / 30);
      } else {
        totalAmount = property.price;
      }

      const newOrder: Order = {
        id: uuidv4(),
        property,
        userId: user.id,
        startDate: bookingDetails.startDate,
        endDate: bookingDetails.endDate,
        totalAmount,
        status: 'pending',
        paymentStatus: 'pending',
        guests: bookingDetails.guests,
        specialRequests: bookingDetails.specialRequests,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      try {
        const resp = await api.post('/orders', {
          propertyId: property.id,
          type: (property as any).type || 'rental',
          amount: totalAmount,
          currency: 'INR',
          metadata: { startDate: bookingDetails.startDate, endDate: bookingDetails.endDate, guests: bookingDetails.guests }
        });
        if (resp.status === 201) {
          const data = resp.data;
          const created = { ...newOrder, id: data.order.id };
          setOrders(prev => [...prev, created]);
          return created;
        }
      } catch (e) {
        // ignore and fallback to local
      }
      setOrders(prev => [...prev, newOrder]);
      return newOrder;
    };

    const fetchUserOrders = async (userId: string) => {
      if (!user) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const response = await api.get('/orders');
        if (response.data && response.data.orders) {
          // Convert backend orders to frontend format
          const backendOrders = response.data.orders.map((backendOrder: any) => ({
            id: backendOrder.id,
            property: {
              id: backendOrder.propertyId,
              title: 'Property',
              location: 'Location',
              price: backendOrder.amount,
              duration: 'month',
              guests: 2,
              bedrooms: 1,
              bathrooms: 1,
              image: '/placeholder.jpg',
              rating: 4.5,
              reviews: 0,
              type: 'Apartment',
              amenities: [],
              available: true,
              verified: true
            },
            userId: backendOrder.userId,
            startDate: backendOrder.metadata?.startDate || new Date().toISOString(),
            endDate: backendOrder.metadata?.endDate || new Date().toISOString(),
            totalAmount: backendOrder.amount,
            status: backendOrder.status,
            paymentStatus: backendOrder.paymentStatus,
            guests: backendOrder.metadata?.guests || 2,
            specialRequests: backendOrder.metadata?.specialRequests,
            createdAt: backendOrder.createdAt,
            updatedAt: backendOrder.updatedAt
          }));
          
          setOrders(backendOrders);
        }
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    const refreshOrders = async () => {
      if (user) {
        await fetchUserOrders(user.id);
      }
    };

    const updateOrderStatus = async (orderId: string, status: Order['status']) => {
      try {
        await api.patch(`/orders/${orderId}`, { status });
        setOrders(prev => prev.map(order => 
          order.id === orderId 
            ? { ...order, status, updatedAt: new Date().toISOString() }
            : order
        ));
      } catch (err) {
        console.error('Error updating order status:', err);
        setError('Failed to update order status');
      }
    };

    const updatePaymentStatus = async (orderId: string, status: Order['paymentStatus']) => {
      try {
        await api.patch(`/orders/${orderId}`, { paymentStatus: status });
        setOrders(prev => prev.map(order => 
          order.id === orderId 
            ? { ...order, paymentStatus: status, updatedAt: new Date().toISOString() }
            : order
        ));
      } catch (err) {
        console.error('Error updating payment status:', err);
        setError('Failed to update payment status');
      }
    };

    const getUserOrders = (userId: string) => {
      return orders.filter(order => order.userId === userId);
    };

    const createConstructionProject = (projectData: Omit<ConstructionProject, 'id' | 'createdAt' | 'updatedAt' | 'milestones' | 'materials' | 'workers'>): ConstructionProject => {
      const newProject: ConstructionProject = {
        ...projectData,
        id: uuidv4(),
        milestones: [],
        materials: [],
        workers: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      setConstructionProjects(prev => [...prev, newProject]);
      return newProject;
    };

    const updateProjectProgress = (projectId: string, progress: number) => {
      setConstructionProjects(prev => prev.map(project => 
        project.id === projectId 
          ? { ...project, progress, updatedAt: new Date().toISOString() }
          : project
      ));
    };

    const addProjectMilestone = (projectId: string, milestone: Omit<ConstructionProject['milestones'][0], 'id'>) => {
      setConstructionProjects(prev => prev.map(project => 
        project.id === projectId 
          ? { 
              ...project, 
              milestones: [...project.milestones, { ...milestone, id: uuidv4() }],
              updatedAt: new Date().toISOString()
            }
          : project
      ));
    };

    const completeProjectMilestone = (projectId: string, milestoneId: string) => {
      setConstructionProjects(prev => prev.map(project => 
        project.id === projectId 
          ? { 
              ...project, 
              milestones: project.milestones.map(milestone =>
                milestone.id === milestoneId
                  ? { ...milestone, completed: true, completedAt: new Date().toISOString() }
                  : milestone
              ),
              updatedAt: new Date().toISOString()
            }
          : project
      ));
    };

    const getUserProjects = (userId: string) => {
      return constructionProjects.filter(project => project.clientId === userId);
    };

    const totalSpent = (userId: string) => {
      return orders
        .filter(order => order.userId === userId && order.paymentStatus === 'paid')
        .reduce((total, order) => total + order.totalAmount, 0);
    };

    const orderStats = {
      total: orders.length,
      active: orders.filter(order => order.status === 'active').length,
      completed: orders.filter(order => order.status === 'completed').length,
      pending: orders.filter(order => order.status === 'pending').length
    };

    const value: OrdersContextType = {
      orders,
      constructionProjects,
      loading,
      error,
      createOrder,
      updateOrderStatus,
      updatePaymentStatus,
      getUserOrders,
      fetchUserOrders,
      createConstructionProject,
      updateProjectProgress,
      addProjectMilestone,
      completeProjectMilestone,
      getUserProjects,
      totalSpent,
      orderStats,
      refreshOrders
    };

    return (
      <OrdersContext.Provider value={value}>
        {children}
      </OrdersContext.Provider>
    );
  };
