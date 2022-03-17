import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { observer } from "mobx-react-lite";
import Auth from "../state/Authentication";
import { fetchJson } from "../api/fetchJson";
import Header from "../common/Header";

const columns = [
  { field: "id", headerName: "ID", width: 300 },
  {
    field: "name",
    headerName: "Name",
    width: 300,
  },
  {
    field: "email",
    headerName: "Email",
    width: 300,
  },
  {
    field: "admin",
    headerName: "Admin",
    width: 300,
  },
  { field: "created", headerName: "Created", width: 300 },
];

const UserGrid = observer(() => {
  let authState = Auth;
  const [rows, setRows] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetchJson(`ToDoList/allUsers/`).then((data) => {
      setRows(data.users);
      setLoading(false);
    });
  }, []);

  return (
    <Header>
      <div className="adminPage" style={{ width: "100%" }}>
        <Typography variant="h3" component="div">
          Admin Page
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/main")}
        >
          Return to home page
        </Button>
        <DataGrid
          autoHeight
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          columns={columns}
          rows={rows}
          loading={loading}
        />
      </div>
    </Header>
  );
});

export default UserGrid;
