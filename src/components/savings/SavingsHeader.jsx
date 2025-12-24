import { motion } from "framer-motion";
import { Wallet, Plus, LogOut } from "lucide-react";

export default function SavingsHeader({ openAddGoalModal, handleLogout }) {
  return (
    <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5, delay: 0.2 }} 
        className="mb-8 p-4 md:p-5 bg-[#536a37] hover:bg-[#4d6233] shadow-lg sticky top-0 z-10 rounded-2xl md:rounded-3xl border border-green-100/10 transition-all">
        
        <div className="flex items-center justify-between">
            {/* Branding Section */}
            <div className="flex items-center gap-2 md:gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#3e5229]/20 flex items-center justify-center shrink-0">
                    <Wallet className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>

                <div>
                    <h1 className="text-lg md:text-2xl font-bold text-white leading-tight">Savings App</h1>
                    <p className="text-[10px] md:text-sm text-gray-200">Keep growing your savings</p>
                </div>
            </div>

            {/* Actions Section */}
            <div className='flex items-center gap-2 md:gap-4'>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={openAddGoalModal}
                    className="p-3 md:px-5 md:py-3 bg-white text-[#536a37] hover:bg-[#536a37] hover:text-white rounded-xl font-semibold flex items-center gap-2 shadow-lg transition-all"
                >
                    <Plus size={20} />
                    <span className="hidden md:inline">New Goal</span>
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleLogout()}
                    className="p-3 md:p-3 bg-red-600 text-white rounded-xl md:rounded-full font-semibold shadow-lg hover:bg-white hover:text-red-600 transition-all">
                    <LogOut size={20} />
                </motion.button>
            </div>
        </div>
    </motion.div>
  );
}