import AdminSidebar from "../components/admin/AdminSidebar";

import Card from "../components/common/Card";

const incidents = [
  {
    id: 1,
    title: "Daño eléctrico",
    status: "Reportado",
    location: "Bloque A",
  },
  {
    id: 2,
    title: "Internet caído",
    status: "Proceso",
    location: "Biblioteca",
  },
];

export default function AdminPanel() {
  return (
    <div className="flex">

      <AdminSidebar />

      <div className="flex-1 page-container">

        <div className="mb-12">

          <h1 className="text-5xl font-bold mb-3">
            Administración
          </h1>

          <p className="text-slate-400">
            Gestión avanzada de incidencias
          </p>

        </div>

        <div className="grid gap-8">

          {incidents.map((incident) => (
            <Card key={incident.id}>

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
          ))}

        </div>

      </div>

    </div>
  );
}