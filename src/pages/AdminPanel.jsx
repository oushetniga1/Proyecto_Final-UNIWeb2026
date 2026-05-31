import { useEffect, useState } from "react";

import {
  collection,
  onSnapshot,
  query,
  orderBy,
  updateDoc,
  getDocs,
  doc
} from "firebase/firestore";

import {
  deleteDoc
} from "firebase/firestore";

import { db } from "../firebase/config";

import Card from "../components/common/Card";

export default function AdminPanel() {

  const [incidentes, setIncidentes] = useState([]);

  const [loading, setLoading] = useState(true);

  // CARGAR INCIDENTES
  const cargarIncidentes = async () => {

    try {

      const q = query(

        collection(db, "incidentes"),

        orderBy("fechaCreacion", "desc")

      );

      const querySnapshot = await getDocs(q);

      const datos = [];

      querySnapshot.forEach((docu) => {

        datos.push({

          id: docu.id,
          ...docu.data()

        });

      });

      setIncidentes(datos);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    const q = query(

      collection(db, "incidentes"),

      orderBy("fechaCreacion", "desc")

    );

    const unsubscribe = onSnapshot(

      q,

      (snapshot) => {

        console.log("Snapshot recibido");
        console.log("Documentos:", snapshot.size);

        const datos = [];

        snapshot.forEach((docu) => {

          datos.push({
            id: docu.id,
            ...docu.data()
          });

        });

        console.log(datos);

        setIncidentes(datos);

        setLoading(false);

      },

      (error) => {

        console.error("ERROR FIRESTORE:", error);

        setLoading(false);

      }

    );

    return () => unsubscribe();

  }, []);

  const eliminarIncidencia = async (id) => {

    const confirmar = window.confirm(

      "¿Desea eliminar esta incidencia?"

    );

    if (!confirmar) return;

    try {

      await deleteDoc(

        doc(db, "incidentes", id)

      );

      alert("Incidencia eliminada");

    } catch (error) {

      console.error(error);

    }

  };

  const cambiarEstado = async (
    id,
    nuevoEstado
  ) => {

    try {

      const docRef =
        doc(db, "incidentes", id);

      await updateDoc(
        docRef,
        {
          estado: nuevoEstado
        }
      );

      console.log(
        "Estado actualizado:",
        nuevoEstado
      );

    } catch (error) {

      console.error(error);

    }

  };

  return (


    <div className="max-w-7xl mx-auto px-6 py-12">

      <h1 className="text-5xl font-bold mb-4">

        Panel Administrador

      </h1>

      <p className="text-slate-400 mb-12 text-lg">

        Gestión completa de incidencias universitarias.

      </p>

      {loading ? (

        <p>Cargando incidencias...</p>

      ) : (

        <div className="grid gap-8">

          {incidentes.map((incidente) => (

            <Card key={incidente.id}>

              <div className="grid lg:grid-cols-3 gap-8">

                {/* IMAGEN */}
                <div>

                  <img
                    src={incidente.imagenURL}
                    alt="Incidencia"
                    className="
                      w-full
                      h-72
                      object-cover
                      rounded-3xl
                    "
                  />

                </div>

                {/* INFORMACIÓN */}
                <div className="lg:col-span-2">

                  <div className="flex justify-between items-center mb-4">

                    <h2 className="text-3xl font-bold">

                      {incidente.tipo}

                    </h2>

                    <span
                      className="
                        px-5
                        py-2
                        rounded-2xl
                        bg-cyan-500/20
                        text-cyan-400
                      "
                    >
                      {incidente.estado}
                    </span>

                  </div>

                  <p className="text-slate-300 mb-6 text-lg">

                    {incidente.descripcion}

                  </p>

                  <div className="grid md:grid-cols-2 gap-5 mb-8">

                    <div>

                      <p className="text-slate-500 text-sm">
                        Usuario
                      </p>

                      <p>
                        {incidente.usuarioEmail}
                      </p>

                    </div>

                    <div>

                      <p className="text-slate-500 text-sm">
                        Ubicación
                      </p>

                      <p>
                        {incidente.ubicacionTexto}
                      </p>

                    </div>

                    <div>

                      <p className="text-slate-500 text-sm">
                        Fecha
                      </p>

                      <p>

                        {
                          incidente.fechaCreacion?.toDate
                            ? incidente.fechaCreacion
                              .toDate()
                              .toLocaleString()
                            : "Sin fecha"
                        }

                      </p>

                    </div>

                  </div>

                  {/* BOTONES */}
                  <div className="flex flex-wrap gap-4">

                    <button
                      onClick={() =>
                        cambiarEstado(
                          incidente.id,
                          "Reportado"
                        )
                      }
                      className="
                        px-6
                        py-3
                        rounded-2xl
                        bg-orange-500
                        hover:scale-105
                        transition
                      "
                    >
                      Reportado
                    </button>

                    <button
                      onClick={() =>
                        cambiarEstado(
                          incidente.id,
                          "En proceso"
                        )
                      }
                      className="
                        px-6
                        py-3
                        rounded-2xl
                        bg-blue-500
                        hover:scale-105
                        transition
                      "
                    >
                      En proceso
                    </button>

                    <button
                      onClick={() =>
                        cambiarEstado(
                          incidente.id,
                          "Resuelto"
                        )
                      }
                      className="
                        px-6
                        py-3
                        rounded-2xl
                        bg-emerald-500
                        hover:scale-105
                        transition
                      "
                    >
                      Resuelto
                    </button>
                    <button

                      onClick={() =>
                        eliminarIncidencia(
                          incidente.id
                        )
                      }

                      className="
                              px-6
                              py-3
                              rounded-2xl
                              bg-red-600
                              hover:scale-105
                              transition
                            "
                    >
                      Eliminar

                    </button>

                  </div>

                </div>

              </div>

            </Card>

          ))}

        </div>

      )}

    </div>

  );

}