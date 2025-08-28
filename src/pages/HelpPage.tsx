import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, MessageCircle, Phone, Mail, 
  ChevronDown, ChevronRight, HelpCircle,
  BookOpen, CreditCard, Home, Users
} from 'lucide-react';

const HelpPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showChatBot, setShowChatBot] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', message: 'Hi! I\'m here to help you with Destiny. What would you like to know?' }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');

  const faqs = [
    {
      category: 'Getting Started',
      icon: BookOpen,
      questions: [
        {
          question: 'How do I create an account?',
          answer: 'Click on "Sign Up" in the top navigation, choose whether you\'re a tenant or landlord, and fill out the registration form. You\'ll receive a confirmation email to verify your account.'
        },
        {
          question: 'What\'s the difference between tenant and landlord accounts?',
          answer: 'Tenant accounts can search, book, and manage rentals. Landlord accounts can list properties, manage bookings, and communicate with tenants.'
        },
        {
          question: 'How do I search for properties?',
          answer: 'Use the search bar on the homepage or browse our listings page. You can filter by location, price, duration, and amenities to find your perfect match.'
        }
      ]
    },
    {
      category: 'Booking & Payments',
      icon: CreditCard,
      questions: [
        {
          question: 'How do I book a property?',
          answer: 'Find a property you like, click "View Details", select your dates, and click "Reserve Now". You\'ll be guided through the booking process and payment.'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards, debit cards, and bank transfers through our secure payment system.'
        },
        {
          question: 'Can I cancel my booking?',
          answer: 'Yes, cancellation policies vary by property. Check the specific cancellation terms in your booking confirmation or contact support.'
        },
        {
          question: 'When will I be charged?',
          answer: 'Payment is processed immediately upon booking confirmation. For monthly rentals, additional payments are due on the same date each month.'
        }
      ]
    },
    {
      category: 'Property Management',
      icon: Home,
      questions: [
        {
          question: 'How do I list my property?',
          answer: 'Create a landlord account, go to your dashboard, and click "Add Property". Fill out the details, upload photos, and submit for approval.'
        },
        {
          question: 'How long does property approval take?',
          answer: 'Most properties are reviewed and approved within 24-48 hours. You\'ll receive an email notification once approved.'
        },
        {
          question: 'How do I manage my bookings?',
          answer: 'Use your landlord dashboard to view all bookings, approve applications, and communicate with tenants.'
        }
      ]
    },
    {
      category: 'Account & Support',
      icon: Users,
      questions: [
        {
          question: 'How do I contact customer support?',
          answer: 'You can reach us through live chat, email at support@destiny.com, or phone at 1-800-DESTINY. Our support team is available 24/7.'
        },
        {
          question: 'How do I update my profile?',
          answer: 'Go to your dashboard and click on "Profile Settings" to update your personal information, contact details, and preferences.'
        },
        {
          question: 'Is my personal information secure?',
          answer: 'Yes, we use industry-standard encryption and security measures to protect your data. We never share your personal information with third parties.'
        }
      ]
    }
  ];

  const quickHelpOptions = [
    'How to book a property',
    'Payment methods',
    'Cancellation policy',
    'Property listing guide',
    'Contact landlord',
    'Account settings'
  ];

  const handleChatBot = (option: string) => {
    setChatMessages(prev => [...prev, 
      { type: 'user', message: option },
      { type: 'bot', message: getQuickResponse(option) }
    ]);
  };

  const getQuickResponse = (option: string) => {
    const responses: { [key: string]: string } = {
      'How to book a property': 'To book a property: 1) Browse listings 2) Click "View Details" 3) Select dates 4) Click "Reserve Now" 5) Complete payment. Need help with a specific step?',
      'Payment methods': 'We accept all major credit cards, debit cards, and bank transfers. All payments are processed securely through our encrypted system.',
      'Cancellation policy': 'Cancellation policies vary by property. Most allow free cancellation up to 48 hours before check-in. Check your booking details for specific terms.',
      'Property listing guide': 'To list your property: 1) Create landlord account 2) Go to dashboard 3) Click "Add Property" 4) Fill details & upload photos 5) Submit for approval.',
      'Contact landlord': 'You can message landlords directly through the property listing page or your booking dashboard. Click the "Contact Host" button.',
      'Account settings': 'Access account settings from your dashboard. You can update personal info, payment methods, notifications, and privacy settings.'
    };
    return responses[option] || 'I can help you with that! Please contact our support team for detailed assistance.';
  };

  const sendChatMessage = () => {
    if (!currentMessage.trim()) return;
    
    setChatMessages(prev => [...prev, 
      { type: 'user', message: currentMessage },
      { type: 'bot', message: 'Thank you for your message! Our support team will assist you with this inquiry. For immediate help, please check our FAQ section above.' }
    ]);
    setCurrentMessage('');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-foreground mb-4">
            How can we help you?
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Find answers to common questions or get in touch with our support team
          </p>
          
          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Live Chat</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get instant help from our support team
              </p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowChatBot(true)}
              >
                Start Chat
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Call Us</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Speak directly with our support team
              </p>
              <Button variant="outline" size="sm">
                1-800-DESTINY
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Email Support</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Send us a detailed message
              </p>
              <Button variant="outline" size="sm">
                support@destiny.com
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Sections */}
        <div className="space-y-8">
          <h2 className="text-2xl font-serif font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>

          {faqs.map((category, categoryIndex) => {
            const Icon = category.icon;
            return (
              <Card key={categoryIndex}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-primary rounded-lg mr-3 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.questions.map((faq, faqIndex) => {
                      const globalIndex = categoryIndex * 100 + faqIndex;
                      const isOpen = openFaq === globalIndex;
                      
                      return (
                        <div key={faqIndex} className="border rounded-lg">
                          <button
                            onClick={() => setOpenFaq(isOpen ? null : globalIndex)}
                            className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                          >
                            <span className="font-medium">{faq.question}</span>
                            {isOpen ? (
                              <ChevronDown className="w-4 h-4 text-muted-foreground" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-muted-foreground" />
                            )}
                          </button>
                          {isOpen && (
                            <div className="px-4 pb-3 text-muted-foreground">
                              {faq.answer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Chat Bot */}
        {showChatBot && (
          <div className="fixed bottom-4 right-4 w-80 bg-card border rounded-lg shadow-lg z-50">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-primary rounded-full mr-2 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium">Destiny Support</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowChatBot(false)}
              >
                ×
              </Button>
            </div>
            
            <div className="h-64 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs p-2 rounded-lg text-sm ${
                    msg.type === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-foreground'
                  }`}>
                    {msg.message}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t">
              <div className="mb-3">
                <p className="text-xs text-muted-foreground mb-2">Quick help:</p>
                <div className="flex flex-wrap gap-1">
                  {quickHelpOptions.slice(0, 3).map((option, index) => (
                    <Badge 
                      key={index}
                      variant="outline" 
                      className="cursor-pointer hover:bg-muted text-xs"
                      onClick={() => handleChatBot(option)}
                    >
                      {option}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Input
                  placeholder="Type your message..."
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                  className="text-sm"
                />
                <Button size="sm" onClick={sendChatMessage}>
                  Send
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HelpPage;