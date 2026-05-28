import { useState } from 'react';

import {
  collection,
  addDoc,
  serverTimestamp
} from 'firebase/firestore';

import {
  ref,
  uploadBytes,
  getDownloadURL
} from 'firebase/storage';

import { db, storage } from '../firebase/config';

import { useAuth } from '../context/AuthContext';

export default function ReportIncident() {

  const { user } = useAuth();

  const [tipo, setTipo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [ubicacionTexto, setUbicacionTexto] = useState('');
  const [imagen, setImagen] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);
      console.log("Iniciando reporte...");
      let imagenURL = '';

      // SUBIR IMAGEN
      if (imagen) {

        const storageRef = ref(
          storage,
          `incidentes/${Date.now()}_${imagen.name}`
        );

        console.log("Subiendo imagen...");
        await uploadBytes(storageRef, imagen);
        console.log("Imagen subida");

        console.log("Obteniendo URL...");
        imagenURL =
          await getDownloadURL(storageRef);
        console.log("URL obtenida:", imagenURL);

      }
      console.log("Guardando en Firestore...");

      // GUARDAR INCIDENTE
      await addDoc(

        collection(db, 'incidentes'),

        {

          tipo,
          descripcion,
          ubicacionTexto,

          imagenURL,

          usuarioEmail: user.email,
          usuarioId: user.uid,
          

          estado: 'Reportado',

          fechaCreacion: serverTimestamp()

        }
      );

      console.log("Incidente guardado");

      setTipo('');
      setDescripcion('');
      setUbicacionTexto('');
      setImagen(null);

    } catch (error) {

      console.error(error);

      alert(error.message);

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="max-w-3xl mx-auto px-6 py-12">

      <h1 className="text-5xl font-bold mb-10">
        Reportar Incidente
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-slate-900 p-10 rounded-3xl border border-white/10"
      >

        {/* Tipo */}
        <div>

          <label className="block mb-2 text-slate-300">
            Tipo de incidente
          </label>

          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            required
            className="w-full p-4 rounded-2xl bg-slate-800 border border-white/10"
          >

            <option value="">
              Selecciona
            </option>

            <option value="Daño eléctrico">
              Daño eléctrico
            </option>

            <option value="Daño estructural">
              Daño estructural
            </option>

            <option value="Basura">
              Basura
            </option>

            <option value="Seguridad">
              Seguridad
            </option>

            <option value="Otro">
              Otro
            </option>

          </select>

        </div>

        {/* Descripción */}
        <div>

          <label className="block mb-2 text-slate-300">
            Descripción
          </label>

          <textarea
            value={descripcion}
            onChange={(e) =>
              setDescripcion(e.target.value)
            }
            required
            rows="5"
            placeholder="Describe el problema..."
            className="w-full p-4 rounded-2xl bg-slate-800 border border-white/10"
          />

        </div>

        {/* Ubicación */}
        <div>

          <label className="block mb-2 text-slate-300">
            Ubicación
          </label>

          <input
            type="text"
            value={ubicacionTexto}
            onChange={(e) =>
              setUbicacionTexto(e.target.value)
            }
            required
            placeholder="Ej: Bloque A - Salón 204"
            className="w-full p-4 rounded-2xl bg-slate-800 border border-white/10"
          />

        </div>

        {/* Imagen */}
        <div>

          <label className="block mb-2 text-slate-300">
            Fotografía
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImagen(e.target.files[0])
            }
            required
            className="w-full p-4 rounded-2xl bg-slate-800 border border-white/10"
          />

        </div>

        {/* Botón */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 transition p-4 rounded-2xl font-semibold"
        >

          {
            loading
              ? 'Reportando...'
              : 'Enviar Reporte'
          }

        </button>

      </form>

    </div>
  );
}