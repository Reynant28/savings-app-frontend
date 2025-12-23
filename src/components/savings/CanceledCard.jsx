import { CircleX } from "lucide-react";

export default function CanceledGoals({ canceledGoals, formatCurrency }) {
    return (
        canceledGoals.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <CircleX size={22} className="text-red-500" />
              Canceled Goals
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {canceledGoals.map(goal => (
                <div key={goal.id_tabungan} className="bg-red-500/10 backdrop-blur-sm rounded-xl p-5 border border-red-500/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                      <CircleX className="w-5 h-5 text-red-400" />
                    </div>
                    <h4 className="font-semibold text-white">{goal.nama_tabungan}</h4>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">Successfully canceled!</p>
                  <p className="text-xs text-gray-400">Target: {formatCurrency(goal.target_nominal)}</p>
                </div>
              ))}
            </div>
          </div>
        )
    );
}