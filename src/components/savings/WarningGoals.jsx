import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

export default function WarningGoals({ urgentGoals, getDaysRemaining, getGoalProgress, setSelectedGoal, setShowAddDepositModal }) {
    return (
        urgentGoals.length > 0 && (
          <motion.div 
          initial={{ opacity: 0}}
          animate={{ scale: [0.95, 1], opacity: [0, 1] }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 relative rounded-2xl p-6 border border-red-500/10 bg-red-500/10 backdrop-blur-xl shadow-lg hover:border-red-500/30 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="text-red-400" size={24} />
              <h2 className="text-xl font-bold text-white">Needs Attention</h2>
            </div>
            <p className="text-gray-300 mb-4">These goals are approaching their deadline:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {urgentGoals.slice(0, 4).map(goal => {
                const daysLeft = getDaysRemaining(goal.target_tanggal);
                const { remaining } = getGoalProgress(
                  goal.id_tabungan,
                  goal.target_nominal
                );

                return (
                  <div key={goal.id_tabungan} className="bg-white/5 p-4 rounded-xl transition-all">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-white">{goal.nama_tabungan}</h3>
                      <span className="text-red-400 text-sm font-medium">{daysLeft} days left</span>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedGoal(goal);
                        setShowAddDepositModal(true);
                      }}
                      className="mt-2 text-sm px-3 py-1.5 bg-[#536a37] focus:outline-gray-300/20 focus:outline-2 focus:outline-offset-1 drop-shadow-lg text-white rounded-lg hover:bg-[#3e5229] transition-all"
                      disabled={remaining === 0}
                    >
                      Add Deposit
                    </button>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )
    );
}