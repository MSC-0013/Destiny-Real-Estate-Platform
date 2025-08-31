import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import {
  Home,
  Building,
  Hammer,
  Search,
  User,
  LogOut,
  Menu,
  X,
  Heart,
  MessageCircle,
  Bot,
  Settings,
  HelpCircle,
  MapPin,
  Shield
} from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Rentals', path: '/listings', icon: Building },
    { name: 'Buy/Sell', path: '/marketplace', icon: MapPin },
    { name: 'Construction', path: '/construction', icon: Hammer },
    { name: 'Neighborhoods', path: '/neighborhoods', icon: Search },
  ];

  return (
    <nav className="bg-background/95 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-serif font-bold text-gradient">
              Destiny
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-primary/10 text-primary border border-primary/20'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* AI Chat Assistant */}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => navigate('/chat')}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 border-0"
                >
                  <Bot className="w-4 h-4 mr-2" />
                  AI Assistant
                </Button>

                {/* Favorites */}
                <Button variant="ghost" size="sm" onClick={() => navigate('/favorites')}>
                  <Heart className="w-4 h-4" />
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div className="text-left hidden lg:block">
                        <div className="text-sm font-medium">{user?.name}</div>
                        <div className="flex items-center">
                          <Badge variant={user?.role === 'admin' ? 'destructive' : 'secondary'} className="text-xs">
                            {user?.role}
                          </Badge>
                          {user?.verified && (
                            <Shield className="w-3 h-3 ml-1 text-success" />
                          )}
                        </div>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-background border border-border z-50">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {
                      if (user?.role === 'admin') {
                        navigate('/admin-dashboard');
                      } else if (user?.role === 'landlord') {
                        navigate('/landlord-dashboard');
                      } else {
                        navigate('/tenant-dashboard');
                      }
                    }}>
                      <Building className="mr-2 h-4 w-4" />
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/settings')}>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/help')}>
                      <HelpCircle className="mr-2 h-4 w-4" />
                      Help Center
                    </DropdownMenuItem>
                    {isAdmin && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => navigate('/admin-dashboard')}>
                          <Shield className="mr-2 h-4 w-4" />
                          Admin Panel
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" onClick={() => navigate('/login')}>
                  Login
                </Button>
                <Button className="btn-hero" onClick={() => navigate('/register')}>
                  Sign Up
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              ))}
              
              {isAuthenticated ? (
                <div className="pt-4 border-t border-border">
                  <div className="px-3 py-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">{user?.name}</div>
                        <div className="flex items-center">
                          <Badge variant={user?.role === 'admin' ? 'destructive' : 'secondary'} className="text-xs">
                            {user?.role}
                          </Badge>
                          {user?.verified && (
                            <Shield className="w-3 h-3 ml-1 text-success" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        if (user?.role === 'admin') {
                          navigate('/admin-dashboard');
                        } else if (user?.role === 'landlord') {
                          navigate('/landlord-dashboard');
                        } else {
                          navigate('/tenant-dashboard');
                        }
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md w-full text-left"
                    >
                      <Building className="w-5 h-5 mr-3" />
                      Dashboard
                    </button>
                    <Link
                      to="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md"
                    >
                      <User className="w-5 h-5 mr-3" />
                      Profile
                    </Link>
                    <Link
                      to="/help"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md"
                    >
                      <HelpCircle className="w-5 h-5 mr-3" />
                      Help Center
                    </Link>
                    {isAdmin && (
                      <Link
                        to="/admin-dashboard"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md"
                      >
                        <Shield className="w-5 h-5 mr-3" />
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center px-3 py-2 text-base font-medium text-destructive hover:bg-muted/50 rounded-md w-full text-left"
                    >
                      <LogOut className="w-5 h-5 mr-3" />
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="pt-4 border-t border-border space-y-2">
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => {
                      navigate('/login');
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    className="btn-hero w-full"
                    onClick={() => {
                      navigate('/register');
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;