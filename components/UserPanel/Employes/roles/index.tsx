import { GridColumns, GridRowsProp } from "@mui/x-data-grid";
import { GridData } from "@/components";
import {
  randomCreatedDate,
  randomTraderName,
  randomUpdatedDate,
} from "@mui/x-data-grid-generator";
import { Paper } from "@mui/material";

const columns: GridColumns = [
  { field: "name", headerName: "Name", width: 180, editable: true },
  { field: "age", headerName: "Age", type: "number", editable: true },
  {
    field: "dateCreated",
    headerName: "Date Created",
    type: "date",
    width: 180,
    editable: true,
  },
  {
    field: "lastLogin",
    headerName: "Last Login",
    type: "dateTime",
    width: 220,
    editable: true,
  },
];
const rows: any = [];
Array.from(Array(500).keys()).map((i) => {
  rows.push({
    id: i + 1,
    name: randomTraderName(),
    age: i + 2,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  });
});
export const Roles = () => {
  return (
    <Paper sx={{ height: "500px", direction: "rtl" }}>
      <GridData rows={rows} columns={columns} inlineEditing={true} />
    </Paper>
  );
};
