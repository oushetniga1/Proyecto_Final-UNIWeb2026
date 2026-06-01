import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
} from "lucide-react";

import {
  collection,
  onSnapshot
} from "firebase/firestore";

import { db } from "../firebase/config";

import Card from "../components/common/Card";

import Button from "../components/common/Button";
import { Link } from "react-router-dom";

export default function Dashboard() {

  const [stats, setStats] = useState({

    reportados: 0,
    proceso: 0,
    resueltos: 0,
    total: 0

  });

  useEffect(() => {

    const unsubscribe = onSnapshot(

      collection(db, "incidentes"),

      (snapshot) => {

        let reportados = 0;
        let proceso = 0;
        let resueltos = 0;

        snapshot.forEach((doc) => {

          const data = doc.data();

          if (data.estado === "Reportado") {

            reportados++;

          } else if (data.estado === "En proceso") {

            proceso++;

          } else if (data.estado === "Resuelto") {

            resueltos++;

          }

        });

        setStats({

          reportados,
          proceso,
          resueltos,

          total:
            reportados +
            proceso +
            resueltos

        });

      }

    );

    return () => unsubscribe();

  }, []);

  const cards = [

    {
      title: "Reportados",
      value: stats.reportados,
      icon: AlertTriangle,
      color: "from-orange-500 to-red-500",
    },

    {
      title: "En Proceso",
      value: stats.proceso,
      icon: Clock,
      color: "from-cyan-500 to-blue-500",
    },

    {
      title: "Resueltos",
      value: stats.resueltos,
      icon: CheckCircle,
      color: "from-emerald-500 to-green-500",
    },

    {
      title: "Total",
      value: stats.total,
      icon: Users,
      color: "from-purple-500 to-pink-500",
    },

  ];

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

        {/* LOGO */}
        <img
          src="./public/LOGOUAWA.png"
          alt="Logo Universidad"
          className="
            absolute
            right-10
            top-1/2
            -translate-y-1/2
            w-[520px]
            opacity-[0.08]
            pointer-events-none
            hidden
            lg:block
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

            Sistema inteligente para
            gestión de incidencias
            universitarias en tiempo real.

          </p>

          <div className="flex gap-6 flex-wrap">

            <Link to="/report">
              <Button className="text-lg px-10 py-5">
                Reportar Incidencia
              </Button>
            </Link>

            <Link to="/statistics">
              <Button
                className="
                  bg-white/5
                  border
                  border-white/10
                "
                link="/statistics"
              >
                Ver Estadísticas
              </Button>
            </Link>


          </div>

        </motion.div>

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

        {cards.map((stat, index) => {

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

    </div>

  );

}