import { useEffect, useState } from "react";
import jsPDF from "jspdf";

import html2canvas from "html2canvas";
import {
  collection,
  onSnapshot
} from "firebase/firestore";

import { db } from "../firebase/config";

import {

  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,

  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend

} from "recharts";

const COLORS = [
  "#06b6d4",
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444"
];

export default function Statistics() {

  const [incidentes, setIncidentes] = useState([]);


  useEffect(() => {

    const unsubscribe = onSnapshot(

      collection(db, "incidentes"),

      (snapshot) => {

        const datos = [];

        snapshot.forEach((doc) => {

          datos.push(doc.data());

        });

        setIncidentes(datos);

      }

    );

    return () => unsubscribe();

  }, []);
  const exportarPDF = async () => {

    const elemento =
      document.getElementById("estadisticas");

    const canvas =
      await html2canvas(elemento);

    const imgData =
      canvas.toDataURL("image/png");

    const pdf = new jsPDF(
      "p",
      "mm",
      "a4"
    );

    const pdfWidth =
      pdf.internal.pageSize.getWidth();

    const pdfHeight =
      (canvas.height * pdfWidth)
      / canvas.width;

    pdf.addImage(
      imgData,
      "PNG",
      0,
      0,
      pdfWidth,
      pdfHeight
    );

    pdf.save(
      "Reporte-UniReport.pdf"
    );

  };

  // ESTADOS
  const estadosData = [

    {
      name: "Reportado",
      value:
        incidentes.filter(
          i => i.estado === "Reportado"
        ).length
    },

    {
      name: "En proceso",
      value:
        incidentes.filter(
          i => i.estado === "En proceso"
        ).length
    },

    {
      name: "Resuelto",
      value:
        incidentes.filter(
          i => i.estado === "Resuelto"
        ).length
    }

  ];

  // TIPOS
  const tipos = {};

  incidentes.forEach((inc) => {

    tipos[inc.tipo] =
      (tipos[inc.tipo] || 0) + 1;

  });

  const tiposData = Object.keys(tipos).map((key) => ({

    tipo: key,

    cantidad: tipos[key]

  }));

  return (

    <div
      id="estadisticas"
      className="max-w-7xl mx-auto px-6 py-12"
    >

      <h1 className="text-5xl font-bold mb-4">

        Estadísticas

      </h1>

      <p className="text-slate-400 mb-12 text-lg">

        Analytics y reportes visuales del sistema.

      </p>

      <button
        onClick={exportarPDF}
        className="
    mb-10
    bg-cyan-500
    hover:bg-cyan-600
    transition
    px-6
    py-4
    rounded-2xl
    font-semibold
  "
      >
        Descargar PDF
      </button>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">

        {/* PIE */}
        <div
          className="
            bg-slate-900
            border
            border-white/10
            rounded-3xl
            p-8
          "
        >

          <h2 className="text-2xl font-bold mb-8">

            Estados de Incidencias

          </h2>

          <ResponsiveContainer
            width="100%"
            height={350}
          >

            <PieChart>

              <Pie
                data={estadosData}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                label
              >

                {estadosData.map((entry, index) => (

                  <Cell
                    key={index}
                    fill={
                      COLORS[
                      index % COLORS.length
                      ]
                    }
                  />

                ))}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

        {/* BARRAS */}
        <div
          className="
            bg-slate-900
            border
            border-white/10
            rounded-3xl
            p-8
          "
        >

          <h2 className="text-2xl font-bold mb-8">

            Incidencias por Tipo

          </h2>

          <ResponsiveContainer
            width="100%"
            height={350}
          >

            <BarChart data={tiposData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="tipo" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="cantidad"
                fill="#06b6d4"
                radius={[10, 10, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>

  );

}