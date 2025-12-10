import { TrendingUp, Shield, PiggyBank } from "lucide-react";

const features = [
  {
    icon: TrendingUp,
    title: "Track Progress",
    description: "Monitor your savings goals and watch your wealth grow in real-time.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your financial data is encrypted and protected with bank-level security.",
  },
  {
    icon: PiggyBank,
    title: "Smart Goals",
    description: "Set personalized savings goals and get insights to reach them faster.",
  },
];

function Features() {
  return (
    <div className="relative z-10 px-4 py-20">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-100 bg-opacity-5 backdrop-blur-sm p-8 rounded-2xl border border-white border-opacity-10 hover:bg-opacity-10 transition-all"
            >
              <div className="w-14 h-14 rounded-xl bg-linear-to-br from-[#628141] to-[#536a37] flex items-center justify-center mb-4 mx-auto">
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-600 mb-2">{feature.title}</h3>
              <p className="text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Features;