import { motion } from "framer-motion";

import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
} from "lucide-react";

import Card from "../components/common/Card";
import Button from "../components/common/Button";

const stats = [
  {
    title: "Reportados",
    value: "24",
    icon: AlertTriangle,
    color: "from-orange-500 to-red-500",
  },
  {
    title: "En Proceso",
    value: "12",
    icon: Clock,
    color: "from-cyan-500 to-blue-500",
  },
  {
    title: "Resueltos",
    value: "68",
    icon: CheckCircle,
    color: "from-emerald-500 to-green-500",
  },
  {
    title: "Usuarios",
    value: "142",
    icon: Users,
    color: "from-purple-500 to-pink-500",
  },
];

export default function Dashboard() {
  return (
    <div className="page-container">

      {/* HERO */}
      <section
        className="
          relative
          overflow-hidden
          rounded-[40px]
          glass
          p-12
          mb-16
        "
      >

        {/* Glow */}
        <div
          className="
            absolute
            -top-32
            -right-32
            w-96
            h-96
            bg-cyan-500/20
            blur-[120px]
            rounded-full
          "
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >

          <h1
            className="
              text-6xl
              md:text-7xl
              font-extrabold
              leading-tight
              mb-6
            "
          >
            Plataforma Inteligente
            <br />

            <span className="gradient-text">
              UniReport
            </span>

          </h1>

          <p
            className="
              text-slate-400
              text-xl
              max-w-3xl
              mb-10
            "
          >
            Reporta incidencias universitarias
            en tiempo real con estadísticas,
            seguimiento y administración avanzada.
          </p>

          <div className="flex gap-6 flex-wrap">

            <Button className="text-lg px-10 py-5">
              Reportar Incidencia
            </Button>

            <Button
              className="
                bg-white/5
                border
                border-white/10
              "
            >
              Ver Estadísticas
            </Button>

          </div>

        </motion.div>
        {/* LOGO UNIVERSIDAD */}

        <img
          src="./img/LOGOUAWA.png"
          alt="Logo Universidad de la Amazonia"
          className="
                absolute
                -right-20
                top-2/3
                -translate-y-1/2
                w-[650px]
                opacity-[0.5]
                blur-[1px]
                pointer-events-none
                select-none
                hidden
                lg:block
                      "
        />
      </section>

      {/* STATS */}
      <section
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-8
          mb-16
        "
      >

        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <motion.div
              key={stat.title}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.1,
              }}
            >

              <Card>

                <div className="flex justify-between items-center">

                  <div>

                    <p className="text-slate-400 mb-2">
                      {stat.title}
                    </p>

                    <h2 className="text-5xl font-bold">
                      {stat.value}
                    </h2>

                  </div>

                  <div
                    className={`
                      w-20
                      h-20
                      rounded-3xl
                      bg-gradient-to-br
                      ${stat.color}
                      flex
                      items-center
                      justify-center
                    `}
                  >
                    <Icon size={38} />
                  </div>

                </div>

              </Card>

            </motion.div>
          );
        })}

      </section>

      {/* ACTIVIDAD */}
      <section>

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-4xl font-bold">
            Actividad Reciente
          </h2>

          <p className="text-slate-400">
            Últimos reportes realizados
          </p>

        </div>

        <div className="grid gap-6">

          {[1, 2, 3].map((item) => (
            <Card key={item}>

              <div className="flex justify-between items-center">

                <div>

                  <h3 className="text-2xl font-bold mb-2">
                    Incidencia #{item}
                  </h3>

                  <p className="text-slate-400">
                    Problema reportado en Bloque A
                  </p>

                </div>

                <div
                  className="
                    px-5
                    py-2
                    rounded-2xl
                    bg-cyan-500/20
                    text-cyan-400
                  "
                >
                  En proceso
                </div>

              </div>

            </Card>
          ))}

        </div>

      </section>

    </div>
  );
}