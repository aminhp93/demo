import * as React from "react";
import {
  DataGrid,
  type DataGridProps,
  GridLogicOperator,
  type GridFilterModel,
  type GridRowSelectionModel,
} from "@mui/x-data-grid";
import { Box } from "@mui/material";

const originalData = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
  { id: 3, name: "Charlie", age: 28 },
  { id: 4, name: "Diana", age: 22 },
];
const selectedIds = new Set([2]); // Stored separately

interface TableState {
  rows: {
    id: number;
    name: string;
    age: number;
  }[];
  selection: GridRowSelectionModel;
  filterModel: GridFilterModel;
}

function CleanGrid() {
  const [tableState, setTableState] = React.useState<TableState>({
    rows: originalData,
    selection: { type: "include", ids: selectedIds } as any, // SSOT for selection
    // highlightId: 2,
    // filterModel: {
    //   items: [{ columnField: "age", operatorValue: ">", value: "24" }],
    // },
    filterModel: {
      items: [
        { id: 1, field: "rating", operator: ">", value: "4" },
        { id: 2, field: "isAdmin", operator: "is", value: "true" },
      ],
      logicOperator: GridLogicOperator.Or,
    },
  });

  const onFilterModelChange = React.useCallback<
    NonNullable<DataGridProps["onFilterModelChange"]>
  >(
    (newFilterModel) => {
      // Update the filter model in the single source of truth
      setTableState((prev) => ({
        ...prev,
        filterModel: newFilterModel,
      }));
    },
    [setTableState]
  );

  return (
    <Box sx={{ height: 400 }}>
      <h3>✅ With SSOT (Clean and Consistent)</h3>
      <DataGrid
        rows={tableState.rows}
        columns={[
          { field: "id", headerName: "ID", width: 70 },
          { field: "name", headerName: "Name", width: 130 },
          { field: "age", headerName: "Age", width: 100 },
        ]}
        checkboxSelection
        rowSelectionModel={tableState.selection}
        onRowSelectionModelChange={(newSelection) =>
          setTableState((prev) => ({ ...prev, selection: newSelection }))
        }
        filterModel={tableState.filterModel}
        onFilterModelChange={onFilterModelChange}
        // getRowClassName={(params) =>
        //   params.id === tableState.highlightId ? "highlight-row" : ""
        // }
      />
      <style>{`
        .highlight-row {
          background-color: #b2ff59 !important;
        }
      `}</style>
    </Box>
  );
}

export default CleanGrid;
