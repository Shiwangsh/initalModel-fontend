import React from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const BarChart = () => {
  return (
    <div>
      <Bar
        data={{
          labels: [
            "January",
            "Feburary",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "september",
            "October",
            "November",
            "December",
          ],
          datasets: [
            {
              label: "Number of Users",
              data: [
                120, 200, 350, 600, 900, 1500, 2000, 3000, 3400, 4000, 5000,
                6000,
              ],
              backgroundColor: "rgb(114, 67, 136,0.5)",
              borderColor: "rgba(255, 99, 132, 1)",

              borderWidth: 0.5,
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

export default BarChart;
