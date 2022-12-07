import { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Cases fluctuation",
    },
  },
};

const CasesFlucatation = () => {
  const [labels, setLabels] = useState([]);
  const [dataSets, setDataSets] = useState([]);
  const casesData = async () => {
    try {
      const data = await axios.get(
        `https://disease.sh/v3/covid-19/historical/all?lastdays=all`
      );
      const cases = data?.data?.cases;
      setLabels(Object.keys(cases || {}));
      setDataSets(Object.values(cases || {}));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    casesData();
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: "Cases",
        data: dataSets,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default CasesFlucatation;
