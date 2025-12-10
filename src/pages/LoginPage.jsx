import { useState } from 'react';
import { Eye, EyeOff, Wallet } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = () => {
    console.log('Form submitted:', { email, password, rememberMe });
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#1B211A]">
        {/* Top Navigation */}
        <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-6 z-20">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#536a37] shadow-md">
                    <Wallet className="w-5 h-5 text-white" />
                </div>
                <span className="text-white text-xl font-bold">SaveTrack</span>
            </div>
            <div className="flex items-center gap-2 text-white text-sm">
                <button  
                    onClick={() => setShowPassword(!showPassword)}
                    className="w-full py-2 px-2 rounded-lg text-white bg-[#536a37] font-semibold text-sm shadow-lg hover:shadow-xl transform hover:scale-105 hover:bg-[#3e5229] hover:text-gray-300 transition-all duration-200">Sign Up</button>
            </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 min-h-screen flex flex-col items-center p-4">
            <div className="w-full max-w-sm grow flex flex-col justify-center">
                {/* Logo and Title */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg bg-[#628141]"> {/* Reduced size */}
                            <Wallet className="w-7 h-7 text-white" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Sign in</h1>
                    <p className="text-gray-300 text-xs">Sign in and start managing your savings!</p>
                </div>

                {/* Login Form */}
                <div className="space-y-3"> 
                    {/* Email Input */}
                    <div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:border-opacity-40 transition-all backdrop-blur-sm text-sm"
                            placeholder="Login"
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:border-opacity-40 transition-all backdrop-blur-sm pr-10 text-sm"
                            placeholder="Password"
                            required
                        />
                        <button
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-500 transition-colors"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    {/* Remember Me and Forgot Password */}
                    <div className="flex items-center justify-between text-xs">
                        <label className="flex items-center cursor-pointer">
                            <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="mr-2 rounded"
                            style={{ accentColor: '#628141' }}
                            />
                            <span className="text-white">Remember me</span>
                        </label>
                        <a href="#" className="hover:underline text-white">
                            Forgot password?
                        </a>
                    </div>

                    {/* Login Button */}
                    <button
                    onClick={handleSubmit}
                    className="w-full py-3 px-6 rounded-lg text-white bg-[#536a37] hover:bg-[#465b2e] font-semibold text-base shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                    >
                    Login
                    </button>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-auto py-6 w-full text-center text-gray-400 text-xs">
                <p>2024 © SaveTrack. All rights reserved.</p>
                <p className="mt-1">Designed by Lukasz Eutawski</p>
            </div>
        </div>
    </div>
  );
}