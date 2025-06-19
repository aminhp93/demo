import { GridLogicOperator } from '@mui/x-data-grid';

export interface Item  {
  id: number;
  name: string;
  role: string;
};


export const DATA: Item[] = [
  { id: 1, name: 'Alice', role: 'Dev' },
  { id: 2, name: 'Bob', role: 'Design' },
  { id: 3, name: 'Charlie', role: 'Dev' },
  { id: 4, name: 'Diana', role: 'QA' },
  { id: 5, name: 'Eve', role: 'Manager' },
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

export const INITIAL_UI_STATE: UIState = {
  selectedIds: [],
  highlightId: null,
  filterRole: null,
};
