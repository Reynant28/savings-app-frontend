import { motion } from "framer-motion";
import { X, Plus, Save, Upload, LoaderCircle } from "lucide-react";

export default function GoalsModal({ showGoalModal, setShowGoalModal, editingGoal, formData, setFormData, handleSubmitGoal, addLoading }) {
    return (
        showGoalModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
        >
          <form
            onSubmit={handleSubmitGoal}
            className="bg-[#1a1a1a] rounded-2xl p-6 max-w-md w-full border border-white/10 shadow-2xl"
          >
              {/* HEADER */}
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/10">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {editingGoal ? "✏️ Edit Goal" : "🎯 Create New Goal"}
                  </h2>
                  <p className="text-gray-400 text-sm mt-1">
                    {editingGoal ? "Update your savings goal details" : "What are you saving for?"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowGoalModal(false)}
                  className="text-gray-400 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors"
                  aria-label="Close modal"
                >
                  <X size={24} />
                </button>
              </div>

            {/* BODY */}
            <div className="space-y-4">
              {/* Goal Name */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Goal Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.nama_tabungan}
                  onChange={(e) =>
                    setFormData({ ...formData, nama_tabungan: e.target.value })
                  }
                  placeholder="e.g., New Laptop, Vacation, Emergency Fund"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#7fa654] focus:ring-2 focus:ring-[#7fa654]/30 transition-all"
                  required
                />
              </div>

              {/* Target Amount */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Target Amount <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    Rp
                  </span>
                  <input
                    type="number"
                    value={formData.target_nominal}
                    onChange={(e) =>
                      setFormData({ ...formData, target_nominal: e.target.value })
                    }
                    placeholder="0"
                    min="0"
                    step="1000"
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#7fa654] focus:ring-2 focus:ring-[#7fa654]/30 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Target Date */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Target Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.target_tanggal}
                  onChange={(e) =>
                    setFormData({ ...formData, target_tanggal: e.target.value })
                  }
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#7fa654] focus:ring-2 focus:ring-[#7fa654]/30 transition-all scheme-dark"
                  required
                />
              </div>

              {/* Inspiration Photo */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Inspiration Photo (Optional)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setFormData({ ...formData, photo_file: e.target.files?.[0] })
                    }
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    id="photo-upload"
                  />
                  <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:border-[#7fa654]/50 hover:text-white transition-colors">
                    <div className="flex items-center justify-center space-x-2">
                      <Upload size={20} />
                      <span>
                        {formData.photo_file ? formData.photo_file.name : "Choose an image..."}
                      </span>
                    </div>
                  </div>
                </div>
                {formData.photo_file && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-400">Selected: {formData.photo_file.name}</p>
                  </div>
                )}
              </div>

              {/* Current Status (if editing) */}
              {editingGoal && (
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#7fa654] focus:ring-2 focus:ring-[#7fa654]/30 transition-all"
                  >
                    <option value="aktif">Aktif</option>
                    <option value="selesai">Selesai</option>
                    <option value="cancel">Cancel</option>
                  </select>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowGoalModal(false)}
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
                    type="submit"
                    className="flex-1 py-3 bg-[#628141] text-white rounded-xl font-semibold hover:bg-[#506934] focus:outline-gray-300/50 focus:outline-2 focus:outline-offset-1 drop-shadow-lg active:scale-[0.98] transition-all shadow-lg"
                  >
                    {editingGoal ? (
                      <>
                        <Save className="inline mr-2" size={18} />
                        Update Goal
                      </>
                    ) : (
                      <>
                        <Plus className="inline mr-2" size={18} />
                        Create Goal
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </form>
        </motion.div>
      )
    );
}