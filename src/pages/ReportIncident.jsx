import { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Upload, MapPin, Send, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { db, storage } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function ReportIncident() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    tipo: '',
    descripcion: '',
    ubicacionTexto: '',
    latitud: '',
    longitud: ''
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const tiposIncidente = [
    'Baños', 'Electricidad', 'Infraestructura', 'Seguridad',
    'Fugas de Agua', 'Internet', 'Aulas', 'Otros'
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData({
          ...formData,
          latitud: position.coords.latitude,
          longitud: position.coords.longitude
        });
        alert('📍 Ubicación obtenida correctamente');
      },
      () => alert('No se pudo obtener la ubicación')
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      setError('Debes adjuntar una fotografía');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Subir imagen
      const imageRef = ref(storage, `incidentes/${Date.now()}_${image.name}`);
      await uploadBytes(imageRef, image);
      const imageURL = await getDownloadURL(imageRef);

      // Guardar incidente
      await addDoc(collection(db, "incidentes"), {
        usuarioId: user.uid,
        usuarioEmail: user.email,
        tipo: formData.tipo,
        descripcion: formData.descripcion,
        imagenURL: imageURL,
        ubicacionTexto: formData.ubicacionTexto,
        latitud: formData.latitud || null,
        longitud: formData.longitud || null,
        fechaCreacion: serverTimestamp(),
        estado: "Reportado"
      });

      setSuccess(true);
      setTimeout(() => window.location.reload(), 2500);
    } catch (err) {
      setError('Error al enviar el reporte. Inténtalo de nuevo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-5xl font-bold text-center mb-3">Reportar Incidente</h1>
        <p className="text-center text-slate-400 text-xl mb-12">Tu reporte ayuda a mejorar nuestra universidad</p>
      </motion.div>

      <Card className="max-w-3xl mx-auto">
        {success ? (
          <div className="text-center py-16">
            <motion.div animate={{ scale: [0.8, 1.2, 1] }} className="mx-auto w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
              <AlertCircle size={60} className="text-emerald-400" />
            </motion.div>
            <h2 className="text-3xl font-bold text-emerald-400 mb-4">¡Reporte Enviado Exitosamente!</h2>
            <p className="text-slate-400">Gracias por tu colaboración. Pronto será atendido.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Tipo de Incidente */}
            <div>
              <label className="block text-slate-400 mb-3 font-medium">Tipo de Incidente</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {tiposIncidente.map(tipo => (
                  <button
                    key={tipo}
                    type="button"
                    onClick={() => setFormData({ ...formData, tipo })}
                    className={`p-4 rounded-2xl border transition-all ${formData.tipo === tipo 
                      ? 'border-primary-500 bg-primary-500/10 text-white' 
                      : 'border-white/10 hover:border-white/30'}`}
                  >
                    {tipo}
                  </button>
                ))}
              </div>
            </div>

            {/* Descripción */}
            <div>
              <label className="block text-slate-400 mb-2">Descripción Detallada</label>
              <textarea
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                className="w-full h-32 bg-slate-900/50 border border-white/10 rounded-3xl p-5 text-white resize-y focus:border-primary-500"
                placeholder="Describe el problema con el mayor detalle posible..."
                required
              />
            </div>

            {/* Ubicación */}
            <div>
              <label className="block text-slate-400 mb-2">Ubicación</label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={formData.ubicacionTexto}
                  onChange={(e) => setFormData({ ...formData, ubicacionTexto: e.target.value })}
                  className="flex-1 bg-slate-900/50 border border-white/10 rounded-2xl px-5 py-4"
                  placeholder="Ej: Edificio de Ingeniería, segundo piso"
                  required
                />
                <Button type="button" variant="outline" onClick={getLocation}>
                  <MapPin size={20} /> GPS
                </Button>
              </div>
            </div>

            {/* Foto */}
            <div>
              <label className="block text-slate-400 mb-3">Fotografía (Obligatoria)</label>
              
              <div className="border-2 border-dashed border-white/20 rounded-3xl p-8 text-center hover:border-primary-500 transition">
                {imagePreview ? (
                  <img src={imagePreview} alt="preview" className="mx-auto max-h-64 rounded-2xl" />
                ) : (
                  <div>
                    <Camera className="mx-auto mb-4 text-slate-400" size={48} />
                    <p className="text-slate-400">Sube o toma una foto del incidente</p>
                  </div>
                )}
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="photo"
              />
              <label htmlFor="photo" className="mt-4 inline-flex items-center gap-3 cursor-pointer bg-white/5 hover:bg-white/10 px-6 py-3 rounded-2xl transition">
                <Upload /> Seleccionar Foto
              </label>
            </div>

            {error && <p className="text-red-400 text-center">{error}</p>}

            <Button type="submit" className="w-full py-6 text-xl" disabled={loading}>
              {loading ? "Enviando Reporte..." : "Enviar Reporte"}
              <Send className="ml-2" />
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
}