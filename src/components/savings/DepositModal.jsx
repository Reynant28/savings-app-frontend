import { motion } from "framer-motion";
import { X, LoaderCircle } from "lucide-react";

export default function DepositModal({ showAddDepositModal, setShowAddDepositModal, selectedGoal, newDeposit, setNewDeposit, handleAddDeposit, addLoading }) {

    return (
        showAddDepositModal && selectedGoal && (
        <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
        className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-[#1a1a1a] rounded-2xl p-6 max-w-md w-full border border-white/10 shadow-2xl">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/10">
              <div>
                <h2 className="text-2xl font-bold text-white">🏦 Add Deposit</h2>
                <p className="text-gray-400 mt-1">Add to: <span className="text-white font-semibold">{selectedGoal.nama_tabungan}</span></p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddDepositModal(false)}
                className="text-gray-400 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors focus:outline-gray-300/50 focus:outline-2 focus:outline-offset-1 drop-shadow-lg"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>

            {/* BODY */}
            <div className="space-y-6">
              <div>
                <label className="block text-white text-sm font-medium mb-3">Amount to Deposit</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    Rp
                  </span>
                  <input
                    type="number"
                    value={newDeposit.nominal}
                    onChange={(e) => setNewDeposit({ ...newDeposit, nominal: e.target.value })}
                    placeholder="0"
                    min="0"
                    step="1000"
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#7fa654] focus:ring-2 focus:ring-[#7fa654]/30 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-3">Date</label>
                <input
                  type="date"
                  value={newDeposit.tanggal}
                  onChange={(e) => setNewDeposit({ ...newDeposit, tanggal: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#7fa654] focus:ring-2 focus:ring-[#7fa654]/30 transition-all"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddDepositModal(false)}
                  className="flex-1 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-medium hover:bg-white/10 focus:outline-gray-300/50 focus:outline-2 focus:outline-offset-1 drop-shadow-lg transition-colors"
                >
                  Cancel
                </button>
                {addLoading ? (
                  <div className="flex-1 py-3 bg-[#506934] text-white rounded-xl font-semibold flex items-center justify-center gap-3 cursor-not-allowed">
                    <LoaderCircle className="animate-spin" size={20} />
                    <span>Loading...</span>
                  </div>
                ) : (
                  <button
                    onClick={handleAddDeposit}
                    className="flex-1 py-3 bg-[#628141] text-white rounded-xl font-semibold hover:bg-[#506934] focus:outline-gray-300/50 focus:outline-2 focus:outline-offset-1 drop-shadow-lg active:scale-[0.98] transition-all shadow-lg"
                  >
                    Add Deposit
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )
    );
}