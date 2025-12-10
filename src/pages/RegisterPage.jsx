import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navigation from '../components/LandingNavigation';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Wallet } from 'lucide-react';

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

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    setIsLoading(true);

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
      if (data.status === 'success') {
        localStorage.setItem('auth_token', data.token);
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#504B38]">
      <Navigation />

      <div className="relative min-h-screen flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl bg-[#536a37]">
                <Wallet className="w-8 h-8 text-white" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-gray-400 text-sm">Start your savings journey today</p>
          </div>

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-12">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                variant="gradient"
                className="w-full py-3 text-base transform hover:scale-105"
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
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

        </div>
      </div>
    </div>
  );
}

export default RegisterPage;