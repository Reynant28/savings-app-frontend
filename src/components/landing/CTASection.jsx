import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function CTASection() {
    return (
    <div className="py-24 text-center px-4">
        <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-3xl mx-auto p-12 rounded-[2rem] bg-linear-to-b from-[#628141] to-[#504B38] border border-white/20"
        >
            <h2 className="text-4xl font-bold text-white mb-6">Ready to start saving?</h2>
            <p className="text-white/80 mb-10 text-lg">Join thousands of users who are building their future today.</p>
            <Link to="/register" className="inline-block px-10 py-4 bg-white text-[#504B38] rounded-xl font-bold text-lg hover:bg-gray-100 transition-all">
            Create Your Account
            </Link>
        </motion.div>
        </div>
    );
}
export default CTASection;