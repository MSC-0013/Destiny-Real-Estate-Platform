import { User, Property, Booking, ConstructionProject, ChatMessage, ChatRoom, Notification, Payment } from '@/types';

// Storage keys
const STORAGE_KEYS = {
  CURRENT_USER: 'rental_roots_current_user',
  USERS: 'rental_roots_users',
  PROPERTIES: 'rental_roots_properties',
  BOOKINGS: 'rental_roots_bookings',
  CONSTRUCTION_PROJECTS: 'rental_roots_projects',
  CHAT_ROOMS: 'rental_roots_chat_rooms',
  CHAT_MESSAGES: 'rental_roots_chat_messages',
  NOTIFICATIONS: 'rental_roots_notifications',
  PAYMENTS: 'rental_roots_payments',
  SEARCH_HISTORY: 'rental_roots_search_history',
  FAVORITES: 'rental_roots_favorites',
  SETTINGS: 'rental_roots_settings'
};

// Generic storage functions
export const setItem = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const getItem = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return null;
  }
};

export const removeItem = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};

// User management
export const getCurrentUser = (): User | null => {
  return getItem<User>(STORAGE_KEYS.CURRENT_USER);
};

export const setCurrentUser = (user: User | null): void => {
  if (user) {
    setItem(STORAGE_KEYS.CURRENT_USER, user);
  } else {
    removeItem(STORAGE_KEYS.CURRENT_USER);
  }
};

export const getAllUsers = (): User[] => {
  return getItem<User[]>(STORAGE_KEYS.USERS) || [];
};

export const addUser = (user: User): void => {
  const users = getAllUsers();
  const existingIndex = users.findIndex(u => u.email === user.email);
  
  if (existingIndex >= 0) {
    users[existingIndex] = user;
  } else {
    users.push(user);
  }
  
  setItem(STORAGE_KEYS.USERS, users);
};

export const updateUser = (userId: string, updates: Partial<User>): void => {
  const users = getAllUsers();
  const index = users.findIndex(u => u.id === userId);
  
  if (index >= 0) {
    users[index] = { ...users[index], ...updates };
    setItem(STORAGE_KEYS.USERS, users);
    
    // Update current user if it's the same
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.id === userId) {
      setCurrentUser({ ...currentUser, ...updates });
    }
  }
};

// Property management
export const getAllProperties = (): Property[] => {
  return getItem<Property[]>(STORAGE_KEYS.PROPERTIES) || [];
};

export const addProperty = (property: Property): void => {
  const properties = getAllProperties();
  properties.push(property);
  setItem(STORAGE_KEYS.PROPERTIES, properties);
};

export const updateProperty = (propertyId: string, updates: Partial<Property>): void => {
  const properties = getAllProperties();
  const index = properties.findIndex(p => p.id === propertyId);
  
  if (index >= 0) {
    properties[index] = { ...properties[index], ...updates };
    setItem(STORAGE_KEYS.PROPERTIES, properties);
  }
};

export const deleteProperty = (propertyId: string): void => {
  const properties = getAllProperties();
  const filtered = properties.filter(p => p.id !== propertyId);
  setItem(STORAGE_KEYS.PROPERTIES, filtered);
};

// Booking management
export const getAllBookings = (): Booking[] => {
  return getItem<Booking[]>(STORAGE_KEYS.BOOKINGS) || [];
};

export const addBooking = (booking: Booking): void => {
  const bookings = getAllBookings();
  bookings.push(booking);
  setItem(STORAGE_KEYS.BOOKINGS, bookings);
};

export const updateBooking = (bookingId: string, updates: Partial<Booking>): void => {
  const bookings = getAllBookings();
  const index = bookings.findIndex(b => b.id === bookingId);
  
  if (index >= 0) {
    bookings[index] = { ...bookings[index], ...updates };
    setItem(STORAGE_KEYS.BOOKINGS, bookings);
  }
};

// Construction project management
export const getAllProjects = (): ConstructionProject[] => {
  return getItem<ConstructionProject[]>(STORAGE_KEYS.CONSTRUCTION_PROJECTS) || [];
};

export const addProject = (project: ConstructionProject): void => {
  const projects = getAllProjects();
  projects.push(project);
  setItem(STORAGE_KEYS.CONSTRUCTION_PROJECTS, projects);
};

