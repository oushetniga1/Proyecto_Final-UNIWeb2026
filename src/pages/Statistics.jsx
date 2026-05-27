import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

import Card from "../components/common/Card";

const data = [
  { name: "Reportados", value: 24 },
  { name: "Proceso", value: 12 },
  { name: "Resueltos", value: 68 },
];

const COLORS = [
  "#f97316",
  "#06b6d4",
  "#10b981",
];

export default function Statistics() {
  return (
    <div className="page-container">

      <h1 className="text-5xl font-bold mb-12">
        Estadísticas
      </h1>

      <Card className="h-[500px]">

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              outerRadius={170}
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

          </PieChart>
        </ResponsiveContainer>

      </Card>

    </div>
  );
}