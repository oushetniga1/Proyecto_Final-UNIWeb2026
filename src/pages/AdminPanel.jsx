import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, getDocs, updateDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { CheckCircle, Clock, AlertTriangle, Users } from 'lucide-react';

export default function AdminPanel() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('todos');

  const fetchIncidents = async () => {
    const q = query(collection(db, "incidentes"), orderBy("fechaCreacion", "desc"));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setIncidents(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  const updateStatus = async (id, newStatus) => {
    await updateDoc(doc(db, "incidentes", id), {
      estado: newStatus
    });
    fetchIncidents();
  };

  const filteredIncidents = filter === 'todos' 
    ? incidents 
    : incidents.filter(i => i.estado === filter);

  const getStatusIcon = (estado) => {
    switch(estado) {
      case 'Reportado': return <AlertTriangle className="text-orange-400" />;
      case 'En proceso': return <Clock className="text-blue-400" />;
      case 'Resuelto': return <CheckCircle className="text-emerald-400" />;
      default: return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-5xl font-bold">Panel de Administrador</h1>
          <p className="text-slate-400 mt-2">Gestión de Incidencias</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setFilter('todos')}>Todos</Button>
          <Button variant="outline" onClick={() => setFilter('Reportado')}>Reportados</Button>
          <Button variant="outline" onClick={() => setFilter('En proceso')}>En Proceso</Button>
          <Button variant="outline" onClick={() => setFilter('Resuelto')}>Resueltos</Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full"></div>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredIncidents.map((inc, index) => (
            <motion.div
              key={inc.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
            >
              <Card>
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="lg:w-80">
                    <img 
                      src={inc.imagenURL} 
                      alt="incidente" 
                      className="w-full h-64 object-cover rounded-3xl"
                    />
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(inc.estado)}
                      <span className="text-2xl font-bold">{inc.tipo}</span>
                    </div>

                    <p className="text-slate-300">{inc.descripcion}</p>

                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <Users size={18} />
                      <span>{inc.usuarioEmail}</span>
                    </div>

                    <p className="text-sm text-slate-400">📍 {inc.ubicacionTexto}</p>

                    {/* Cambiar Estado */}
                    <div className="flex gap-3 pt-4 border-t border-white/10">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => updateStatus(inc.id, 'Reportado')}
                        className={inc.estado === 'Reportado' ? 'bg-orange-500/20' : ''}
                      >
                        Reportado
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => updateStatus(inc.id, 'En proceso')}
                        className={inc.estado === 'En proceso' ? 'bg-blue-500/20' : ''}
                      >
                        En Proceso
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => updateStatus(inc.id, 'Resuelto')}
                        className={inc.estado === 'Resuelto' ? 'bg-emerald-500/20' : ''}
                      >
                        Resuelto
                      </Button>
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