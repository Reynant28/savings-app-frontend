import { motion } from "framer-motion";
import { Target, Gift, Clock } from "lucide-react";

export default function StatsCard({ activeGoals, completedGoals, urgentGoals }) {
    return (
        activeGoals.length > 0 && (
          <motion.div 
          initial={{ opacity: 0 }}
          animate={{ scale: [0.95, 1], opacity: [0, 1] }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-gray-400/40 hover:bg-white/7 shadow-lg transition-all">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#3e5229] bg-opacity-20 flex items-center justify-center">
                  <Target className="w-6 h-6 text-[#7fa654]" />
                </div>
                <div>
                  <p className="text-sm text-white">Active Goals</p>
                  <p className="text-2xl font-bold text-white">{activeGoals.length}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#3e5229] bg-opacity-20 flex items-center justify-center">
                  <Gift className="w-6 h-6 text-[#7fa654]" />
                </div>
                <div>
                  <p className="text-sm text-white">Completed</p>
                  <p className="text-2xl font-bold text-white">{completedGoals.length}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#3e5229] bg-opacity-20 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <p className="text-sm text-white">Urgent</p>
                  <p className="text-2xl font-bold text-white">{urgentGoals.length}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )
    );
}