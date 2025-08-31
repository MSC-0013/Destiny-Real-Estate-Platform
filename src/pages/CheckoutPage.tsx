import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { 
  Building, 
  Calendar, 
  Users, 
  CreditCard, 
  FileText, 
  Shield, 
  CheckCircle, 
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Home,
  MapPin,
  Star,
  Clock,
  User,
  Phone,
  Mail,
  Camera,
  Upload,
  Download,
  Eye,
  EyeOff
} from 'lucide-react';
import { allProperties, getPropertyById } from '@/data/expandedProperties';

interface VerificationData {
  fullName: string;
  dateOfBirth: string;
  idType: 'aadhar' | 'pan' | 'passport' | 'drivingLicense';
  idNumber: string;
  idImage: File | null;
  selfie: File | null;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  occupation: string;
  monthlyIncome: string;
  creditScore: string;
  emergencyContact: string;
  emergencyPhone: string;
}

interface ContractData {
  startDate: string;
  endDate: string;
  duration: string;
  totalAmount: number;
  securityDeposit: number;
  advancePayment: number;
  remainingPayment: number;
  termsAccepted: boolean;
  privacyAccepted: boolean;
}

const CheckoutPage = () => {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [property, setProperty] = useState<any>(null);
  const [verificationData, setVerificationData] = useState<VerificationData>({
    fullName: '',
    dateOfBirth: '',
    idType: 'aadhar',
    idNumber: '',
    idImage: null,
    selfie: null,
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    occupation: '',
    monthlyIncome: '',
    creditScore: '',
    emergencyContact: '',
    emergencyPhone: ''
  });
  const [contractData, setContractData] = useState<ContractData>({
    startDate: '',
    endDate: '',
    duration: '',
    totalAmount: 0,
    securityDeposit: 0,
    advancePayment: 0,
    remainingPayment: 0,
    termsAccepted: false,
    privacyAccepted: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [verificationComplete, setVerificationComplete] = useState(false);
  const [contractSigned, setContractSigned] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (propertyId) {
      const foundProperty = getPropertyById(propertyId);
      if (foundProperty) {
        setProperty(foundProperty);
        // Pre-fill user data
        if (user) {
          setVerificationData(prev => ({
            ...prev,
            fullName: user.name || '',
            email: user.email || '',
            phone: user.phone || ''
          }));
        }
      } else {
        navigate('/listings');
      }
    }
  }, [propertyId, isAuthenticated, user, navigate]);

  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate verification process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setVerificationComplete(true);
    setCurrentStep(2);
    setIsLoading(false);
  };

  const handleContractSign = async () => {
    if (!contractData.termsAccepted || !contractData.privacyAccepted) {
      alert('Please accept all terms and conditions');
      return;
    }

    setIsLoading(true);
    
    // Simulate contract signing process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setContractSigned(true);
    setCurrentStep(3);
    setIsLoading(false);
  };

  const handlePayment = async () => {
    setIsLoading(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Redirect to success page
    navigate('/booking-success');
  };

  const calculateRentalAmount = (duration: string) => {
    if (!property) return 0;
    
    const basePrice = property.price;
    switch (duration) {
      case '1 month':
        return basePrice;
      case '3 months':
        return basePrice * 3 * 0.95; // 5% discount
      case '6 months':
        return basePrice * 6 * 0.90; // 10% discount
      case '1 year':
        return basePrice * 12 * 0.85; // 15% discount
      default:
        return basePrice;
    }
  };

  const handleDurationChange = (duration: string) => {
    const totalAmount = calculateRentalAmount(duration);
    const securityDeposit = totalAmount * 0.1; // 10% security deposit
    const advancePayment = totalAmount * 0.5; // 50% advance
    const remainingPayment = totalAmount - advancePayment;

    setContractData(prev => ({
      ...prev,
      duration,
      totalAmount,
      securityDeposit,
      advancePayment,
      remainingPayment
    }));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (!property || !isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className={`flex items-center ${currentStep >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}>
                {currentStep > 1 ? <CheckCircle className="w-5 h-5" /> : '1'}
              </div>
              <span className="font-medium">ID Verification</span>
            </div>
            
            <div className={`flex items-center ${currentStep >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}>
                {currentStep > 2 ? <CheckCircle className="w-5 h-5" /> : '2'}
              </div>
              <span className="font-medium">Contract Signing</span>
            </div>
            
            <div className={`flex items-center ${currentStep >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}>
                3
              </div>
              <span className="font-medium">Payment</span>
            </div>
          </div>
          
          <Progress value={(currentStep / 3) * 100} className="h-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Property Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="w-5 h-5 mr-2" />
                  Property Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <img 
                    src={property.image} 
                    alt={property.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <Badge className="absolute top-2 right-2 bg-green-600">
                    Verified
                  </Badge>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg">{property.title}</h3>
                  <p className="text-gray-600 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {property.location}, {property.city}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2 text-gray-500" />
                    {property.bedrooms} BHK
                  </div>
                  <div className="flex items-center">
                    <Home className="w-4 h-4 mr-2 text-gray-500" />
                    {property.area} sq ft
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-2 text-gray-500" />
                    {property.rating} ({property.reviews} reviews)
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-gray-500" />
                    {property.duration}
                  </div>
                </div>
                
                <Separator />
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {formatCurrency(property.price)}
                  </div>
                  <div className="text-sm text-gray-500">per {property.duration}</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: ID Verification */}
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Identity Verification
                  </CardTitle>
                  <p className="text-gray-600">
                    Please provide your identification details for verification. This is required for all property rentals.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleVerificationSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          value={verificationData.fullName}
                          onChange={(e) => setVerificationData(prev => ({ ...prev, fullName: e.target.value }))}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                        <Input
                          id="dateOfBirth"
                          type="date"
                          value={verificationData.dateOfBirth}
                          onChange={(e) => setVerificationData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="idType">ID Type *</Label>
                        <Select
                          value={verificationData.idType}
                          onValueChange={(value: any) => setVerificationData(prev => ({ ...prev, idType: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="aadhar">Aadhar Card</SelectItem>
                            <SelectItem value="pan">PAN Card</SelectItem>
                            <SelectItem value="passport">Passport</SelectItem>
                            <SelectItem value="drivingLicense">Driving License</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="idNumber">ID Number *</Label>
                        <Input
                          id="idNumber"
                          value={verificationData.idNumber}
                          onChange={(e) => setVerificationData(prev => ({ ...prev, idNumber: e.target.value }))}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={verificationData.phone}
                          onChange={(e) => setVerificationData(prev => ({ ...prev, phone: e.target.value }))}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={verificationData.email}
                          onChange={(e) => setVerificationData(prev => ({ ...prev, email: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="address">Complete Address *</Label>
                      <Textarea
                        id="address"
                        value={verificationData.address}
                        onChange={(e) => setVerificationData(prev => ({ ...prev, address: e.target.value }))}
                        required
                        rows={3}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          value={verificationData.city}
                          onChange={(e) => setVerificationData(prev => ({ ...prev, city: e.target.value }))}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="state">State *</Label>
                        <Input
                          id="state"
                          value={verificationData.state}
                          onChange={(e) => setVerificationData(prev => ({ ...prev, state: e.target.value }))}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="pincode">Pincode *</Label>
                        <Input
                          id="pincode"
                          value={verificationData.pincode}
                          onChange={(e) => setVerificationData(prev => ({ ...prev, pincode: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="occupation">Occupation *</Label>
                        <Input
                          id="occupation"
                          value={verificationData.occupation}
                          onChange={(e) => setVerificationData(prev => ({ ...prev, occupation: e.target.value }))}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="monthlyIncome">Monthly Income *</Label>
                        <Input
                          id="monthlyIncome"
                          value={verificationData.monthlyIncome}
                          onChange={(e) => setVerificationData(prev => ({ ...prev, monthlyIncome: e.target.value }))}
                          placeholder="₹"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="creditScore">Credit Score (if known)</Label>
                        <Input
                          id="creditScore"
                          value={verificationData.creditScore}
                          onChange={(e) => setVerificationData(prev => ({ ...prev, creditScore: e.target.value }))}
                          placeholder="300-900"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="emergencyContact">Emergency Contact Name *</Label>
                        <Input
                          id="emergencyContact"
                          value={verificationData.emergencyContact}
                          onChange={(e) => setVerificationData(prev => ({ ...prev, emergencyContact: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="emergencyPhone">Emergency Contact Phone *</Label>
                      <Input
                        id="emergencyPhone"
                        type="tel"
                        value={verificationData.emergencyPhone}
                        onChange={(e) => setVerificationData(prev => ({ ...prev, emergencyPhone: e.target.value }))}
                        required
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" required />
                      <Label htmlFor="terms">
                        I agree to the terms and conditions and privacy policy
                      </Label>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Verifying...' : 'Submit Verification'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Contract Signing */}
            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Rental Agreement & Contract
                  </CardTitle>
                  <p className="text-gray-600">
                    Review and sign the rental agreement. Please read all terms carefully before proceeding.
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startDate">Start Date *</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={contractData.startDate}
                        onChange={(e) => setContractData(prev => ({ ...prev, startDate: e.target.value }))}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="duration">Rental Duration *</Label>
                      <Select
                        value={contractData.duration}
                        onValueChange={handleDurationChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1 month">1 Month</SelectItem>
                          <SelectItem value="3 months">3 Months</SelectItem>
                          <SelectItem value="6 months">6 Months</SelectItem>
                          <SelectItem value="1 year">1 Year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  {contractData.duration && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-3">Payment Breakdown</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Rental Amount ({contractData.duration}):</span>
                          <span>{formatCurrency(contractData.totalAmount)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Security Deposit (10%):</span>
                          <span>{formatCurrency(contractData.securityDeposit)}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-semibold">
                          <span>Total Amount:</span>
                          <span>{formatCurrency(contractData.totalAmount + contractData.securityDeposit)}</span>
                        </div>
                        <div className="flex justify-between text-blue-600">
                          <span>Advance Payment (50%):</span>
                          <span>{formatCurrency(contractData.advancePayment)}</span>
                        </div>
                        <div className="flex justify-between text-orange-600">
                          <span>Remaining Payment:</span>
                          <span>{formatCurrency(contractData.remainingPayment)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 text-blue-800">Important Terms</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• 50% advance payment required to confirm booking</li>
                      <li>• Remaining 50% to be paid before check-in</li>
                      <li>• Security deposit refundable after property inspection</li>
                      <li>• Early termination requires 30 days notice</li>
                      <li>• Property must be maintained in good condition</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="termsAccepted" 
                        checked={contractData.termsAccepted}
                        onCheckedChange={(checked) => setContractData(prev => ({ ...prev, termsAccepted: checked as boolean }))}
                      />
                      <Label htmlFor="termsAccepted">
                        I have read and agree to all terms and conditions
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="privacyAccepted" 
                        checked={contractData.privacyAccepted}
                        onCheckedChange={(checked) => setContractData(prev => ({ ...prev, privacyAccepted: checked as boolean }))}
                      />
                      <Label htmlFor="privacyAccepted">
                        I agree to the privacy policy and data processing
                      </Label>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setCurrentStep(1)}
                      className="flex-1"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>
                    
                    <Button 
                      onClick={handleContractSign}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      disabled={!contractData.termsAccepted || !contractData.privacyAccepted || isLoading}
                    >
                      {isLoading ? 'Signing Contract...' : 'Sign Contract'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Payment */}
            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Payment & Confirmation
                  </CardTitle>
                  <p className="text-gray-600">
                        Complete your payment to confirm your booking. Your advance payment of {formatCurrency(contractData.advancePayment)} is required.
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center text-green-800">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      <span className="font-semibold">Contract Successfully Signed!</span>
                    </div>
                    <p className="text-green-700 text-sm mt-1">
                      Your rental agreement has been processed. Please complete the payment to confirm your booking.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-3">Payment Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Advance Payment Required:</span>
                        <span className="font-semibold text-blue-600">{formatCurrency(contractData.advancePayment)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Remaining Payment:</span>
                        <span>{formatCurrency(contractData.remainingPayment)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Security Deposit:</span>
                        <span>{formatCurrency(contractData.securityDeposit)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        className="font-mono"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          maxLength={4}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="cardholderName">Cardholder Name</Label>
                      <Input
                        id="cardholderName"
                        placeholder="As printed on card"
                      />
                    </div>
                  </div>
                  
                  <div className="flex space-x-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setCurrentStep(2)}
                      className="flex-1"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>
                    
                    <Button 
                      onClick={handlePayment}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Processing Payment...' : `Pay ${formatCurrency(contractData.advancePayment)}`}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
