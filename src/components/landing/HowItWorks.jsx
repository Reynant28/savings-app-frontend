import { motion } from "framer-motion";

const steps = [
    { title: "Define Your Goal", desc: "Give it a name, target amount, and a deadline." },
    { title: "Deposit Regularly", desc: "Track every contribution with a single click." },
    { title: "Reach the Target", desc: "Watch your progress bar hit 100% and celebrate." }
];

export default function HowItWorks() {
    return (
        <div className="relative flex items-center justify-center px-4 py-20 pt-20">
            <div className="max-w-5xl mx-auto text-center px-4">
                <h2 className="text-3xl font-bold text-white mb-12">Your Path to Financial Freedom</h2>
                <div className="grid md:grid-cols-3 gap-12">
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="relative"
                        >
                            <div className="text-6xl font-black text-white/5 absolute -top-10 left-1/2 -translate-x-1/2">0{i + 1}</div>
                            <h4 className="text-[#7fa654] font-bold mb-2 uppercase tracking-widest text-sm">Step {i + 1}</h4>
                            <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                            <p className="text-gray-400">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}