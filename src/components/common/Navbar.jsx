import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="
        sticky
        top-0
        z-50
        bg-slate-950/90
        backdrop-blur-xl
        border-b
        border-white/10
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          px-6
          py-5
          flex
          justify-between
          items-center
        "
      >

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-4"
        >
          <div
            className="
              w-12
              h-12
              rounded-2xl
              bg-gradient-to-br
              from-cyan-400
              to-blue-600
              flex
              items-center
              justify-center
              text-white
              text-2xl
              font-bold
            "
          >
            UR
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white">
              UniReport
            </h1>

            <p className="text-xs text-slate-400">
              Universidad de la Amazonia
            </p>
          </div>
        </Link>

        {/* Links */}
        <div className="flex gap-8 text-white">

          <Link
            to="/"
            className="hover:text-cyan-400 transition"
          >
            Inicio
          </Link>

          <Link
            to="/report"
            className="hover:text-cyan-400 transition"
          >
            Reportar
          </Link>

          <Link
            to="/my-incidents"
            className="hover:text-cyan-400 transition"
          >
            Mis Reportes
          </Link>

          <Link
            to="/statistics"
            className="hover:text-cyan-400 transition"
          >
            Estadísticas
          </Link>

          <Link
            to="/map"
            className="hover:text-cyan-400 transition"
          >
            Mapa
          </Link>
          
          <Link
            to="/admin"
            className="hover:text-cyan-400 transition"
          >
            Admin
          </Link>

        </div>

      </div>
    </motion.nav>
  );
}