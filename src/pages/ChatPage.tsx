import { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  Home, 
  Building, 
  Hammer, 
  Search, 
  MapPin, 
  Shield,
  HelpCircle,
  Info,
  Phone,
  Mail,
  Clock,
  Star,
  TrendingUp,
  Users,
  FileText,
  CheckCircle
} from 'lucide-react';

interface ChatMessage {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
  type: 'text' | 'quick-options' | 'property-suggestions';
  quickOptions?: string[];
  propertySuggestions?: any[];
}

const ChatPage = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const quickOptions = [
    "Who are you?",
    "What services do you offer?",
    "How to rent a property?",
    "How to buy/sell property?",
    "Construction services",
    "Property verification process",
    "Payment and pricing",
    "Contact support team",
    "View featured properties",
    "Help with booking"
  ];

  const botResponses: { [key: string]: string } = {
    "Who are you?": "Hello! I'm Destiny AI, your intelligent real estate assistant. I help users find properties, understand our services, and guide them through the entire real estate journey. I can assist with rentals, buying/selling, construction services, and much more!",
    
    "What services do you offer?": "Destiny offers comprehensive real estate services:\n\n🏠 **Property Rentals**: Daily, weekly, monthly, and yearly rentals\n🏗️ **Buy/Sell**: Complete property transactions with verification\n🔨 **Construction**: Custom home building and renovation\n📋 **Verification**: ID verification, credit checks, and property validation\n💳 **Payment**: Secure payment processing with installment options\n📱 **Support**: 24/7 customer support and guidance",
    
    "How to rent a property?": "Renting with Destiny is simple:\n\n1️⃣ **Browse Properties**: Search from 100+ verified properties\n2️⃣ **Select Duration**: Choose from 1 day to multiple years\n3️⃣ **ID Verification**: Complete identity and credit verification\n4️⃣ **Contract Signing**: Digital contract with e-signature\n5️⃣ **Payment**: 50% advance, 50% before leaving\n6️⃣ **Move In**: Enjoy your new home!\n\nAll properties come with verified landlords and comprehensive amenities.",
    
    "How to buy/sell property?": "Buying/Selling with Destiny:\n\n🏠 **For Buyers**:\n- Browse 100+ properties in ₹ (Indian Rupees)\n- Complete ID verification and credit checks\n- Sign digital contracts with e-signatures\n- Secure payment processing\n- Legal documentation support\n\n🏠 **For Sellers**:\n- List your property with verification\n- Professional photography and virtual tours\n- Marketing and buyer matching\n- Legal and financial assistance\n- Secure transaction processing",
    
    "Construction services": "Destiny Construction Services:\n\n🏗️ **Custom Homes**: 25+ pre-designed home models\n🏗️ **Land Development**: Purchase and develop land\n🏗️ **Renovation**: Modernize existing properties\n👷 **Professional Team**: 5000+ workers, 20 designers, 10 supervisors, 2 managers\n💰 **Payment**: 70% advance, 30% upon completion\n📋 **Process**: Design selection → Contract signing → Construction → Handover\n\nOur team handles everything from design to final construction!",
    
    "Property verification process": "Property Verification Process:\n\n✅ **Landlord Verification**: ID, background checks, property ownership\n✅ **Property Inspection**: Professional assessment and photography\n✅ **Document Verification**: Legal documents and permits\n✅ **Amenity Verification**: All listed features confirmed\n✅ **Safety Checks**: Security and maintenance standards\n✅ **Regular Audits**: Ongoing quality assurance\n\nAll properties are verified before listing for your safety!",
    
    "Payment and pricing": "Destiny Payment Options:\n\n💳 **Rental Payments**:\n- Daily: ₹1,000 - ₹5,000\n- Weekly: ₹5,000 - ₹25,000\n- Monthly: ₹15,000 - ₹100,000+\n- Yearly: ₹150,000 - ₹1,200,000+\n\n💰 **Buy/Sell**:\n- Property prices: ₹25,00,000 - ₹5,00,00,000+\n- 50% advance, 50% before possession\n- EMI options available\n\n🏗️ **Construction**:\n- 70% advance, 30% upon completion\n- Transparent pricing with detailed breakdowns",
    
    "Contact support team": "Contact Destiny Support Team:\n\n📞 **24/7 Helpline**: +91-1800-DESTINY\n📧 **Email**: support@destiny.com\n💬 **Live Chat**: Available on website\n🏢 **Office**: Mumbai, Bangalore, Delhi, Chennai\n⏰ **Business Hours**: 9:00 AM - 8:00 PM IST\n\nOur expert team is always ready to help you with any queries!",
    
    "View featured properties": "Here are some featured properties from Destiny:\n\n🏠 **Luxury Sea View Apartment** - Bandra West, Mumbai\n   ₹85,000/month | 3BHK | Sea View | Premium Amenities\n\n🏠 **Tech Hub Villa** - Whitefield, Bangalore\n   ₹65,000/month | 3BHK | IT Park Proximity | Garden\n\n🏠 **Premium Golf View** - Gurgaon, Delhi NCR\n   ₹95,000/month | 4BHK | Golf Course | Club Access\n\nBrowse our complete collection of 100+ verified properties!",
    
    "Help with booking": "Booking Assistance:\n\n1️⃣ **Property Selection**: I can help you find the perfect property\n2️⃣ **Duration Planning**: Choose rental period that suits you\n3️⃣ **Verification Guide**: Step-by-step ID verification process\n4️⃣ **Contract Support**: Understand terms and conditions\n5️⃣ **Payment Guidance**: Secure payment options and schedules\n6️⃣ **Move-in Support**: Smooth transition to your new home\n\nLet me know what specific help you need with your booking!"
  };

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    // Send welcome message when component mounts
    const welcomeMessage: ChatMessage = {
      id: 'welcome',
      content: "Hello! I'm Destiny AI, your intelligent real estate assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date(),
      type: 'quick-options',
      quickOptions: quickOptions
    };
    setMessages([welcomeMessage]);
  }, []);

  const handleQuickOption = async (option: string) => {
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: option,
      isBot: false,
      timestamp: new Date(),
      type: 'text'
    };
    setMessages(prev => [...prev, userMessage]);

    // Simulate bot typing
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsTyping(false);

    // Add bot response
    const botMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      content: botResponses[option] || "I'm here to help! Please select from the options above or ask me anything about real estate.",
      isBot: true,
      timestamp: new Date(),
      type: 'text'
    };
    setMessages(prev => [...prev, botMessage]);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputValue,
      isBot: false,
      timestamp: new Date(),
      type: 'text'
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate bot typing
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsTyping(false);

    // Generate intelligent response
    const botResponse = generateIntelligentResponse(inputValue);
    const botMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      content: botResponse,
      isBot: true,
      timestamp: new Date(),
      type: 'text'
    };
    setMessages(prev => [...prev, botMessage]);
  };

  const generateIntelligentResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('price') || input.includes('cost') || input.includes('₹')) {
      return "Our properties range from ₹15,000/month for basic rentals to ₹100,000+/month for luxury properties. For buying, prices start from ₹25,00,000 and go up to ₹5,00,00,000+. Would you like me to show you properties in a specific price range?";
    }
    
    if (input.includes('location') || input.includes('area') || input.includes('where')) {
      return "We have properties across major Indian cities including Mumbai, Bangalore, Delhi NCR, Chennai, Hyderabad, and Pune. Each location offers different advantages - Mumbai for business, Bangalore for tech, Delhi for culture. Which city interests you?";
    }
    
    if (input.includes('rent') || input.includes('rental')) {
      return "We offer flexible rental options: daily (₹1,000-5,000), weekly (₹5,000-25,000), monthly (₹15,000-100,000+), and yearly (₹150,000-1,200,000+). All rentals include ID verification and digital contracts. What duration are you looking for?";
    }
    
    if (input.includes('buy') || input.includes('purchase') || input.includes('sale')) {
      return "Buying with Destiny includes: property verification, legal assistance, financing options, and secure transactions. We handle everything from viewing to possession. Properties start from ₹25,00,000. Would you like to see available properties for sale?";
    }
    
    if (input.includes('construction') || input.includes('build') || input.includes('custom')) {
      return "Our construction services include custom home design, land development, and renovation. We have 25+ pre-designed models and can create custom designs. The process includes 70% advance payment and professional project management. Interested in building your dream home?";
    }
    
    if (input.includes('verification') || input.includes('verify') || input.includes('id')) {
      return "Our verification process includes: ID verification, credit score checks, background verification, and property inspection. This ensures safety for all users. The process takes 24-48 hours and is mandatory for all transactions. Need help with verification?";
    }
    
    if (input.includes('payment') || input.includes('pay') || input.includes('money')) {
      return "We offer secure payment options: credit/debit cards, net banking, UPI, and EMI for larger amounts. For rentals: 50% advance, 50% before leaving. For construction: 70% advance, 30% upon completion. All payments are secure and transparent.";
    }
    
    if (input.includes('help') || input.includes('support') || input.includes('assist')) {
      return "I'm here to help! I can assist with property search, booking guidance, verification processes, payment options, and general queries. You can also contact our 24/7 support team at +91-1800-DESTINY or support@destiny.com. What specific help do you need?";
    }
    
    return "Thank you for your message! I'm here to help with all your real estate needs. You can ask me about properties, rentals, buying/selling, construction services, or any other real estate queries. Feel free to select from the quick options above for faster assistance!";
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center text-xl">
              <Bot className="w-6 h-6 mr-3" />
              Destiny AI Assistant
            </CardTitle>
            <p className="text-blue-100 text-sm">Your intelligent real estate companion</p>
          </CardHeader>
          
          <CardContent className="p-0">
            {/* Chat Messages */}
            <ScrollArea ref={scrollRef} className="h-96 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-xs lg:max-w-md ${message.isBot ? 'order-1' : 'order-2'}`}>
                      {message.isBot && (
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-2">
                            <Bot className="w-4 h-4 text-white" />
                          </div>
                          <Badge variant="secondary" className="text-xs">Destiny AI</Badge>
                        </div>
                      )}
                      
                      <div className={`p-3 rounded-lg ${
                        message.isBot 
                          ? 'bg-blue-50 border border-blue-200 text-gray-800' 
                          : 'bg-blue-600 text-white'
                      }`}>
                        <div className="whitespace-pre-line">{message.content}</div>
                        <div className={`text-xs mt-2 ${
                          message.isBot ? 'text-gray-500' : 'text-blue-100'
                        }`}>
                          {formatTime(message.timestamp)}
                        </div>
                      </div>
                      
                      {message.quickOptions && (
                        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {message.quickOptions.map((option, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              className="text-xs h-auto py-2 px-3 text-left justify-start bg-white hover:bg-blue-50 border-blue-200 hover:border-blue-300"
                              onClick={() => handleQuickOption(option)}
                            >
                              {option}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {!message.isBot && (
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center ml-2 order-1">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="max-w-xs lg:max-w-md">
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-2">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                        <Badge variant="secondary" className="text-xs">Destiny AI</Badge>
                      </div>
                      <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            
            {/* Input Area */}
            <div className="border-t border-gray-200 p-4 bg-gray-50 rounded-b-lg">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message or select from options above..."
                  className="flex-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                💡 Tip: Use the quick options above for faster responses, or type your own question!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChatPage;