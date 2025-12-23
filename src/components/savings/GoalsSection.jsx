import { motion } from "framer-motion";
import { Target, PiggyBank, Clock, Camera, Trash, Pencil, Plus } from "lucide-react";

export default function GoalsSection({ activeGoals, getGoalProgress, getDaysRemaining, formatCurrency, openAddGoalModal, openEditGoalModal, handleDeleteGoal, setSelectedGoal, setShowAddDepositModal }) {
    return (
        <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <Target size={26} className="text-[#7fa654]" />
                    My Savings Goals
                    <span className="text-sm bg-white/10 px-3 py-1 rounded-full text-gray-300">
                        {activeGoals.length}
                    </span>
                </h2>
            </div>

            {activeGoals.length === 0 ? (
                <motion.div
                    animate={{ scale: [0.95, 1], opacity: [0, 1] }}
                    transition={{ duration: 0.5 }}
                    initial={{ opacity: 0 }}
                    className="text-center py-10 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-xl shadow-lg hover:border-gray-400/40 hover:bg-white/7 transition-all">
                    <PiggyBank className="w-20 h-20 text-white-500 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-white mb-3">Start Your Savings Journey</h3>
                    <p className="text-gray-400 mb-8 max-w-md mx-auto">
                        Create your first savings goal and start building your future, one step at a time
                    </p>
                    <button
                        onClick={openAddGoalModal}
                        className="px-8 py-3 bg-[#628141] text-white rounded-xl font-semibold hover:bg-[#536a37] transition-all shadow-lg hover:shadow-xl"
                    >
                        Create Your First Goal
                    </button>
                </motion.div>
            ) : (
                <motion.div
                    animate={{ scale: [0.95, 1], opacity: [0, 1] }}
                    transition={{ duration: 0.5 }}
                    initial={{ opacity: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {activeGoals.map(goal => {
                        const { totalDeposit, percentage, remaining } = getGoalProgress(goal.id_tabungan, goal.target_nominal);
                        const daysLeft = getDaysRemaining(goal.target_tanggal);
                        const isUrgent = daysLeft < 30;

                        return (
                            <div
                                key={goal.id_tabungan}
                                className={`p-6 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-xl shadow-lg hover:border-gray-400/40 hover:bg-white/7 transition-all"`}
                            >
                                <div className="flex items-start gap-4 mb-6">
                                    {goal.photo_file ? (
                                        <img
                                            src={goal.photo_url}
                                            alt={goal.nama_tabungan}
                                            className="w-20 h-20 rounded-xl object-cover"
                                        />
                                    ) : (
                                        <div className="w-20 h-20 rounded-xl bg-[#536a37]/20 flex items-center justify-center">
                                            <Camera className="w-8 h-8 text-gray-400" />
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="text-xl font-bold text-white mb-1">{goal.nama_tabungan}</h3>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <span className={`flex items-center gap-1 ${isUrgent ? 'text-orange-400' : 'text-gray-400'}`}>
                                                        <Clock size={14} />
                                                        {daysLeft} days left
                                                    </span>
                                                    <span className="text-gray-600">•</span>
                                                    <span className="text-gray-400">
                                                        {new Date(goal.target_tanggal).toLocaleDateString('id-ID')}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-end gap-2">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => handleDeleteGoal(goal)}
                                                        className="px-2 py-2 text-red-500 rounded-lg hover:text-red-400 focus:outline-gray-300/20 focus:outline-2 focus:outline-offset-1 drop-shadow-lg transition-all text-sm font-medium"
                                                    >
                                                        <Trash size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => openEditGoalModal(goal)}
                                                        className="px-2 py-2 text-[#7ea053] rounded-lg hover:text-[#678745] focus:outline-gray-300/20 focus:outline-2 focus:outline-offset-1 drop-shadow-lg transition-all text-sm font-medium"
                                                    >
                                                        <Pencil size={18} />
                                                    </button>
                                                </div>
                                                {goal.status !== 'selesai' && (
                                                    <button
                                                        onClick={() => {
                                                            setSelectedGoal(goal);
                                                            setShowAddDepositModal(true);
                                                        }}
                                                        className="px-4 py-2 bg-[#536a37] text-white rounded-lg hover:bg-[#3e5229] focus:outline-gray-300/20 focus:outline-2 focus:outline-offset-1 drop-shadow-lg transition-all flex items-center gap-2 text-sm font-medium"
                                                    >
                                                        <Plus size={16} />
                                                        Deposit
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Progress */}
                                <div className="mb-5">
                                    <div className="flex justify-between text-sm mb-3">
                                        <div>
                                            <span className="text-gray-400">Progress • </span>
                                            <span className="text-white font-semibold">{percentage.toFixed(0)}%</span>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-green-400 font-bold">{formatCurrency(totalDeposit)}</div>
                                            <div className="text-xs text-gray-400">saved</div>
                                        </div>
                                    </div>
                                    <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
                                        <motion.div
                                            className="h-full bg-linear-to-r from-[#628141] to-[#7fa654] animate-pulse rounded-full transition-all duration-700"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${percentage}%` }}
                                            transition={{ duration: 1 }}
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                    <div>
                                        <p className="text-xs text-gray-400">Target</p>
                                        <p className="text-sm font-semibold text-white">{formatCurrency(goal.target_nominal)}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-300">
                                            Remaining: Rp {remaining.toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-gray-400">Daily needed</p>
                                        <p className="text-sm font-semibold text-white">
                                            {daysLeft > 0 ? formatCurrency((goal.target_nominal - totalDeposit) / daysLeft) : formatCurrency(0)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </motion.div>
            )}
        </div>
    );
}