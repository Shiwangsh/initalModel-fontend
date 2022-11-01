import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const LineChart = () => {
  return (
    <div>
      <Line
        data={{
          labels: ["1", "5", "10", "15", "20", "15", "30"],
          datasets: [
            {
              label: "Last Month",
              data: [330, 250, 350, 510, 540, 760, 620],
              fill: true,
              backgroundColor: "rgba(75,192,192,0.2)",
              borderColor: "rgba(75,192,192,1)",
            },
            {
              label: "Curent Month",
              data: [330, 530, 850, 410, 440, 650, 800],
              fill: true,
              borderColor: "#742774",
            },
          ],
        }}
        width={200}
        height={200}
        options={{
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default LineChart;
