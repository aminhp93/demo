import * as React from "react";
import {
  DataGrid,
  type DataGridProps,
  type GridFilterModel,
  type GridRowSelectionModel,
} from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { COLUMNS, ROWS, ROW_SELECTION_MODEL, FILTER_MODEL } from "./utils";

interface TableState {
  rows: {
    id: number;
    name: string;
    age: number;
  }[];
  rowSelectionModel: GridRowSelectionModel;
  filterModel: GridFilterModel;
}

function CleanGrid(props: any) {
  const [tableState, setTableState] = React.useState<TableState>({
    // rows: props.rows,
    rowSelectionModel: ROW_SELECTION_MODEL,
    filterModel: FILTER_MODEL,
  });

  //   const onFilterModelChange = React.useCallback<
  //     NonNullable<DataGridProps["onFilterModelChange"]>
  //   >(
  //     (newFilterModel) => {
  //       // Update the filter model in the single source of truth
  //       setTableState((prev) => ({
  //         ...prev,
  //         filterModel: newFilterModel,
  //       }));
  //     },
  //     [setTableState]
  //   );

  return (
    <Box sx={{ height: 400 }}>
      <h3>✅ With SSOT (Clean and Consistent)</h3>
      <DataGrid
        rows={props.rows}
        columns={COLUMNS}
        checkboxSelection
        rowSelectionModel={tableState.rowSelectionModel}
        onRowSelectionModelChange={(newSelection) =>
          setTableState((prev) => ({
            ...prev,
            rowSelectionModel: newSelection,
          }))
        }
        // filterModel={tableState.filterModel}
        // onFilterModelChange={onFilterModelChange}
      />
    </Box>
  );
}

export default CleanGrid;
