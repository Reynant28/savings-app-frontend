import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Trash2, X } from "lucide-react";

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, title, loading }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/20 bg-[#1a1a1a] p-6 shadow-2xl backdrop-blur-xl"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>

          <div className="flex flex-col items-center text-center">
            {/* Warning Icon */}
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20 text-red-400">
              <AlertTriangle size={32} />
            </div>

            <h3 className="mb-2 text-xl font-bold text-white">Delete Goal?</h3>
            <p className="mb-6 text-gray-300">
              Are you sure you want to delete <span className="font-semibold text-white">"{title}"</span>? 
              This action cannot be undone and all transaction history for this goal will be lost.
            </p>

            <div className="flex w-full gap-3">
              <button
                onClick={onClose}
                className="flex-1 rounded-xl border border-white/10 bg-white/5 py-3 font-semibold text-white transition-all hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                disabled={loading}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-500 py-3 font-bold text-white transition-all hover:bg-red-600 active:scale-95 disabled:opacity-50"
              >
                {loading ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                ) : (
                  <>
                    <Trash2 size={18} />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}