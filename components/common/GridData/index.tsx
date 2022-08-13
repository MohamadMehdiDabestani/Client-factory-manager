import { FC } from "react";
import {
  DataGrid,
  GridColumns,
  GridRowsProp,
  faIR,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  enUS,
} from "@mui/x-data-grid";
import { Footer } from "./Footer";
import { Toolbar } from "./Toolbar";
import { useRouter } from "next/router";

interface Props {
  columns: GridColumns<any>;
  rows: GridRowsProp;
  inlineEditing: boolean;
}

export const GridData: FC<Props> = ({ columns, rows, inlineEditing }) => {
  const { locale } = useRouter();
  return (
    <DataGrid
      pagination
      sx={{
        border: "none",
        "& .MuiDataGrid-cell": {
          overflowX: "auto",
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
      columns={columns}
      localeText={
        locale == "fa-IR"
          ? faIR.components.MuiDataGrid.defaultProps.localeText
          : enUS.components.MuiDataGrid.defaultProps.localeText
      }
      experimentalFeatures={{ newEditingApi: inlineEditing }}
    />
  );
};
