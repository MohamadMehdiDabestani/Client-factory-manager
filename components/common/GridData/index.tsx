import { FC } from "react";
import {
  DataGrid,
  GridColumns,
  GridRowsProp,
  faIR,
  GridToolbarContainer,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { Footer } from "./Footer";
import { Toolbar } from "./Toolbar";

interface Props {
  columns: GridColumns<any>;
  rows: GridRowsProp;
  inlineEditing: boolean;
}


export const GridData: FC<Props> = ({ columns, rows, inlineEditing }) => {
  return (
    <DataGrid
      pagination
      sx={{
        border: "none",
        "& .MuiDataGrid-cell": {
          overflowX: "auto",
        },
        "& .MuiDataGrid-row > div": {
          direction: "ltr",
        },
        "& div.MuiDataGrid-toolbarContainer": {
          justifyContent: "flex-end",
          "& > button> span": {
            ml: "5px",
          },
        },
      }}
      components={{
        Pagination: Footer,
        Toolbar: Toolbar,
      }}
      checkboxSelection 
      disableSelectionOnClick
      rows={rows}
      // sx={{ direction: "rtl" }}
      columns={columns}
      localeText={faIR.components.MuiDataGrid.defaultProps.localeText}
      experimentalFeatures={{ newEditingApi: inlineEditing }}
    />
  );
};
