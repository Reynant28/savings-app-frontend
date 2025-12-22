import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Button from "../ui/Button";
import { motion } from "framer-motion";

function HeroSection() {
  return (
    <div className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-20">
      <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white bg-opacity-10 rounded-full mb-6 backdrop-blur-sm">
          <span className="text-[#B9B28A] font-semibold text-sm">✨ Smart Savings Made Simple</span>
        </div>
        
        <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Take Control of<br />Your <span className="text-[#7fa654]">Financial Future</span>
        </h1>
        
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Track your savings, set goals, and achieve financial freedom with Savings App's intelligent money management system.
        </p>
        
        <div className="flex gap-4 justify-center">
          <Link to="/register">
            <Button variant="primary" className="px-8 py-4 text-lg flex items-center gap-2 transform ">
              Get Started Free <ChevronRight size={20} />
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="secondary" className="px-8 py-4 text-lg">
              Sign In
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default HeroSection;