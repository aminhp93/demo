import * as React from "react";
import { DataGrid, type DataGridProps } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { COLUMNS, ROW_SELECTION_MODEL, FILTER_MODEL } from "./utils";

function BrokenGrid(props: any) {
  // ❌ Separated states
  //   const [rows, setRows] = React.useState(props.rows);
  const [rowSelectionModel, setRowSelectionModel] =
    React.useState(ROW_SELECTION_MODEL);
  //   const [filterModel, setFilterModel] = React.useState(FILTER_MODEL);

  const onFilterModelChange = React.useCallback<
    NonNullable<DataGridProps["onFilterModelChange"]>
  >((newFilterModel) => {
    console.log("onFilterModelChange", newFilterModel);
    // Update the filter model in the single source of truth
    // setFilterModel(newFilterModel);
  }, []);

  console.log("rowSelectionModel", rowSelectionModel);

  return (
    <Box sx={{ height: 400 }}>
      <h3>🚫 No SSOT (Bug-Prone)</h3>
      <DataGrid
        rows={props.rows} // not synced with selection
        columns={COLUMNS}
        checkboxSelection
        rowSelectionModel={rowSelectionModel} // not synced with rows
        onRowSelectionModelChange={(newSelection) => {
          console.log("onRowSelectionModelChange", newSelection);
          setRowSelectionModel(newSelection);
        }}
        // filterModel={filterModel} // not synced with rows
        onFilterModelChange={onFilterModelChange}
      />
    </Box>
  );
}

export default BrokenGrid;
