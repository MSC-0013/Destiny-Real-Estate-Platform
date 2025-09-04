import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '@/lib/api';
import { useAuth } from './AuthContext';

export interface ConstructionProject {
  id: string;
  userId: string;
  title: string;
  description: string;
  type: 'residential' | 'commercial' | 'renovation' | 'interior';
  location: string;
  budget: number;
  timeline: string;
  status: 'planning' | 'in-progress' | 'completed' | 'cancelled';
  progress: number;
  contractorId?: string;
  milestones: {
    id: string;
    title: string;
    description?: string;
    dueDate?: string;
    completed: boolean;
    completedAt?: string;
  }[];
  materials: {
    id: string;
    name: string;
    quantity: number;
    unit?: string;
    pricePerUnit: number;
    supplier?: string;
    status: 'ordered' | 'delivered' | 'pending';
  }[];
  workers: {
    id: string;
    name: string;
    role: string;
    contact?: string;
    dailyRate: number;
    availability: 'available' | 'busy' | 'unavailable';
  }[];
  approved: boolean;
  approvedBy?: string;
  approvedAt?: string;
  createdAt: string;
  updatedAt: string;
}

interface ConstructionContextType {
  projects: ConstructionProject[];
  loading: boolean;
  error: string | null;
  createProject: (projectData: Omit<ConstructionProject, 'id' | 'userId' | 'createdAt' | 'updatedAt' | 'milestones' | 'materials' | 'workers' | 'approved' | 'approvedBy' | 'approvedAt'>) => Promise<ConstructionProject>;
  updateProject: (projectId: string, updates: Partial<ConstructionProject>) => Promise<void>;
  deleteProject: (projectId: string) => Promise<void>;
  getUserProjects: (userId: string) => ConstructionProject[];
  getAllProjects: () => Promise<void>;
  approveProject: (projectId: string) => Promise<void>;
  addMilestone: (projectId: string, milestone: Omit<ConstructionProject['milestones'][0], 'id'>) => Promise<void>;
  completeMilestone: (projectId: string, milestoneId: string) => Promise<void>;
  refreshProjects: () => Promise<void>;
  clearError: () => void;
}

const ConstructionContext = createContext<ConstructionContextType | undefined>(undefined);

export const useConstruction = () => {
  const context = useContext(ConstructionContext);
  if (context === undefined) {
    throw new Error('useConstruction must be used within a ConstructionProvider');
  }
  return context;
};

interface ConstructionProviderProps {
  children: ReactNode;
}

export const ConstructionProvider: React.FC<ConstructionProviderProps> = ({ children }) => {
  const [projects, setProjects] = useState<ConstructionProject[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Load projects from backend when user changes
  useEffect(() => {
    if (user) {
      refreshProjects();
    } else {
      setProjects([]);
    }
  }, [user]);

  const refreshProjects = async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const response = await api.get('/construction');
      if (response.data && response.data.projects) {
        setProjects(response.data.projects);
      }
    } catch (err: any) {
      console.error('Error fetching construction projects:', err);
      // If backend is not available, use empty array instead of showing error
      if (err.code === 'ERR_NETWORK' || err.response?.status === 404) {
        console.log('Backend not available, using empty projects list');
        setProjects([]);
        setError(null);
      } else {
        setError(err.response?.data?.error || 'Failed to fetch construction projects');
      }
    } finally {
      setLoading(false);
    }
  };

  const getAllProjects = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get('/construction');
      if (response.data && response.data.projects) {
        setProjects(response.data.projects);
      }
    } catch (err: any) {
      console.error('Error fetching all construction projects:', err);
      // If backend is not available, use empty array instead of showing error
      if (err.code === 'ERR_NETWORK' || err.response?.status === 404) {
        console.log('Backend not available, using empty projects list');
        setProjects([]);
        setError(null);
      } else {
        setError(err.response?.data?.error || 'Failed to fetch construction projects');
      }
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (projectData: Omit<ConstructionProject, 'id' | 'userId' | 'createdAt' | 'updatedAt' | 'milestones' | 'materials' | 'workers' | 'approved' | 'approvedBy' | 'approvedAt'>): Promise<ConstructionProject> => {
    if (!user) {
      throw new Error('User must be authenticated to create a project');
    }

    setLoading(true);
    setError(null);

    try {
      const response = await api.post('/construction', projectData);
      if (response.data && response.data.project) {
        const newProject = response.data.project;
        setProjects(prev => [...prev, newProject]);
        return newProject;
      }
      throw new Error('Failed to create project');
    } catch (err: any) {
      console.error('Error creating construction project:', err);
      setError(err.response?.data?.error || 'Failed to create construction project');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProject = async (projectId: string, updates: Partial<ConstructionProject>) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.patch(`/construction/${projectId}`, updates);
      if (response.data && response.data.project) {
        const updatedProject = response.data.project;
        setProjects(prev => prev.map(project => 
          project.id === projectId ? updatedProject : project
        ));
      }
    } catch (err: any) {
      console.error('Error updating construction project:', err);
      setError(err.response?.data?.error || 'Failed to update construction project');
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (projectId: string) => {
    setLoading(true);
    setError(null);

    try {
      await api.delete(`/construction/${projectId}`);
      setProjects(prev => prev.filter(project => project.id !== projectId));
    } catch (err: any) {
      console.error('Error deleting construction project:', err);
      setError(err.response?.data?.error || 'Failed to delete construction project');
    } finally {
      setLoading(false);
    }
  };

  const approveProject = async (projectId: string) => {
    if (!user || user.role !== 'admin') {
      setError('Admin access required to approve projects');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await api.patch(`/construction/${projectId}/approve`);
      if (response.data && response.data.project) {
        const approvedProject = response.data.project;
        setProjects(prev => prev.map(project => 
          project.id === projectId ? approvedProject : project
        ));
      }
    } catch (err: any) {
      console.error('Error approving construction project:', err);
      setError(err.response?.data?.error || 'Failed to approve construction project');
    } finally {
      setLoading(false);
    }
  };

  const addMilestone = async (projectId: string, milestone: Omit<ConstructionProject['milestones'][0], 'id'>) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post(`/construction/${projectId}/milestones`, milestone);
      if (response.data && response.data.project) {
        const updatedProject = response.data.project;
        setProjects(prev => prev.map(project => 
          project.id === projectId ? updatedProject : project
        ));
      }
    } catch (err: any) {
      console.error('Error adding milestone:', err);
      setError(err.response?.data?.error || 'Failed to add milestone');
    } finally {
      setLoading(false);
    }
  };

  const completeMilestone = async (projectId: string, milestoneId: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.patch(`/construction/${projectId}/milestones/${milestoneId}/complete`);
      if (response.data && response.data.project) {
        const updatedProject = response.data.project;
        setProjects(prev => prev.map(project => 
          project.id === projectId ? updatedProject : project
        ));
      }
    } catch (err: any) {
      console.error('Error completing milestone:', err);
      setError(err.response?.data?.error || 'Failed to complete milestone');
    } finally {
      setLoading(false);
    }
  };

  const getUserProjects = (userId: string): ConstructionProject[] => {
    return projects.filter(project => project.userId === userId);
  };

  const clearError = () => {
    setError(null);
  };

  const value: ConstructionContextType = {
    projects,
    loading,
    error,
    createProject,
    updateProject,
    deleteProject,
    getUserProjects,
    getAllProjects,
    approveProject,
    addMilestone,
    completeMilestone,
    refreshProjects,
    clearError
  };

  return (
    <ConstructionContext.Provider value={value}>
      {children}
    </ConstructionContext.Provider>
  );
};
