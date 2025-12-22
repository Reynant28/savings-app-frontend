import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navigation from '../components/LandingNavigation';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Wallet } from 'lucide-react';
import { useAuth } from '../context/AuthContext'; // Import the hook
import { motion } from 'framer-motion';

const baseUrl = 'http://127.0.0.1:8000';

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth(); // Get login function from context
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setError(''); // Clear error on input change
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${baseUrl}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      if (data.status === 'success') {
        // Use the auth context login function
        login(data.token, formData.email);
        navigate('/dashboard');
      } else {
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#504B38] relative overflow-hidden">
      <Navigation />
      
      <div className="relative min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          
          {/* HEADER */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 mt-10">
            <div className="flex justify-center mb-3">
              <div className="w-16 h-16 rounded-2xl bg-[#536a37] flex items-center justify-center shadow-xl">
                <Wallet className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
            <p className="text-gray-400 mt-1 text-sm">Log in to track your savings</p>
          </motion.div>

          {/* Display error message */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-300 text-sm">
              {error}
            </div>
          )}

          {/* FORM */}
          <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-8 shadow-lg">
            <form onSubmit={handleLogin} className="space-y-5">
              <Input
                type="email"
                name="email"
                label="Email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <Input
                type="password"
                name="password"
                label="Password"
                placeholder="Enter your password"
                showPasswordToggle
                value={formData.password}
                onChange={handleChange}
                required
              />

              <Button
                type="submit"
                variant="primary"
                className="w-full py-3 text-base mt-2"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            {/* DIVIDER */}
            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-white bg-opacity-10" />
              <span className="text-gray-400 text-xs">or</span>
              <div className="flex-1 h-px bg-white bg-opacity-10" />
            </div>

            {/* FOOTER */}
            <p className="text-center text-sm text-gray-400">
              Don't have an account?{' '}
              <Link className="text-[#89b86a] font-semibold hover:text-[#9cca7a] transition-colors" to="/register">
                Sign up
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
