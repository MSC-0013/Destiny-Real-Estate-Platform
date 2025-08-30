import Navbar from '@/components/Navbar';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-serif font-bold mb-4">About Rental Roots Hub</h1>
        <p className="text-muted-foreground text-lg">Your complete real estate platform</p>
      </div>
    </div>
  );
};

export default AboutPage;