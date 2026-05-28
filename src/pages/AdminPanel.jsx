import { useEffect, useState } from 'react';

import {
  collection,
  getDocs,
  query,
  orderBy,
  updateDoc,
  doc
} from 'firebase/firestore';

import { db } from '../firebase/config';

export default function AdminPanel() {

  const [incidents, setIncidents] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchIncidents = async () => {

    try {

      const q = query(

        collection(db, 'incidentes'),

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

  useEffect(() => {

    fetchIncidents();

  }, []);

  const changeStatus = async (
    id,
    estado
  ) => {

    try {

      await updateDoc(

        doc(db, 'incidentes', id),

        {
          estado
        }

      );

      fetchIncidents();

    } catch (error) {

      console.error(error);

    }
  };

  if (loading) {

    return (
      <div className="text-center py-20">
        Cargando incidencias...
      </div>
    );
  }

  return (

    <div className="max-w-7xl mx-auto px-6 py-12">

      <h1 className="text-5xl font-bold mb-10">
        Panel Administrador
      </h1>

      <div className="grid gap-6">

        {
          incidents.map((inc) => (

            <div
              key={inc.id}
              className="bg-slate-900 border border-white/10 rounded-3xl p-6"
            >

              <div className="flex justify-between items-center mb-4">

                <div>

                  <h2 className="text-3xl font-bold">
                    {inc.tipo}
                  </h2>

                  <p className="text-slate-400 mt-1">
                    {inc.usuarioEmail}
                  </p>

                </div>

                <span className="bg-blue-500/20 text-blue-400 px-4 py-2 rounded-xl">
                  {inc.estado}
                </span>

              </div>

              <p className="text-slate-300 mb-4">
                {inc.descripcion}
              </p>

              <p className="text-slate-400 mb-5">
                📍 {inc.ubicacionTexto}
              </p>

              {
                inc.imagenURL && (

                  <img
                    src={inc.imagenURL}
                    alt="incidente"
                    className="rounded-2xl w-full max-h-96 object-cover mb-6"
                  />

                )
              }

              <div className="flex gap-4 flex-wrap">

                <button
                  onClick={() =>
                    changeStatus(
                      inc.id,
                      'Reportado'
                    )
                  }
                  className="bg-orange-500 px-5 py-3 rounded-2xl"
                >
                  Reportado
                </button>

                <button
                  onClick={() =>
                    changeStatus(
                      inc.id,
                      'En proceso'
                    )
                  }
                  className="bg-blue-500 px-5 py-3 rounded-2xl"
                >
                  En proceso
                </button>

                <button
                  onClick={() =>
                    changeStatus(
                      inc.id,
                      'Resuelto'
                    )
                  }
                  className="bg-emerald-500 px-5 py-3 rounded-2xl"
                >
                  Resuelto
                </button>

              </div>

            </div>
          ))
        }

      </div>

    </div>
  );
}