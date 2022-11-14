import React, { useEffect, useState } from "react";
import { Doughnut, Pie, PolarArea } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import axios from "axios";
Chart.register(...registerables);

const PieChart = () => {
  const [cards, setcards] = useState<any>();
  const [values, setValues] = useState<any>();
  const [keys, setKeys] = useState<any>();

  useEffect(() => {
    const getcards = async () => {
      const url = `http://localhost:9090/cards`;
      const res = await axios.get(url);
      const { data } = res;
      setcards(data.cards);
    };
    getcards();
  }, []);

  useEffect(() => {
    if (cards) {
      const result = cards.reduce((acc: any, item: any) => {
        const key = item.cardType;
        if (!acc.hasOwnProperty(key)) {
          acc[key] = 0;
        }
        acc[key] += 1;
        return acc;
      }, {});
      const values = Object.values(result);
      const keys = Object.keys(result);
      setValues(values);
      setKeys(keys);
    }
  }, [cards]);

  return (
    <div>
      <Doughnut
        data={{
          labels: keys,
          datasets: [
            {
              label: "# of Cards",
              data: values,
              backgroundColor: [
                "rgba(255, 99, 132)",
                "rgba(54, 162, 235)",
                "rgba(255, 206, 86)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
              ],
              borderWidth: 1,
            },
          ],
        }}
        width={200}
        height={200}
        options={{
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
};

export default PieChart;
