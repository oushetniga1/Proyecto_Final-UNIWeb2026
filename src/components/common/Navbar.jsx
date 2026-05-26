import { motion } from 'framer-motion';
import { LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/report', label: 'Reportar' },
    { path: '/my-incidents', label: 'Mis Reportes' },
    { path: '/statistics', label: 'Estadísticas' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 glass border-b border-white/10 bg-slate-950/80 backdrop-blur-2xl"
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-white text-3xl font-bold tracking-tighter">UR</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">UniReport</h1>
            <p className="text-[10px] text-slate-500 -mt-1">Universidad de la Amazonia</p>
          </div>
        </div>

        {user && (
          <>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`transition hover:text-primary-400 ${location.pathname === link.path ? 'text-primary-400' : 'text-slate-300'}`}
                >
                  {link.label}
                </Link>
              ))}

              {user?.role === 'admin' && (
                <Link to="/admin" className="text-amber-400 hover:text-amber-300">Admin</Link>
              )}
            </div>

            <div className="hidden md:flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium">{user.email?.split('@')[0]}</p>
                <p className="text-xs text-slate-400 capitalize">{user.role || 'usuario'}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={logout}
                className="p-3 hover:bg-red-500/10 rounded-xl text-red-400 hover:text-red-500 transition"
              >
                <LogOut size={22} />
              </motion.button>
            </div>

            <button 
              onClick={() => setMenuOpen(!menuOpen)} 
              className="md:hidden text-white p-2"
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </>
        )}
      </div>

      {/* Mobile Menu */}
      {menuOpen && user && (
        <div className="md:hidden border-t border-white/10 bg-slate-950/95 backdrop-blur-xl px-6 py-6">
          <div className="flex flex-col gap-4 text-lg">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {user?.role === 'admin' && <Link to="/admin" className="text-amber-400">Panel Admin</Link>}
            <button onClick={logout} className="text-red-400 text-left">Cerrar Sesión</button>
          </div>
        </div>
      )}
    </motion.nav>
  );
}