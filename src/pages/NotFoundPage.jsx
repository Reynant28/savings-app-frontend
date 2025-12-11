// pages/NotFoundPage.jsx (More creative version)
import { Link } from 'react-router-dom';
import { Home, Compass, Search, AlertCircle } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#504B38] relative overflow-hidden">
        <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-2xl">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-linear-to-br from-[#628141]/20 to-[#536a37]/20 border border-white/10 mb-6">
                        <AlertCircle className="w-10 h-10 text-[#7fa654]" />
                    </div>
                    <h1 className="text-5xl font-bold text-white mb-2">
                        <span className="text-[#7fa654]">404</span> - Lost in the Woods
                    </h1>
                    <p className="text-gray-300 text-lg">
                        This page seems to have wandered off the beaten path
                    </p>
                    </div>
                    
                    {/* Content */}
                    <div className="grid md:grid-cols-2 gap-8 mb-10">
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                        <Search className="w-6 h-6 text-[#7fa654] mt-1 shrink-0" />
                        <div>
                            <h3 className="text-white font-semibold mb-1">Double-check the URL</h3>
                            <p className="text-gray-400 text-sm">
                            The address might have a typo or the page may have been moved.
                            </p>
                        </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                        <Compass className="w-6 h-6 text-[#7fa654] mt-1 shrink-0" />
                        <div>
                            <h3 className="text-white font-semibold mb-1">Need directions?</h3>
                            <p className="text-gray-400 text-sm">
                            Use our navigation to find what you're looking for.
                            </p>
                        </div>
                        </div>
                    </div>
                    
                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                        <li>
                            <Link to="/" className="text-[#89b86a] hover:text-[#9cca7a] transition-colors flex items-center gap-2">
                            <Home size={16} />
                            Homepage
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard" className="text-[#89b86a] hover:text-[#9cca7a] transition-colors">
                            Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to="/login" className="text-[#89b86a] hover:text-[#9cca7a] transition-colors">
                            Sign In
                            </Link>
                        </li>
                        <li>
                            <Link to="/register" className="text-[#89b86a] hover:text-[#9cca7a] transition-colors">
                            Create Account
                            </Link>
                        </li>
                        </ul>
                    </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4 justify-center">
                    <Link
                        to="/"
                        className="px-6 py-3 rounded-xl text-white bg-linear-to-r from-[#628141] to-[#536a37] hover:from-[#536a37] hover:to-[#3e5229] font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                        Back to Home
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="px-6 py-3 rounded-xl text-white border border-white/30 hover:bg-white/10 font-semibold transition-colors duration-200"
                    >
                        Go Back
                    </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}