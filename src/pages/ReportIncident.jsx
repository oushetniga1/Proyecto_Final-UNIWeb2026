import { motion } from "framer-motion";
import { Upload, MapPin } from "lucide-react";

import Card from "../components/common/Card";
import Button from "../components/common/Button";

export default function ReportIncident() {
  return (
    <div className="page-container">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >

        <Card>

          <h1 className="text-5xl font-bold mb-3">
            Reportar Incidencia
          </h1>

          <p className="text-slate-400 mb-12">
            Completa el formulario para registrar
            una incidencia en la universidad.
          </p>

          <form className="space-y-8">

            {/* Tipo */}
            <div>
              <label className="block mb-3 text-sm text-slate-300">
                Tipo de incidencia
              </label>

              <select
                className="
                  w-full
                  glass
                  rounded-2xl
                  p-4
                  bg-transparent
                  outline-none
                "
              >
                <option className="bg-slate-900">
                  Infraestructura
                </option>

                <option className="bg-slate-900">
                  Seguridad
                </option>

                <option className="bg-slate-900">
                  Tecnología
                </option>

                <option className="bg-slate-900">
                  Mantenimiento
                </option>
              </select>
            </div>

            {/* Descripción */}
            <div>
              <label className="block mb-3 text-sm text-slate-300">
                Descripción
              </label>

              <textarea
                rows="6"
                placeholder="Describe detalladamente la incidencia..."
                className="
                  w-full
                  glass
                  rounded-2xl
                  p-4
                  bg-transparent
                  outline-none
                  resize-none
                "
              />
            </div>

            {/* Upload */}
            <div>
              <label className="block mb-3 text-sm text-slate-300">
                Evidencia Fotográfica
              </label>

              <div
                className="
                  glass
                  rounded-3xl
                  p-10
                  border-2
                  border-dashed
                  border-white/10
                  text-center
                "
              >
                <Upload
                  size={60}
                  className="mx-auto mb-5 text-cyan-400"
                />

                <p className="text-lg mb-2">
                  Arrastra una imagen aquí
                </p>

                <p className="text-slate-400 text-sm">
                  PNG, JPG o JPEG
                </p>
              </div>
            </div>

            {/* Ubicación */}
            <div>
              <label className="block mb-3 text-sm text-slate-300">
                Ubicación
              </label>

              <div className="relative">
                <MapPin
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-cyan-400
                  "
                />

                <input
                  type="text"
                  placeholder="Ej: Bloque A - Aula 204"
                  className="
                    w-full
                    glass
                    rounded-2xl
                    p-4
                    pl-14
                    bg-transparent
                    outline-none
                  "
                />
              </div>
            </div>

            <Button className="w-full text-lg py-5 rounded-3xl">
              Enviar Reporte
            </Button>

          </form>
        </Card>
      </motion.div>
    </div>
  );
}