import { motion } from "framer-motion";
import { PiggyBank, Plus, LogOut } from "lucide-react";

export default function SavingsHeader({ openAddGoalModal, handleLogout }) {
  return (
    <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5, delay: 0.2 }} 
        className="mb-8 p-5 bg-[#536a37] hover:bg-[#4d6233] shadow-lg sticky top-0 z-10 rounded-3xl border border-green-100/10 hover:border-green-100/30 hover:bg- transition-all">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#3e5229] bg-opacity-20 flex items-center justify-center">
                <PiggyBank className="w-7 h-7 text-white" />
            </div>

            <div>
                <h1 className="text-2xl font-bold text-white">My Savings</h1>
                <p className="text-sm text-gray-200">Keep growing your savings</p>
            </div>
            </div>

            <div className='flex justify-between gap-4'>
            <button
                onClick={openAddGoalModal}
                className="px-3 py-3 bg-white text-[#536a37] focus:outline-white focus:outline-2 focus:outline-offset-1 drop-shadow-lg rounded-xl font-semibold hover:bg-[#536a37] hover:text-white transition-all flex items-center gap-2 shadow-lg hover:shadow-xl active:scale-95"
            >
                <Plus size={20} />
                New Goal
            </button>

            <button
                onClick={() => handleLogout()}
                className="px-4 py-4 bg-red-600 text-white rounded-full font-semibold focus:outline-red-900 focus:outline-2 drop-shadow-lg hover:text-red-500 hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl active:scale-95">
                <LogOut size={20} />
            </button>
            </div>
        </div>
    </motion.div>
  );
}