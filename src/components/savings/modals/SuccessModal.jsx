import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";
import Button from "../../ui/Button";

export default function SuccessModal({ isOpen, onClose, message, title = "Success!" }) {

    const [timeLeft, setTimeLeft] = useState(3);

    useEffect(() => {
        if (isOpen) {
            // Reset timer to 3 
            setTimeLeft(3);

            // Interval to tick every second
            const timerInterval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);

            // Auto-close timeout
            const closeTimeout = setTimeout(() => {
                onClose();
            }, 3000);

            // Cleanup interval and timeout
            return () => {
                clearInterval(timerInterval);
                clearTimeout(closeTimeout);
            };
        }
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-[#504B38] p-8 shadow-2xl text-center"
                    >
                        {/* Decorative Background Glow */}
                        <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-[#7fa654]/20 blur-3xl" />

                        {/* Timer */}
                        <div className="absolute right-4 top-4 text-lg font-mono text-[#7fa654] bg-[#7fa654]/10 w-6 h-6 rounded-full flex items-center justify-center border border-[#7fa654]/20">
                            {timeLeft}
                        </div>

                        <div className="relative z-10">
                            {/* Icon Animation */}
                            <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                                transition={{ 
                                    delay: 0.2, 
                                    duration: 0.5, 
                                    ease: "easeOut" 
                                }}
                                className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#7fa654]/20 text-[#7fa654]"
                            >
                                <CheckCircle2 size={48} />
                            </motion.div>

                            <motion.h3
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.4 }}
                                className="mb-2 text-2xl font-bold text-white tracking-tight"
                            >
                                {title}
                            </motion.h3>


                            <motion.p
                             initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.4 }}
                                className="mb-8 text-gray-300"
                            >
                                {message}
                            </motion.p>

                            <Button
                                variant="card"
                                onClick={onClose}
                                className="w-full rounded-2xl py-4"
                            >
                                Awesome!
                            </Button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}