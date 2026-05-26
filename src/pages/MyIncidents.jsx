import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../context/AuthContext';
import Card from '../components/common/Card';
import { Clock, CheckCircle, AlertTriangle } from 'lucide-react';

export default function MyIncidents() {
  const { user } = useAuth();
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  const getStatusColor = (estado) => {
    switch(estado) {
      case 'Reportado': return 'text-orange-400 bg-orange-500/10';
      case 'En proceso': return 'text-blue-400 bg-blue-500/10';
      case 'Resuelto': return 'text-emerald-400 bg-emerald-500/10';
      default: return 'text-slate-400';
    }
  };

  useEffect(() => {
    const fetchIncidents = async () => {
      if (!user) return;
      
      const q = query(
        collection(db, "incidentes"),
        where("usuarioId", "==", user.uid),
        orderBy("fechaCreacion", "desc")
      );
      
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setIncidents(data);
      setLoading(false);
    };

    fetchIncidents();
  }, [user]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-5xl font-bold mb-12">Mis Reportes</h1>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full"></div>
        </div>
      ) : incidents.length === 0 ? (
        <Card className="text-center py-20">
          <p className="text-2xl text-slate-400">Aún no tienes reportes</p>
          <a href="/report" className="text-primary-400 hover:underline mt-4 inline-block">Hacer primer reporte →</a>
        </Card>
      ) : (
        <div className="grid gap-6">
          {incidents.map((incidente, index) => (
            <motion.div
              key={incidente.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-64">
                    <img 
                      src={incidente.imagenURL} 
                      alt="incidente" 
                      className="w-full h-48 object-cover rounded-2xl"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${getStatusColor(incidente.estado)}`}>
                          {incidente.estado}
                        </span>
                        <h3 className="text-2xl font-bold mt-3">{incidente.tipo}</h3>
                      </div>
                      <p className="text-sm text-slate-400">
                        {incidente.fechaCreacion?.toDate?.().toLocaleDateString('es-CO')}
                      </p>
                    </div>

                    <p className="mt-4 text-slate-300 line-clamp-3">{incidente.descripcion}</p>

                    <div className="mt-6 flex items-center gap-2 text-sm text-slate-400">
                      <MapPin size={16} />
                      <span>{incidente.ubicacionTexto}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}