export const updateProject = (projectId: string, updates: Partial<ConstructionProject>): void => {
  const projects = getAllProjects();
  const index = projects.findIndex(p => p.id === projectId);
  
  if (index >= 0) {
    projects[index] = { ...projects[index], ...updates };
    setItem(STORAGE_KEYS.CONSTRUCTION_PROJECTS, projects);
  }
};

// Chat management
export const getAllChatRooms = (): ChatRoom[] => {
  return getItem<ChatRoom[]>(STORAGE_KEYS.CHAT_ROOMS) || [];
};

export const getAllChatMessages = (): ChatMessage[] => {
  return getItem<ChatMessage[]>(STORAGE_KEYS.CHAT_MESSAGES) || [];
};

export const addChatMessage = (message: ChatMessage): void => {
  const messages = getAllChatMessages();
  messages.push(message);
  setItem(STORAGE_KEYS.CHAT_MESSAGES, messages);
};

// Favorites management
export const getFavorites = (userId: string): string[] => {
  const favorites = getItem<Record<string, string[]>>(STORAGE_KEYS.FAVORITES) || {};
  return favorites[userId] || [];
};

export const addToFavorites = (userId: string, propertyId: string): void => {
  const favorites = getItem<Record<string, string[]>>(STORAGE_KEYS.FAVORITES) || {};
  if (!favorites[userId]) {
    favorites[userId] = [];
  }
  if (!favorites[userId].includes(propertyId)) {
    favorites[userId].push(propertyId);
    setItem(STORAGE_KEYS.FAVORITES, favorites);
  }
};

export const removeFromFavorites = (userId: string, propertyId: string): void => {
  const favorites = getItem<Record<string, string[]>>(STORAGE_KEYS.FAVORITES) || {};
  if (favorites[userId]) {
    favorites[userId] = favorites[userId].filter(id => id !== propertyId);
    setItem(STORAGE_KEYS.FAVORITES, favorites);
  }
};

// Notifications management
export const getAllNotifications = (userId: string): Notification[] => {
  const notifications = getItem<Notification[]>(STORAGE_KEYS.NOTIFICATIONS) || [];
  return notifications.filter(n => n.userId === userId);
};

export const addNotification = (notification: Notification): void => {
  const notifications = getItem<Notification[]>(STORAGE_KEYS.NOTIFICATIONS) || [];
  notifications.unshift(notification); // Add to beginning
  // Keep only last 100 notifications per user
  setItem(STORAGE_KEYS.NOTIFICATIONS, notifications.slice(0, 100));
};

export const markNotificationAsRead = (notificationId: string): void => {
  const notifications = getItem<Notification[]>(STORAGE_KEYS.NOTIFICATIONS) || [];
  const index = notifications.findIndex(n => n.id === notificationId);
  
  if (index >= 0) {
    notifications[index].read = true;
    setItem(STORAGE_KEYS.NOTIFICATIONS, notifications);
  }
};

// Initialize default data
export const initializeDefaultData = (): void => {
  // Add default admin user if no users exist
  const users = getAllUsers();
  if (users.length === 0) {
    const adminUser: User = {
      id: 'admin-1',
      name: 'Admin',
      email: 'admin@gmail.com',
      role: 'admin',
      verified: true,
      createdAt: new Date().toISOString(),
      rating: 5.0,
      reviews: 0
    };
    addUser(adminUser);
  }
  
  // Initialize empty arrays for other data if they don't exist
  if (!getItem(STORAGE_KEYS.PROPERTIES)) {
    setItem(STORAGE_KEYS.PROPERTIES, []);
  }
  if (!getItem(STORAGE_KEYS.BOOKINGS)) {
    setItem(STORAGE_KEYS.BOOKINGS, []);
  }
  if (!getItem(STORAGE_KEYS.CONSTRUCTION_PROJECTS)) {
    setItem(STORAGE_KEYS.CONSTRUCTION_PROJECTS, []);
  }
  if (!getItem(STORAGE_KEYS.NOTIFICATIONS)) {
    setItem(STORAGE_KEYS.NOTIFICATIONS, []);
  }
};
