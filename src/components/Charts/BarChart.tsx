import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import axios from "axios";
Chart.register(...registerables);

const BarChart = () => {
  const [dataArray, setDataArray] = useState([]);

  const url = "http://localhost:9090/Transactions/month";

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await axios.get(url);
    setDataArray(response.data.countStatsArray);
  };

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
            "September",
            "October",
            "November",
            "December",
          ],
          datasets: [
            {
              label: "Transactions",
              data: dataArray,
              backgroundColor: "#4dcdcb",
              borderColor: "#4dcdcb",
              borderWidth: 0.5,
            },
          ],
        }}
        // width={200}
        // height={200}
        width={700}
        height={400}
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
