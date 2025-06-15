import BrokenGrid from "./BrokenGrid";
import CleanGrid from "./CleanGrid";
import Grid from "@mui/material/Grid";

function App() {
  return (
    <div>
      <h1>DataGrid Example</h1>
      <Grid container spacing={2}>
        <Grid size={6}>
          <BrokenGrid />
        </Grid>
        <Grid size={6}>
          <CleanGrid />
        </Grid>
      </Grid>
    </div>
  );
}
export default App;
