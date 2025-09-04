import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Home, User, Building, Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login, register, isAuthenticated, user } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const initialRole = searchParams.get('role') || 'tenant';

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: initialRole as 'tenant' | 'landlord' | 'buyer' | 'seller' | 'builder',
  });

  // Redirect authenticated users
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'admin') navigate('/admin-dashboard');
      else if (user.role === 'landlord') navigate('/landlord-dashboard');
      else navigate('/tenant-dashboard');
    }
  }, [isAuthenticated, user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      return toast({ title: 'Error', description: 'Please fill in all fields', variant: 'destructive' });
    }

    setIsLoading(true);
    try {
      const result = await login(loginData.email, loginData.password);
      toast({
        title: result.success ? 'Welcome back!' : 'Error',
        description: result.message,
        variant: result.success ? 'default' : 'destructive',
      });
    } catch {
      toast({ title: 'Error', description: 'Unexpected error occurred', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerData.name || !registerData.email || !registerData.password) {
      return toast({ title: 'Error', description: 'Please fill in all fields', variant: 'destructive' });
    }
    if (registerData.password !== registerData.confirmPassword) {
      return toast({ title: 'Error', description: 'Passwords do not match', variant: 'destructive' });
    }
    if (registerData.password.length < 6) {
      return toast({ title: 'Error', description: 'Password must be at least 6 characters', variant: 'destructive' });
    }

    setIsLoading(true);
    try {
      const result = await register(registerData);
      toast({
        title: result.success ? 'Account created!' : 'Error',
        description: result.message,
        variant: result.success ? 'default' : 'destructive',
      });
    } catch {
      toast({ title: 'Error', description: 'Unexpected error occurred', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <Home className="w-6 h-6 text-primary" />
            </div>
            <span className="text-2xl font-serif font-bold text-white">Destiny</span>
          </Link>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-serif">Welcome</CardTitle>
            <CardDescription>Sign in to your account or create a new one</CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="register">Sign Up</TabsTrigger>
              </TabsList>

              {/* Login */}
              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <InputGroup icon={<Mail />} placeholder="Email" value={loginData.email} onChange={(val) => setLoginData(prev => ({ ...prev, email: val }))} />
                  <PasswordInput showPassword={showPassword} setShowPassword={setShowPassword} value={loginData.password} onChange={(val) => setLoginData(prev => ({ ...prev, password: val }))} />
                  <Button type="submit" className="w-full btn-hero" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isLoading ? 'Signing In...' : 'Sign In'}
                  </Button>
                </form>
                <div className="text-center mt-2">
                  <Link to="/forgot-password" className="text-sm text-primary hover:underline">Forgot your password?</Link>
                </div>
              </TabsContent>

              {/* Register */}
              <TabsContent value="register" className="space-y-4">
                <form onSubmit={handleRegister} className="space-y-4">
                  <RoleSelector role={registerData.role} setRole={(role) => setRegisterData(prev => ({ ...prev, role }))} />
                  <InputGroup icon={<User />} placeholder="Full Name" value={registerData.name} onChange={(val) => setRegisterData(prev => ({ ...prev, name: val }))} />
                  <InputGroup icon={<Mail />} placeholder="Email" value={registerData.email} onChange={(val) => setRegisterData(prev => ({ ...prev, email: val }))} />
                  <PasswordInput showPassword={showPassword} setShowPassword={setShowPassword} value={registerData.password} onChange={(val) => setRegisterData(prev => ({ ...prev, password: val }))} placeholder="Password" />
                  <PasswordInput showPassword={showPassword} setShowPassword={setShowPassword} value={registerData.confirmPassword} onChange={(val) => setRegisterData(prev => ({ ...prev, confirmPassword: val }))} placeholder="Confirm Password" />
                  <Button type="submit" className="w-full btn-hero" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              By continuing, you agree to our <Link to="/terms" className="text-primary hover:underline">Terms</Link> and <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Link to="/" className="text-white/80 hover:text-white text-sm">← Back to home</Link>
        </div>
      </div>
    </div>
  );
};

// Reusable Input Group
const InputGroup = ({ icon, placeholder, value, onChange }: any) => (
  <div className="space-y-2">
    <div className="relative">
      <div className="absolute left-3 top-2.5">{icon}</div>
      <Input type="text" placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} className="pl-9" required />
    </div>
  </div>
);

// Password Input
const PasswordInput = ({ showPassword, setShowPassword, value, onChange, placeholder = "Password" }: any) => (
  <div className="space-y-2">
    <div className="relative">
      <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input type={showPassword ? "text" : "password"} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} className="pl-9 pr-9" required />
      <Button type="button" variant="ghost" size="sm" className="absolute right-1 top-1 h-7 w-7" onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </Button>
    </div>
  </div>
);

// Role Selector
const RoleSelector = ({ role, setRole }: any) => (
  <div className="space-y-2">
    <label className="text-sm font-medium">I am a...</label>
    <div className="grid grid-cols-2 gap-2">
      <Button type="button" variant={role === 'tenant' ? 'default' : 'outline'} className="justify-start" onClick={() => setRole('tenant')}>
        <User className="w-4 h-4 mr-2" /> Tenant
      </Button>
      <Button type="button" variant={role === 'landlord' ? 'default' : 'outline'} className="justify-start" onClick={() => setRole('landlord')}>
        <Building className="w-4 h-4 mr-2" /> Landlord
      </Button>
    </div>
  </div>
);

export default AuthPage;
