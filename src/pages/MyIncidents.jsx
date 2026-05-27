import { motion } from "framer-motion";

import Card from "../components/common/Card";

const incidents = [
  {
    id: 1,
    title: "Daño en proyector",
    status: "En proceso",
    location: "Bloque B",
  },
  {
    id: 2,
    title: "Fuga de agua",
    status: "Reportado",
    location: "Cafetería",
  },
];

export default function MyIncidents() {
  return (
    <div className="page-container">

      <h1 className="text-5xl font-bold mb-12">
        Mis Incidencias
      </h1>

      <div className="grid gap-8">

        {incidents.map((incident, index) => (
          <motion.div
            key={incident.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >

            <Card>

              <div className="flex justify-between items-center">

                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    {incident.title}
                  </h2>

                  <p className="text-slate-400">
                    {incident.location}
                  </p>
                </div>

                <div
                  className="
                    px-5 py-2
                    rounded-2xl
                    bg-cyan-500/20
                    text-cyan-400
                  "
                >
                  {incident.status}
                </div>

              </div>

            </Card>

          </motion.div>
        ))}

      </div>
    </div>
  );
}