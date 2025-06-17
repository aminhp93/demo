import { GridLogicOperator } from '@mui/x-data-grid';

export const ROWS = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
  { id: 3, name: 'Charlie', age: 28 },
  { id: 4, name: 'Diana', age: 22 },
];

export const ROW_SELECTION_MODEL = {
  type: 'include' as any,
  ids: new Set([2]),
};

export const FILTER_MODEL = {
  items: [
    { id: 1, field: 'rating', operator: '>', value: '4' },
    { id: 2, field: 'isAdmin', operator: 'is', value: 'true' },
  ],
  logicOperator: GridLogicOperator.Or,
};

export const COLUMNS = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'age', headerName: 'Age', width: 100 },
];
