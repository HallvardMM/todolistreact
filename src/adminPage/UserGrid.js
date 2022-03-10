import { DataGrid } from "@mui/x-data-grid";
import React, { useState, useEffect } from "react";

async function getUsers(url) {
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

const columns = [
  { field: "id", headerName: "ID", width: 300 },
  { field: "name", headerName: "Name", width: 300 },
  { field: "email", headerName: "Email", width: 300 },
  { field: "admin", headerName: "Admin", width: 300 },
  { field: "created", headerName: "Created", width: 300 },
];

function UserGrid() {
  const [tableData, setTableData] = useState([]);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    getUsers("ToDoList/allUsers").then((data) => setTableData(data));
  }, []);
  console.log(tableData);

  return (
    <div className="adminPage" style={{ height: 700, width: "100%" }}>
      <DataGrid
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
        columns={columns}
        rows={tableData}
        pagination
        {...tableData}
      />
    </div>
  );
}

export default UserGrid;
