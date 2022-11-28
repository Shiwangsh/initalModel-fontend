import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import axios from "axios";
import authHeader from "../../services/auth-header";
Chart.register(...registerables);

const PieChart = () => {
  const [cards, setcards] = useState<any>();
  const [values, setValues] = useState<any>();
  const [keys, setKeys] = useState<any>();

  useEffect(() => {
    const getcards = async () => {
      const url = `http://localhost:9090/cards`;
      const res = await axios.get(url, { headers: authHeader() });
      const { data } = res;
      setcards(data.data.data);
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
      <Pie
        data={{
          labels: keys,
          datasets: [
            {
              label: "# of Cards",
              data: values,
              backgroundColor: ["#00ffea", "#00c4b373", "#00d8c6"],
              borderColor: ["#00c7b6", "#00c7b6", "#00c7b6"],
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
