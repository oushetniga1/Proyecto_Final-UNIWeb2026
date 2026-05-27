import {
  LayoutDashboard,
  BarChart3,
  AlertTriangle,
  Settings,
} from "lucide-react";

import { Link } from "react-router-dom";

const links = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    path: "/admin",
  },
  {
    icon: AlertTriangle,
    label: "Incidencias",
    path: "/admin/incidents",
  },
  {
    icon: BarChart3,
    label: "Estadísticas",
    path: "/statistics",
  },
  {
    icon: Settings,
    label: "Configuración",
    path: "/settings",
  },
];

export default function AdminSidebar() {
  return (
    <aside
      className="
        w-72
        glass
        border-r
        border-white/10
        min-h-screen
        p-6
        hidden
        lg:block
      "
    >

      <h1 className="text-3xl font-bold mb-12">
        Admin Panel
      </h1>

      <div className="space-y-4">

        {links.map((link) => {
          const Icon = link.icon;

          return (
            <Link
              key={link.label}
              to={link.path}
              className="
                flex
                items-center
                gap-4
                p-4
                rounded-2xl
                hover:bg-white/5
                transition
              "
            >

              <Icon size={24} />

              <span>{link.label}</span>

            </Link>
          );
        })}

      </div>

    </aside>
  );
}