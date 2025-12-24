import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react"
import { Target, PiggyBank, Clock, Camera, Trash, Pencil, TrendingUp } from "lucide-react";
import Button from "../ui/Button";

export default function GoalsSection({ activeGoals, getGoalProgress, getDaysRemaining, formatCurrency, openAddGoalModal, openEditGoalModal, handleDeleteGoal, setSelectedGoal, setShowAddDepositModal }) {

    const [hoveredGoal, setHoveredGoal] = useState(null);

    return (
        <div className="mb-8">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#7fa654]/20 flex items-center justify-center shadow-inner">
                        <Target size={24} className="text-[#7fa654]" />
                    </div>
                    My Savings Goals
                    <span className="text-xs bg-white/10 px-3 py-1 rounded-full text-gray-400 font-medium">
                        {activeGoals.length} Active
                    </span>
                </h2>
            </div>

            {activeGoals.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-16 px-6 rounded-2xl border border-white/10 bg-[#504B38]/20 backdrop-blur-xl shadow-2xl"
                >
                    <div className="w-24 h-24 bg-[#536a37]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <PiggyBank className="w-12 h-12 text-[#7fa654]" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Start Your Savings Journey</h3>
                    <p className="text-gray-400 mb-8 max-w-sm mx-auto">
                        Turn your dreams into reality by tracking your progress one step at a time.
                    </p>
                    <button
                        onClick={openAddGoalModal}
                        className="px-8 py-3 bg-[#628141] text-white rounded-2xl font-bold hover:bg-[#7fa654] transition-all shadow-lg hover:shadow-[#7fa654]/20"
                    >
                        Create Your First Goal
                    </button>
                </motion.div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {activeGoals.map(goal => {
                            const { percentage, totalDeposit, remaining } = getGoalProgress(goal.id_tabungan, goal.target_nominal);
                            const daysLeft = getDaysRemaining(goal.target_tanggal);
                            const isUrgent = daysLeft < 30;
                            const isHovered = hoveredGoal === goal.id_tabungan;

                            return (
                                <motion.div
                                    layout
                                    key={goal.id_tabungan}
                                    whileHover={{ y: -6 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    onMouseEnter={() => setHoveredGoal(goal.id_tabungan)}
                                    onMouseLeave={() => setHoveredGoal(null)}
                                    className="group relative rounded-2xl border border-white/15 bg-[#504B38]/40 shadow-2xl overflow-hidden transition-all duration-300"
                                >
                                    {/* Header: Image and Overlay Actions */}
                                    <div className="relative h-54 overflow-hidden">
                                        {goal.photo_url ? (
                                            <img
                                                src={goal.photo_url}
                                                alt={goal.nama_tabungan}
                                                className="w-full h-full object-cover transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-[#536a37]/30 flex items-center justify-center">
                                                <Camera className="w-10 h-10 text-gray-500/50" />
                                            </div>
                                        )}
                                        
                                        {/* Action Buttons Floating */}
                                        <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
                                            <motion.button
                                                initial={{ opacity: 0, x: 20 }}
                                                // Use pointerEvents to disable the button when it's hidden
                                                animate={isHovered ? 
                                                    { opacity: 1, x: 0, pointerEvents: "auto" } : 
                                                    { opacity: 0, x: 20, pointerEvents: "none" }
                                                }
                                                transition={{ duration: 0.2 }}
                                                whileHover={{ scale: 1.1 }} 
                                                whileTap={{ scale: 0.9 }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    openEditGoalModal(goal);
                                                }}
                                                className="p-2.5 bg-black/40 backdrop-blur-md text-white hover:bg-white hover:text-black rounded-full shadow-lg transition-colors border border-white/10"
                                            >
                                                <Pencil size={16} />
                                            </motion.button>

                                            <motion.button 
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={isHovered ? 
                                                    { opacity: 1, x: 0, pointerEvents: "auto" } : 
                                                    { opacity: 0, x: 20, pointerEvents: "none" }
                                                }
                                                transition={{ duration: 0.2, delay: 0.05 }}
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteGoal(goal);
                                                }}
                                                className="p-2.5 bg-red-500/40 backdrop-blur-md text-white hover:bg-red-500 rounded-full shadow-lg transition-colors border border-white/10"
                                            >
                                                <Trash size={16} />
                                            </motion.button>
                                        </div>

                                        {/* Glassy Tag */}
                                        <div className="absolute bottom-4 left-4">
                                            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur-md border border-white/20 text-[10px] font-bold uppercase tracking-wider ${isUrgent ? 'bg-red-500/30 text-red-500' : 'bg-black/30 text-white'}`}>
                                                <Clock size={12} />
                                                {daysLeft} Days Left
                                            </div>
                                        </div>
                                    </div>

                                    {/* Body */}
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-xl font-bold text-white group-hover:text-[#7fa654] transition-colors line-clamp-1">
                                                {goal.nama_tabungan}
                                            </h3>
                                            <div className="flex flex-col items-end">
                                                <span className="text-xs text-gray-400">Progress</span>
                                                <span className="text-lg font-bold text-[#7fa654] leading-none">
                                                    {percentage.toFixed(0)}%
                                                </span>
                                            </div>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="relative w-full h-2.5 bg-white/5 rounded-full overflow-hidden mb-6">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${percentage}%` }}
                                                transition={{ duration: 1.5, ease: "circOut" }}
                                                className="h-full bg-linear-to-r from-[#536a37] to-[#7fa654] relative animate-pulse"
                                            >
                                            </motion.div>
                                        </div>

                                        {/* Stats Grid */}
                                        <div className="grid grid-cols-2 gap-4 mb-6 py-4 border-y border-white/5">
                                            <div>
                                                <p className="text-[10px] text-gray-400 uppercase tracking-tighter">Saved So Far</p>
                                                <p className="text-sm font-bold text-white">{formatCurrency(totalDeposit)}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] text-gray-400 uppercase tracking-tighter">Remaining</p>
                                                <p className="text-sm font-bold text-gray-300">Rp {remaining.toLocaleString()}</p>
                                            </div>
                                        </div>

                                        {/* Deposit Button */}
                                        <Button
                                            variant="card"
                                            onClick={() => {
                                                setSelectedGoal(goal);
                                                setShowAddDepositModal(true);
                                            }}
                                            className="w-full py-3 flex items-center justify-center gap-2"
                                        >
                                            <TrendingUp size={18} />
                                            Deposit Now
                                        </Button>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}