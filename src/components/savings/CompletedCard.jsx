import { motion } from "framer-motion";
import { Gift } from "lucide-react";

export default function CompletedCard( { completedGoals, formatCurrency } ) {
    return (
        completedGoals.length > 0 && (
            <div className="mt-8">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Gift size={22} className="text-green-500" />
                Achieved Goals
                </h3>
                <motion.div 
                animate={{ scale: [0.95, 1], opacity: [0, 1] }}
                transition={{ duration: 0.5 }}
                initial={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {completedGoals.map(goal => (
                    <div key={goal.id_tabungan} className="bg-green-500/10 backdrop-blur-sm rounded-xl p-5 border border-green-500/20">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                        <Gift className="w-5 h-5 text-green-400" />
                        </div>
                        <h4 className="font-semibold text-white">{goal.nama_tabungan}</h4>
                    </div>
                    <p className="text-sm text-gray-300 mb-2">Successfully completed!</p>
                    <p className="text-xs text-gray-400">Target: {formatCurrency(goal.target_nominal)}</p>
                    </div>
                ))}
                </motion.div>
            </div>
        )
    );
}