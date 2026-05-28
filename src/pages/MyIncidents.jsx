import { useEffect, useState } from 'react';

import {
  collection,
  getDocs,
  query,
  where,
  orderBy
} from 'firebase/firestore';

import { db } from '../firebase/config';

import { useAuth } from '../context/AuthContext';

export default function MyIncidents() {

  const { user } = useAuth();

  const [incidents, setIncidents] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchIncidents = async () => {

      try {

        const q = query(

          collection(db, 'incidentes'),

          where('usuarioId', '==', user.uid),

          orderBy('fechaCreacion', 'desc')

        );

        const snapshot = await getDocs(q);

        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setIncidents(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }
    };

    if (user) {

      fetchIncidents();

    }

  }, [user]);

  if (loading) {

    return (
      <div className="text-center py-20">
        Cargando reportes...
      </div>
    );
  }

  return (

    <div className="max-w-6xl mx-auto px-6 py-12">

      <h1 className="text-5xl font-bold mb-10">
        Mis Reportes
      </h1>

      {
        incidents.length === 0
          ? (
            <p className="text-slate-400">
              No tienes reportes todavía.
            </p>
          )
          : (
            <div className="grid gap-6">

              {
                incidents.map((inc) => (

                  <div
                    key={inc.id}
                    className="bg-slate-900 border border-white/10 rounded-3xl p-6"
                  >

                    <div className="flex justify-between items-center mb-4">

                      <h2 className="text-2xl font-bold">
                        {inc.tipo}
                      </h2>

                      <span className="bg-blue-500/20 text-blue-400 px-4 py-2 rounded-xl">
                        {inc.estado}
                      </span>

                    </div>

                    <p className="text-slate-300 mb-4">
                      {inc.descripcion}
                    </p>

                    <p className="text-slate-400">
                      📍 {inc.ubicacionTexto}
                    </p>

                    {
                      inc.imagenURL && (

                        <img
                          src={inc.imagenURL}
                          alt="incidente"
                          className="mt-5 rounded-2xl w-full max-h-96 object-cover"
                        />

                      )
                    }

                  </div>
                ))
              }

            </div>
          )
      }

    </div>
  );
}