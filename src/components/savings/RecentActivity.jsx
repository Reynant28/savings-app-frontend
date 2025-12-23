import { motion } from "framer-motion";
import { TrendingUp, Wallet } from "lucide-react";

export default function RecentActivity( recentTransactions, goals, formatCurrency ) {
    return (
        recentTransactions.length > 0 && (
          <motion.div 
          animate={{ scale: [0.95, 1], opacity: [0, 1] }}
          transition={{ duration: 0.5 }}
          initial={{ opacity: 0 }}
          className="p-6 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-xl shadow-lg hover:border-gray-400/40 hover:bg-white/7  transition-all">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <TrendingUp size={22} className="text-[#7fa654]" />
                Recent Activity
              </h3>
              <span className="text-sm text-gray-400">Last 3 deposits</span>
            </div>
            <div className="space-y-4">
              {recentTransactions.map(transaction => {
                const goal = goals.find(g => g.id_tabungan === transaction.id_tabungan);
                return (
                  <div key={transaction.id_riwayat} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl transition-all">
                    <div className="w-10 h-10 rounded-lg bg-[#536a37]/20 flex items-center justify-center">
                      <Wallet className="w-5 h-5 text-[#7fa654]" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-white text-sm">{goal?.nama_tabungan || 'Savings Goal'}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(transaction.tanggal).toLocaleDateString('id-ID', {
                          weekday: 'short',
                          day: 'numeric',
                          month: 'short'
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-400 text-sm">+{formatCurrency(transaction.nominal)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )
    );
}