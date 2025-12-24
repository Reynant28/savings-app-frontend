import { TrendingUp, Target, Clock } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Target,
    title: "Goal-Oriented Saving",
    description: "Create dedicated spaces for your dreams from new gadgets to emergency funds.",
  },
  {
    icon: Clock, 
    title: "Deadline Tracking",
    description: "Stay motivated with smart countdowns that show exactly how much time is left to reach your target.",
  },
  {
    icon: TrendingUp,
    title: "Visual Progress",
    description: "Detailed progress bars and deposit history keep you accountable every step of the way.",
  },
];

function Features() {
  return (
    <div className="relative z-10 px-4 py-20">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true, amount: 0.3 }}
              className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-opacity-10 transition-all"
            >
              <div className="w-14 h-14 rounded-xl bg-linear-to-br from-[#628141] to-[#536a37] flex items-center justify-center mb-4 mx-auto">
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white-600 mb-2">
                {feature.title}
              </h3>
              <p className="text-white-500">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Features;