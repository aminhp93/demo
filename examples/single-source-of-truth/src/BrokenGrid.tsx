import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

const rawData = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
  { id: 3, name: "Charlie", age: 28 },
  { id: 4, name: "Diana", age: 22 },
];

function BrokenGrid() {
  // ❌ Separated states
  const selectedIds = new Set([2]); // Stored separately
  const filteredData = rawData.filter((row) => row.age > 24); // Filtered manually
  const highlightedId = 4;

  return (
    <Box sx={{ height: 400 }}>
      <h3>🚫 No SSOT (Bug-Prone)</h3>
      <DataGrid
        rows={filteredData} // not synced with selection
        columns={[
          { field: "id", headerName: "ID", width: 70 },
          { field: "name", headerName: "Name", width: 130 },
          { field: "age", headerName: "Age", width: 100 },
        ]}
        checkboxSelection
        rowSelectionModel={{ type: "include", ids: selectedIds }} // could point to a filtered-out row
        getRowClassName={(params) =>
          params.id === highlightedId ? "highlight-row" : ""
        }
      />
      <style>{`
        .highlight-row {
          background-color: #ffe0b2 !important;
        }
      `}</style>
    </Box>
  );
}

export default BrokenGrid;
