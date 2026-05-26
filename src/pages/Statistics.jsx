import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import Card from '../components/common/Card';

const COLORS = ['#0ea5e9', '#22d3ee', '#eab308', '#22c55e'];

export default function Statistics() {
  const [stats, setStats] = useState({
    total: 0,
    porEstado: [],
    porTipo: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const snapshot = await getDocs(collection(db, "incidentes"));
      const incidents = snapshot.docs.map(doc => doc.data());

      // Total
      const total = incidents.length;

      // Por estado
      const porEstado = [
        { name: 'Reportado', value: incidents.filter(i => i.estado === 'Reportado').length },
        { name: 'En proceso', value: incidents.filter(i => i.estado === 'En proceso').length },
        { name: 'Resuelto', value: incidents.filter(i => i.estado === 'Resuelto').length },
      ];

      // Por tipo
      const tipos = {};
      incidents.forEach(i => {
        tipos[i.tipo] = (tipos[i.tipo] || 0) + 1;
      });
      const porTipo = Object.entries(tipos).map(([name, value]) => ({ name, value }));

      setStats({ total, porEstado, porTipo });
      setLoading(false);
    };

    fetchStats();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-5xl font-bold mb-12">Estadísticas Generales</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-3">
          <h2 className="text-3xl font-semibold mb-8">Incidentes por Estado</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.porEstado}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#0ea5e9" radius={12} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="lg:col-span-2">
          <h2 className="text-3xl font-semibold mb-8">Distribución por Tipo</h2>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={stats.porTipo}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={140}
                dataKey="value"
              >
                {stats.porTipo.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <div className="text-center py-12">
            <div className="text-7xl font-bold text-primary-400 mb-4">{stats.total}</div>
            <p className="text-2xl text-slate-400">Incidentes Totales</p>
          </div>
        </Card>
      </div>
    </div>
  );
}