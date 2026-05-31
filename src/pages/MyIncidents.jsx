import { useEffect, useState } from "react";

import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot
} from "firebase/firestore";

import { db } from "../firebase/config";

import { useAuth } from "../context/AuthContext";

import Card from "../components/common/Card";

export default function MyIncidents() {

  const { user } = useAuth();

  const [incidentes, setIncidentes] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (!user) return;

    const q = query(

      collection(db, "incidentes"),

      where("usuarioId", "==", user.uid),

      orderBy("fechaCreacion", "desc")

    );

    const unsubscribe = onSnapshot(

      q,

      (querySnapshot) => {

        const datos = [];

        querySnapshot.forEach((doc) => {

          datos.push({

            id: doc.id,
            ...doc.data()

          });

        });

        setIncidentes(datos);

        setLoading(false);

      },

      (error) => {

        console.error(error);

        setLoading(false);

      }

    );

    return () => unsubscribe();

  }

    , [user]);

  return (

    <div className="max-w-7xl mx-auto px-6 py-12">

      <h1 className="text-5xl font-bold mb-4">
        Mis Reportes
      </h1>

      <p className="text-slate-400 mb-12 text-lg">
        Aquí puedes ver todas las incidencias reportadas.
      </p>

      {loading ? (

        <p className="text-slate-400">
          Cargando reportes...
        </p>

      ) : incidentes.length === 0 ? (

        <Card>

          <div className="text-center py-10">

            <h2 className="text-2xl font-bold mb-3">
              No hay reportes
            </h2>

            <p className="text-slate-400">
              Aún no has creado incidencias.
            </p>

          </div>

        </Card>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

          {incidentes.map((incidente) => (

            <Card key={incidente.id}>

              {/* Imagen */}
              <img
                src={incidente.imagenURL}
                alt="Incidencia"
                className="
                  w-full
                  h-56
                  object-cover
                  rounded-2xl
                  mb-6
                "
              />

              {/* Tipo */}
              <div className="flex justify-between items-center mb-4">

                <h2 className="text-2xl font-bold">
                  {incidente.tipo}
                </h2>

                <span
                  className="
                    px-4
                    py-2
                    rounded-2xl
                    bg-cyan-500/20
                    text-cyan-400
                    text-sm
                  "
                >
                  {incidente.estado}
                </span>

              </div>

              {/* Descripción */}
              <p className="text-slate-300 mb-5">

                {incidente.descripcion}

              </p>

              {/* Ubicación */}
              <div className="mb-3">

                <p className="text-slate-500 text-sm">
                  Ubicación
                </p>

                <p className="font-medium">
                  {incidente.ubicacionTexto}
                </p>

              </div>

              {/* Fecha */}
              <div>

                <p className="text-slate-500 text-sm">
                  Fecha
                </p>

                <p className="font-medium">

                  {
                    incidente.fechaCreacion?.toDate
                      ? incidente.fechaCreacion
                        .toDate()
                        .toLocaleString()
                      : "Sin fecha"
                  }

                </p>

              </div>

            </Card>

          ))}

        </div>

      )}

    </div>

  );

}