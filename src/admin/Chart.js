import React, { useState, useEffect } from "react";
import { fetchJson } from "../api/fetchJson";
import Header from "../common/Header";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { observer } from "mobx-react-lite";
import Auth from "../state/Authentication";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useNavigate } from "react-router-dom";

const Chart = observer(() => {
  let authState = Auth;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

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
    fetchJson(`ToDoList/fetchAmountOfLists/${authState.user}`).then((data) => {
      console.log(data);
      setOptions({ ...options, series: data.users });
      setLoading(false);
    });
  }, []);

  return (
    <Header>
      <div className="adminChart" style={{ width: "100%" }}>
        <Typography variant="h3" component="div">
          Admin Chart
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/main")}
        >
          Return to home page
        </Button>
        {loading ? (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        ) : (
          <HighchartsReact highcharts={Highcharts} options={options} />
        )}
      </div>
    </Header>
  );
});

export default Chart;
