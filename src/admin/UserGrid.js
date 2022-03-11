import { DataGrid } from "@mui/x-data-grid";
import React, { useState, useEffect, useRef } from "react";

const columns = [
  { field: "id", headerName: "ID", width: 300 },
  { field: "name", headerName: "Name", width: 300 },
  { field: "email", headerName: "Email", width: 300 },
  { field: "admin", headerName: "Admin", width: 300 },
  { field: "created", headerName: "Created", width: 300 },
];

async function fetchJson(url) {
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

export default function UserGrid() {
  const [tableData, setTableData] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [currentUser, setCurrentUser] = useState(0);

  const [page, setPage] = useState(0);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectionModel, setSelectionModel] = useState([]);
  const prevSelectionModel = useRef(selectionModel);

  useEffect(() => {
    fetchJson(`ToDoList/allUsers/${currentUser}/${pageSize}`).then((data) =>
      setTableData(data)
    );
  }, [currentUser, pageSize]);
  console.log(tableData);

  //https://mui.com/components/data-grid/selection/#usage-with-server-side-pagination

  return (
    <div className="adminPage" style={{ height: 700, width: "100%" }}>
      <DataGrid
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
        columns={columns}
        rows={tableData}
        pagination={() => setCurrentUser(currentUser + pageSize)}
        hideFooterRowCount={true}
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
    </div>
  );
}
