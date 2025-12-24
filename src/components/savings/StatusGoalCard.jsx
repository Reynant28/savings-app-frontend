import { motion } from "framer-motion";
import { Gift, Camera, Info, CircleX, PiggyBank } from "lucide-react";

export default function StatusGoalCard({ goals,  type, formatCurrency, openAddGoalModal }) {
    const statusStyles = {
        selesai: {
            title: "Achieved Goals",
            icon: <Gift size={22} className="text-green-500" />,
            icon2: <Gift className="w-12 h-12 text-[#7fa654]" />,
            badgeColor: "bg-green-500/20 border-green-500/20 text-green-200",
            dotColor: "bg-green-500",
            hoverBorder: "hover:border-green-500/30",
            hoverText: "group-hover:text-green-300",
            infoIcon: "text-green-400/60",
            label: "Achieved",
            dateLabel: (goal) => `Success Date: ${goal.tanggal_selesai || 'Completed'}`,
            emptyTitle: "You have no achieved goals yet.",
            emptyMessage: "Celebrate your milestones by achieving your savings goals. Start a new goal today!"

        },
        cancel: {
            title: "Canceled Goals",
            icon: <CircleX size={22} className="text-red-400" />,
            icon2: <CircleX className="w-12 h-12 text-[#7fa654]" />,
            badgeColor: "bg-red-500/20 border-red-500/20 text-red-200",
            dotColor: "bg-red-500",
            hoverBorder: "hover:border-red-500/30",
            hoverText: "group-hover:text-red-300",
            infoIcon: "text-red-400/60",
            label: "Canceled",
            dateLabel: () => "Stopped on request",
            emptyTitle: "You have no canceled goals.",
            emptyMessage: "Keep pushing forward! Your savings journey is just getting started. Create a new goal today."
        }
    };

    const currentStyles = statusStyles[type];

    return (
        goals.length > 0 ? (
            <div className="mt-8">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    {currentStyles.icon}
                    {currentStyles.title}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {goals.map((goal) => (
                        <motion.div
                        key={goal.id_tabungan}
                        whileHover={{ y: -5 }}
                        className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-[#504B38]/40 backdrop-blur-md transition-all ${currentStyles.hoverBorder}`}
                        >
                        {/* Image Area */}
                        <div className="relative h-54 w-full overflow-hidden">
                            {goal.photo_url ? (
                            <img
                                src={goal.photo_url}
                                alt={goal.nama_tabungan}
                                className="h-full w-full object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-500"
                            />
                            ) : (
                            <div className="flex h-full w-full items-center justify-center bg-white/5">
                                <Camera className="w-8 h-8 text-white/20" />
                            </div>
                            )}
                            
                            {/* Badge */}
                            <div className={`absolute top-3 right-3 flex items-center gap-1.5 rounded-full px-3 py-1 backdrop-blur-md border ${currentStyles.badgeColor}`}>
                            <div className={`h-1.5 w-1.5 rounded-full ${currentStyles.dotColor} animate-pulse`} />
                            <span className="text-[10px] font-bold uppercase tracking-wider">{currentStyles.label}</span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-5">
                            <h4 className={`mb-1 text-lg font-bold text-white transition-colors ${currentStyles.hoverText}`}>
                                {goal.nama_tabungan}
                            </h4>
                            
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-400">Target Nominal</span>
                                <span className="font-medium text-gray-200">{formatCurrency(goal.target_nominal)}</span>
                            </div>

                            <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-gray-400">
                                <Info size={14} className={currentStyles.infoIcon} />
                                <span>{currentStyles.dateLabel(goal)}</span>
                            </div>
                        </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        ) :
        goals.length === 0 && (
            <div className="mt-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-16 mb-8 rounded-[2.5rem] border border-white/10 bg-[#504B38]/20 backdrop-blur-xl shadow-2xl"
                >
                    <div className="w-24 h-24 bg-[#536a37]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        {currentStyles.icon2}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">{currentStyles.emptyTitle}</h3>
                    <p className="text-gray-400 mb-8 max-w-sm mx-auto">
                        {currentStyles.emptyMessage}
                    </p>
                    <button
                        onClick={openAddGoalModal}
                        className="px-8 py-3 bg-[#628141] text-white rounded-2xl font-bold hover:bg-[#7fa654] transition-all shadow-lg hover:shadow-[#7fa654]/20"
                    >
                        Create Your Goal
                    </button>
                </motion.div>
            </div>
        )
    );
}