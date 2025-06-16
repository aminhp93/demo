import BrokenGrid from "./BrokenGrid";
import CleanGrid from "./CleanGrid";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { ROWS } from "./utils";
import { useState } from "react";
import BrokenList from "./BrokenList";
import CleanList from "./CleanList";

function App() {
  const [rows, setRows] = useState(ROWS);
  return (
    <div>
      <h1>Single Source of Truth</h1>
      <Button
        onClick={() => {
          setRows(ROWS.filter((i) => i.id !== 1));
        }}
      >
        delete row 1
      </Button>
      <Button
        onClick={() => {
          setRows(ROWS);
        }}
      >
        reset
      </Button>
      <Grid container spacing={2}>
        <Grid size={6}>
          <BrokenList />
        </Grid>
        <Grid size={6}>
          <CleanList />
        </Grid>
        <Grid size={6}>
          <BrokenGrid rows={rows} />
        </Grid>
        <Grid size={6}>
          <CleanGrid rows={rows} />
        </Grid>
      </Grid>
    </div>
  );
}
export default App;
