import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export default function StatusChart({ history }) {
  if (!history.length) return <p className="text-gray-400">No data</p>;

  const data = {
    labels: history.map((p) =>
      new Date(p.checked_at).toLocaleTimeString()
    ),
    datasets: [
      {
        label: "Uptime",
        data: history.map((p) => (p.is_up ? 1 : 0)),
        borderColor: "rgb(34,197,94)",
        tension: 0.3,
      },
    ],
  };

  return <Line data={data} />;
}