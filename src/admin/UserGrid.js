import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Typography, Button } from "@mui/material/";
import { fetchJson } from "../api/json";

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

const UserGrid = () => {
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
    <div className="adminPage" style={{ width: "100%" }}>
      <Typography variant="h3" component="div">
        Admin
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => navigate("/home")}
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
  );
};

export default UserGrid;
