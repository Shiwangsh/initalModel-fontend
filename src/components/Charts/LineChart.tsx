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
      <PolarArea
        data={{
          labels: ["Total Transactions"],
          datasets: [
            {
              label: "Transactions",
              data: dataArray,
              backgroundColor: ["rgb(255, 99, 132)"],

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

export default LineChart;
