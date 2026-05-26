import { motion } from 'framer-motion';

export default function Card({ children, className = "", ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      className={`bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}