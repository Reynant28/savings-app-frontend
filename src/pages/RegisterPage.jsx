import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navigation from '../components/LandingNavigation';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Wallet } from 'lucide-react';
import { motion } from 'framer-motion';

const baseUrl = 'http://127.0.0.1:8000';


function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError('');
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        localStorage.setItem('auth_token', data.token);
        navigate('/dashboard');
      } else {
        // Handle Laravel Validation Errors (422 Unprocessable Entity)
        if (data.errors) {
          // Get the first error message from the email field if it exists
          if (data.errors.email) {
            setError(data.errors.email[0]);
          } else if (data.errors.username) {
            setError(data.errors.username[0]);
          } else {
            setError('Registration failed. Please check your data.');
          }
        } else {
          setError(data.message || 'Something went wrong');
        }
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#504B38]">
      <Navigation />

      <div className="relative min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-lg">

          {/* Header */}
          <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl bg-[#536a37]">
                <Wallet className="w-8 h-8 text-white" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-gray-400 text-sm">Start your savings journey today</p>
          </motion.div>

          {/* Display error message */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-300 text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-8 shadow-lg">
            <form onSubmit={handleRegister} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Choose a username"
                  label="Username"
                  required
                />

                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  label="Email"
                  required
                />

                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  label="Password"
                  showPasswordToggle
                  required
                />

                <Input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  label="Confirm Password"
                  showPasswordToggle
                  required
                />
              </div>

              {/* Button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full py-3 text-base transform transition-all"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </div>

              {/* DIVIDER */}
              <div className="flex items-center gap-4 my-8">
                <div className="flex-1 h-px bg-white bg-opacity-10" />
                <span className="text-gray-400 text-xs">or</span>
                <div className="flex-1 h-px bg-white bg-opacity-10" />
              </div>

              {/* Bottom link */}
              <div className="text-center text-sm text-gray-400">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-[#7fa654] hover:text-[#8bb964] font-semibold transition-colors"
                >
                  Sign in
                </Link>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;