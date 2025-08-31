import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Building, MapPin, Star, Users, Bed, Bath, Calendar, 
  CreditCard, FileText, Shield, CheckCircle, ArrowRight,
  Home, Hammer, DollarSign, Clock, User, Phone, Mail
} from 'lucide-react';
import { allProperties, getPropertyById } from '@/data/expandedProperties';
import type { ExpandedProperty } from '@/data/expandedProperties';

const CheckoutPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [property, setProperty] = useState<ExpandedProperty | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [verificationData, setVerificationData] = useState({
    phone: '',
    idType: '',
    idNumber: '',
    civilScore: '',
    creditScore: '',
    netWorth: '',
    monthlyIncome: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });
  const [contractData, setContractData] = useState({
    agreedToTerms: false,
    agreedToPrivacy: false,
    agreedToContract: false,
    signature: ''
  });
  const [rentalDuration, setRentalDuration] = useState<'day' | 'week' | 'month' | 'year'>('month');
  const [rentalDays, setRentalDays] = useState(30);

  useEffect(() => {
    console.log('CheckoutPage useEffect - id:', id, 'isAuthenticated:', isAuthenticated);
    
    if (!isAuthenticated) {
      console.log('User not authenticated, redirecting to login');
      navigate('/login');
      return;
    }

    if (id) {
      console.log('Looking for property with ID:', id);
      const foundProperty = getPropertyById(id);
      console.log('Found property:', foundProperty);
      
      if (foundProperty) {
        setProperty(foundProperty);
      } else {
        console.log('Property not found, redirecting to listings');
        navigate('/listings');
      }
    }
  }, [id, isAuthenticated, navigate]);

  if (!property) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold mb-2">Loading Property Details...</h2>
          <p className="text-muted-foreground">Please wait while we fetch the property information.</p>
        </div>
      </div>
    );
  }

  const isRental = property.duration !== 'sale';
  const totalSteps = isRental ? 1 : 3;
  const progress = (currentStep / totalSteps) * 100;

  const handleVerificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate verification process
    setTimeout(() => {
      setCurrentStep(2);
      setIsLoading(false);
    }, 2000);
  };

  const handleContractSign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contractData.agreedToTerms || !contractData.agreedToPrivacy || !contractData.agreedToContract) {
      alert('Please agree to all terms and conditions');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate contract signing
    setTimeout(() => {
      setCurrentStep(3);
      setIsLoading(false);
    }, 2000);
  };

  const handlePayment = () => {
    setIsLoading(true);
    
    // Simulate payment process
    setTimeout(() => {
      alert('Payment successful! Your booking has been confirmed.');
      navigate('/dashboard');
      setIsLoading(false);
    }, 2000);
  };

  const calculateRentalAmount = () => {
    if (!property) return 0;
    
    let baseAmount = property.price;
    let multiplier = 1;
    
    switch (rentalDuration) {
      case 'day':
        multiplier = rentalDays;
        break;
      case 'week':
        multiplier = rentalDays / 7;
        break;
      case 'month':
        multiplier = rentalDays / 30;
        break;
      case 'year':
        multiplier = rentalDays / 365;
        break;
    }
    
    return Math.round(baseAmount * multiplier);
  };

  const handleDurationChange = (duration: 'day' | 'week' | 'month' | 'year') => {
    setRentalDuration(duration);
    switch (duration) {
      case 'day':
        setRentalDays(1);
        break;
      case 'week':
        setRentalDays(7);
        break;
      case 'month':
        setRentalDays(30);
        break;
      case 'year':
        setRentalDays(365);
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-serif font-bold text-foreground">
              {isRental ? 'Rental Checkout' : 'Property Purchase'}
            </h1>
            <Badge variant="outline" className="text-lg px-4 py-2">
              Step {currentStep} of {totalSteps}
            </Badge>
          </div>
          <Progress value={progress} className="h-3" />
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span className={currentStep >= 1 ? 'text-primary font-medium' : ''}>ID Verification</span>
            <span className={currentStep >= 2 ? 'text-primary font-medium' : ''}>Contract Signing</span>
            {!isRental && <span className={currentStep >= 3 ? 'text-primary font-medium' : ''}>Payment & Confirmation</span>}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: ID Verification */}
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-blue-600" />
                    Identity Verification
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleVerificationSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          value={user?.name || ''}
                          readOnly
                          className="bg-muted"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={user?.email || ''}
                          readOnly
                          className="bg-muted"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={verificationData.phone}
                          onChange={(e) => setVerificationData(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="Enter your phone number"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="idType">ID Type</Label>
                        <Select value={verificationData.idType} onValueChange={(value) => setVerificationData(prev => ({ ...prev, idType: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select ID type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="aadhar">Aadhar Card</SelectItem>
                            <SelectItem value="pan">PAN Card</SelectItem>
                            <SelectItem value="passport">Passport</SelectItem>
                            <SelectItem value="driving-license">Driving License</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="idNumber">ID Number</Label>
                        <Input
                          id="idNumber"
                          value={verificationData.idNumber}
                          onChange={(e) => setVerificationData(prev => ({ ...prev, idNumber: e.target.value }))}
                          placeholder="Enter your ID number"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="civilScore">Civil Score (0-100)</Label>
                        <Input
                          id="civilScore"
                          type="number"
                          min="0"
                          max="100"
                          value={verificationData.civilScore}
                          onChange={(e) => setVerificationData(prev => ({ ...prev, civilScore: e.target.value }))}
                          placeholder="Enter your civil score"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="creditScore">Credit Score (300-900)</Label>
                          <Input
                            id="creditScore"
                            type="number"
                            min="300"
                            max="900"
                            value={verificationData.creditScore}
                            onChange={(e) => setVerificationData(prev => ({ ...prev, creditScore: e.target.value }))}
                            placeholder="Enter your credit score"
                            required
                          />
                      </div>
                      <div>
                        <Label htmlFor="netWorth">Net Worth (₹)</Label>
                        <Input
                          id="netWorth"
                          type="number"
                          value={verificationData.netWorth}
                          onChange={(e) => setVerificationData(prev => ({ ...prev, netWorth: e.target.value }))}
                          placeholder="Enter your net worth"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="monthlyIncome">Monthly Income (₹)</Label>
                        <Input
                          id="monthlyIncome"
                          type="number"
                          value={verificationData.monthlyIncome}
                          onChange={(e) => setVerificationData(prev => ({ ...prev, monthlyIncome: e.target.value }))}
                          placeholder="Enter your monthly income"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Textarea
                        id="address"
                        value={verificationData.address}
                        onChange={(e) => setVerificationData(prev => ({ ...prev, address: e.target.value }))}
                        placeholder="Enter your complete address"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={verificationData.city}
                          onChange={(e) => setVerificationData(prev => ({ ...prev, city: e.target.value }))}
                          placeholder="Enter your city"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          value={verificationData.state}
                          onChange={(e) => setVerificationData(prev => ({ ...prev, state: e.target.value }))}
                          placeholder="Enter your state"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="pincode">Pincode</Label>
                        <Input
                          id="pincode"
                          value={verificationData.pincode}
                          onChange={(e) => setVerificationData(prev => ({ ...prev, pincode: e.target.value }))}
                          placeholder="Enter pincode"
                          required
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full btn-hero" disabled={isLoading}>
                      {isLoading ? 'Verifying...' : 'Verify Identity & Continue'}
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
                    <FileText className="w-5 h-5 mr-2 text-green-600" />
                    Contract Signing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="bg-muted p-6 rounded-lg">
                      <h3 className="text-lg font-semibold mb-4">Contract Terms</h3>
                      <div className="space-y-3 text-sm">
                        <p>• This agreement is between {user?.name} and Destiny Real Estate</p>
                        <p>• Property: {property.title}</p>
                        <p>• Duration: {isRental ? 'As per rental agreement' : 'As per construction timeline'}</p>
                        <p>• Total Amount: ₹{isRental ? calculateRentalAmount().toLocaleString() : property.price.toLocaleString()}</p>
                        <p>• Payment Terms: 50% upfront, 50% upon completion</p>
                        <p>• Cancellation Policy: 7 days notice required</p>
                        <p>• Security Deposit: ₹{isRental ? '25,000' : '50,000'}</p>
                      </div>
                    </div>

                    <form onSubmit={handleContractSign} className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="terms" 
                            checked={contractData.agreedToTerms}
                            onCheckedChange={(checked) => setContractData(prev => ({ ...prev, agreedToTerms: checked as boolean }))}
                            required 
                          />
                          <Label htmlFor="terms">I agree to the Terms and Conditions</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="privacy" 
                            checked={contractData.agreedToPrivacy}
                            onCheckedChange={(checked) => setContractData(prev => ({ ...prev, agreedToPrivacy: checked as boolean }))}
                            required 
                          />
                          <Label htmlFor="privacy">I agree to the Privacy Policy</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="contract" 
                            checked={contractData.agreedToContract}
                            onCheckedChange={(checked) => setContractData(prev => ({ ...prev, agreedToContract: checked as boolean }))}
                            required 
                          />
                          <Label htmlFor="contract">I agree to sign this contract</Label>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="signature">Digital Signature</Label>
                        <Input
                          id="signature"
                          value={contractData.signature}
                          onChange={(e) => setContractData(prev => ({ ...prev, signature: e.target.value }))}
                          placeholder="Type your full name as signature"
                          required
                        />
                      </div>

                      <Button type="submit" className="w-full btn-hero" disabled={isLoading}>
                        {isLoading ? 'Signing Contract...' : 'Sign Contract & Continue'}
                      </Button>
                    </form>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Payment & Confirmation */}
            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="w-5 h-5 mr-2 text-purple-600" />
                    Payment & Confirmation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                      <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-green-800 mb-2">Contract Signed Successfully!</h3>
                      <p className="text-green-700">Your identity has been verified and contract has been signed.</p>
                    </div>

                    <div className="bg-muted p-6 rounded-lg">
                      <h3 className="text-lg font-semibold mb-4">Payment Summary</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Base Amount:</span>
                          <span>₹{isRental ? calculateRentalAmount().toLocaleString() : property.price.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Service Fee:</span>
                          <span>₹2,500</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Security Deposit:</span>
                          <span>₹{isRental ? '25,000' : '50,000'}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-semibold text-lg">
                          <span>Total:</span>
                          <span>₹{(isRental ? calculateRentalAmount() : property.price) + 27500}</span>
                        </div>
                      </div>
                    </div>

                    <Button onClick={handlePayment} className="w-full btn-hero" disabled={isLoading}>
                      {isLoading ? 'Processing Payment...' : 'Proceed to Payment'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Property Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Home className="w-5 h-5 mr-2" />
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
                  <Badge className="absolute top-2 left-2 bg-primary text-white">
                    {property.type}
                  </Badge>
                  {property.verified && (
                    <div className="absolute top-2 right-2">
                      <Shield className="w-5 h-5 text-green-600 bg-white rounded-full p-1" />
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">{property.title}</h3>
                  <p className="text-muted-foreground flex items-center mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    {property.location}, {property.city}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {property.guests} guests
                    </span>
                    <span className="flex items-center">
                      <Bed className="w-4 h-4 mr-1" />
                      {property.bedrooms} bed
                    </span>
                    <span className="flex items-center">
                      <Bath className="w-4 h-4 mr-1" />
                      {property.bathrooms} bath
                    </span>
                  </div>
                  <div className="flex items-center mb-3">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="font-medium">{property.rating}</span>
                    <span className="text-muted-foreground ml-1">({property.reviews} reviews)</span>
                  </div>
                </div>

                <Separator />

                {isRental && (
                  <div>
                    <h4 className="font-semibold mb-3">Rental Details</h4>
                    <div className="space-y-3">
                      <div>
                        <Label>Duration</Label>
                        <Select value={rentalDuration} onValueChange={(value: any) => handleDurationChange(value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="day">Daily</SelectItem>
                            <SelectItem value="week">Weekly</SelectItem>
                            <SelectItem value="month">Monthly</SelectItem>
                            <SelectItem value="year">Yearly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Number of Days</Label>
                        <Input
                          type="number"
                          value={rentalDays}
                          onChange={(e) => setRentalDays(parseInt(e.target.value) || 1)}
                          min="1"
                        />
                      </div>
                      <div className="bg-muted p-3 rounded-lg">
                        <div className="flex justify-between text-sm">
                          <span>Total Amount:</span>
                          <span className="font-semibold">₹{calculateRentalAmount().toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {!isRental && (
                  <div>
                    <h4 className="font-semibold mb-3">Purchase Details</h4>
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex justify-between text-sm">
                        <span>Property Price:</span>
                        <span className="font-semibold">₹{property.price.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm mt-2">
                        <span>Admin Fee (4%):</span>
                        <span className="font-semibold">₹{(property.price * 0.04).toLocaleString()}</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between font-semibold">
                        <span>Total:</span>
                        <span>₹{(property.price * 1.04).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}

                <Separator />

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Next Steps</h4>
                  <div className="space-y-2 text-sm text-blue-700">
                    {currentStep === 1 && (
                      <>
                        <p>• Complete identity verification</p>
                        <p>• Provide all required documents</p>
                        <p>• Wait for verification approval</p>
                      </>
                    )}
                    {currentStep === 2 && (
                      <>
                        <p>• Review contract terms</p>
                        <p>• Sign the contract digitally</p>
                        <p>• Proceed to payment</p>
                      </>
                    )}
                    {currentStep === 3 && (
                      <>
                        <p>• Complete payment</p>
                        <p>• Receive confirmation</p>
                        <p>• Property handover scheduled</p>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
