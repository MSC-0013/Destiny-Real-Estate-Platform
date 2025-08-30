import Navbar from '@/components/Navbar';

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-serif font-bold mb-4">Blog</h1>
        <p className="text-muted-foreground text-lg">Latest real estate insights and news</p>
      </div>
    </div>
  );
};

export default BlogPage;