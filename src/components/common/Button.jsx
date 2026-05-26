import { motion } from 'framer-motion';

export default function Button({ children, variant = "primary", className = "", ...props }) {
  const base = "px-6 py-3.5 rounded-2xl font-semibold transition-all flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-500/50",
    outline: "border-2 border-primary-500 text-primary-400 hover:bg-primary-500/10",
    secondary: "bg-slate-700 hover:bg-slate-600 text-white"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}