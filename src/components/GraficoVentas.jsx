import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function GraficoVentas({ ventas }) {
  const data = {
    labels: ventas.map((v) => `Venta ${v.id}`),

    datasets: [
      {
        label: "Monto de Venta (Bs)",
        data: ventas.map((v) => Number(v.total)),
      },
    ],
  };

  const options = {
    responsive: true,

    plugins: {
      legend: {
        position: "top",
      },

      title: {
        display: true,
        text: "Ventas Registradas",
      },
    },
  };

  return <Bar data={data} options={options} />;
}

export default GraficoVentas;