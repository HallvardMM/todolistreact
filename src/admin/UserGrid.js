import { DataGrid } from "@mui/x-data-grid";
import React, { useState, useEffect, useRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { fetchJson } from "../api/fetchJson";
import Header from "../common/Header";
import Typography from "@mui/material/Typography";

const columns = [
  { field: "id", headerName: "ID", width: 300, sortable: false },
  {
    field: "name",
    headerName: "Name",
    width: 300,
    sortable: false,
    editable: true,
  },
  {
    field: "email",
    headerName: "Email",
    width: 300,
    sortable: false,
    editable: true,
  },
  {
    field: "admin",
    headerName: "Admin",
    width: 300,
    sortable: false,
    editable: true,
  },
  { field: "created", headerName: "Created", width: 300, sortable: false },
];

export default function UserGrid() {
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState([]);
  const [entities, setEntities] = useState(10);
  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(false);
  const [selectionModel, setSelectionModel] = useState([]);
  const [snackbar, setSnackbar] = React.useState(null);
  const prevSelectionModel = useRef(selectionModel);

  const handleCellEditCommit = React
    .useCallback
    /*async (params) => {
      try {
        // Make the HTTP request to save in the backend
        /*
        TODO: Send updated row!
        const response = await mutateRow({
          id: params.id,
          [params.field]: params.value,
        });

        setSnackbar({
          children: "User successfully saved",
          severity: "success",
        });
        setRows((prev) =>
          prev.map((row) =>
            row.id === params.id ? { ...row, ...response } : row
          )
        );
      } catch (error) {
        setSnackbar({ children: "Error while saving user", severity: "error" });
        // Restore the row in case of error
        setRows((prev) => [...prev]);
      }
    },
    [mutateRow]*/
    ();

  useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);
      const newRows = await fetchJson(
        `ToDoList/allUsers/${page * pageSize}/${pageSize}`
      );

      if (!active) {
        return;
      }

      setRows(newRows.users);
      setEntities(newRows.numberOfUsers);
      setLoading(false);
      setTimeout(() => {
        setSelectionModel(prevSelectionModel.current);
      });
    })();
    return () => {
      active = false;
    };
  }, [page, pageSize]);

  //https://mui.com/components/data-grid/selection/#usage-with-server-side-pagination

  return (
    <Header>
      <div className="adminPage" style={{ width: "100%" }}>
        <Typography variant="h3" component="div">
          Admin Page
        </Typography>
        <DataGrid
          autoHeight
          onCellEditCommit={handleCellEditCommit}
          disableColumnFilter={true}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          columns={columns}
          rows={rows}
          rowCount={entities}
          paginationMode="server"
          onPageChange={(newPage) => {
            prevSelectionModel.current = selectionModel;
            setPage(newPage);
          }}
          onSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel);
          }}
          selectionModel={selectionModel}
          loading={loading}
        />
        {!!snackbar && (
          <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000}>
            <Alert {...snackbar} onClose={handleCloseSnackbar} />
          </Snackbar>
        )}
      </div>
    </Header>
  );
}
