import { useState, useEffect } from "react";
import { fetchJson } from "../api/json";
import { Typography, Button } from "@mui/material/";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useNavigate } from "react-router-dom";
import Loading from "../common/Loading";

const Chart = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [options, setOptions] = useState({
    chart: {
      type: "bar",
    },
    plotOptions: {
      series: {
        minPointLength: 3,
      },
    },
    title: {
      text: "Lists per user",
    },
    subtitle: {
      text: "To check for users abusing the number of lists",
    },
    xAxis: {
      categories: ["#Lists"],
      title: {
        text: null,
      },
    },
    yAxis: {
      allowDecimals: false,
    },
    series: [],
    credits: {
      enabled: false,
    },
  });

  useEffect(() => {
    setLoading(true);
    fetchJson("ToDoList/fetchAmountOfLists/").then((data) => {
      setOptions({ ...options, series: data.users });
      setLoading(false);
    });
  }, []);

  return (
    <div className="adminChart" style={{ width: "100%" }}>
      <Typography variant="h3" component="div">
        Chart
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => navigate("/home")}
      >
        Return to home page
      </Button>
      {loading ? (
        <Loading />
      ) : (
        <HighchartsReact highcharts={Highcharts} options={options} />
      )}
    </div>
  );
};

export default Chart;
