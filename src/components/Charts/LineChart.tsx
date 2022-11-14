import React, { useState, useEffect } from "react";
import { Bar, Bubble, Line, PolarArea, Scatter } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import axios from "axios";
Chart.register(...registerables);

const LineChart = () => {
  const [dataArray, setDataArray] = useState([]);

  const url = "http://localhost:9090/Transactions/month";

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await axios.post(url, { month: 10 });
    setDataArray(response.data.countStatsArray);
  };
  return (
    <div>
      {/* <PolarArea */}
      <Line
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
            "September",
            "October",
            "November",
            "December",
          ],
          datasets: [
            {
              label: "Transactions",
              data: [65, 59, 80, 81, 56, 55, 40, 80, 90, 150, 200, 250],
              backgroundColor: ["rgba(73, 232, 192, 0.562)"],
              fill: true,

              borderWidth: 1,
              borderColor: "rgb(75, 192, 192)",
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
