import Navbar from '@/components/Navbar';
import { useParams } from 'react-router-dom';

const NeighborhoodDetailPage = () => {
  const { id } = useParams();
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-serif font-bold mb-4">Neighborhood</h1>
        <p className="text-muted-foreground">Details for: {id}</p>
      </div>
    </div>
  );
};

export default NeighborhoodDetailPage;


