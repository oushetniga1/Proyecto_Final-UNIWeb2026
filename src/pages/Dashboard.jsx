import { motion } from 'framer-motion';
import Card from '../components/common/Card';
import { AlertTriangle, CheckCircle, Clock, Users } from 'lucide-react';
import "../pages/Dashboard.css";

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-5xl font-bold mb-2">Bienvenido a UniReport</h1>
        <p className="text-xl text-slate-400 mb-12">Reporta y sigue el estado de las incidencias de la universidad</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Card>
          <div className="flex items-center gap-4">
            <div className="p-4 bg-orange-500/10 rounded-2xl">
              <AlertTriangle className="text-orange-400" size={32} />
            </div>
            <div>
              <p className="text-4xl font-bold">24</p>
              <p className="text-slate-400">Reportados</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="p-4 bg-blue-500/10 rounded-2xl">
              <Clock className="text-blue-400" size={32} />
            </div>
            <div>
              <p className="text-4xl font-bold">12</p>
              <p className="text-slate-400">En Proceso</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="p-4 bg-emerald-500/10 rounded-2xl">
              <CheckCircle className="text-emerald-400" size={32} />
            </div>
            <div>
              <p className="text-4xl font-bold">68</p>
              <p className="text-slate-400">Resueltos</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="p-4 bg-purple-500/10 rounded-2xl">
              <Users className="text-purple-400" size={32} />
            </div>
            <div>
              <p className="text-4xl font-bold">142</p>
              <p className="text-slate-400">Total</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="text-center">
        <motion.a
          href="/report"
          whileHover={{ scale: 1.05 }}
          className="inline-block bg-gradient-to-r from-primary-600 to-cyan-500 text-white font-semibold text-xl px-12 py-5 rounded-3xl shadow-2xl"
        >
          Reportar Nueva Incidencia →
        </motion.a>
      </div>
    </div>
  );
}