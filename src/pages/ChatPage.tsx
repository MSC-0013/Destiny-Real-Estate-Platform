import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle } from 'lucide-react';

const ChatPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageCircle className="w-5 h-5 mr-2" />
              Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Your conversations will appear here</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChatPage;