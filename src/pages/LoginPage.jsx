import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navigation from '../components/LandingNavigation';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Wallet } from 'lucide-react';

const baseUrl = 'http://127.0.0.1:8000';

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

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
        localStorage.setItem('auth_token', data.token);
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#504B38] relative overflow-hidden">

      <Navigation />

      <div className="relative min-h-screen flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          
          {/* HEADER */}
          <div className="text-center mb-10 mt-10">
            <div className="flex justify-center mb-3">
              <div className="w-16 h-16 rounded-2xl bg-[#536a37] flex items-center justify-center shadow-xl">
                <Wallet className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
            <p className="text-gray-400 mt-1 text-sm">Log in to track your savings</p>
          </div>

          {/* FORM */}
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

            <div className="flex items-center justify-between text-sm mt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 accent-[#7fa654] rounded"
                />
                <span className="text-gray-300">Remember me</span>
              </label>

              <Link className="text-[#89b86a] hover:text-[#9cca7a] transition-colors">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="gradient"
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

        </div>
      </div>
    </div>
  );
}

export default LoginPage;
