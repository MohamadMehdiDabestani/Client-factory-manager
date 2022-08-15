import { FC, useState } from "react";
import {
  DataGrid,
  faIR,
  enUS,
  DataGridProps,
  GridSelectionModel,
} from "@mui/x-data-grid";
import { Footer } from "./Footer";
import { Toolbar } from "./Toolbar";
import { useRouter } from "next/router";

interface Props {
  inlineEditing: boolean;
  gridProps: DataGridProps;
}

export const GridData: FC<Props> = ({ inlineEditing, gridProps }) => {
  const { locale } = useRouter();
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
  return (
    <DataGrid
      {...gridProps}
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
      onSelectionModelChange={(newSelectionModel) => {
        setSelectionModel(newSelectionModel);
      }}
      selectionModel={selectionModel}
      checkboxSelection
      disableSelectionOnClick
      localeText={
        locale == "fa-IR"
          ? faIR.components.MuiDataGrid.defaultProps.localeText
          : enUS.components.MuiDataGrid.defaultProps.localeText
      }
      experimentalFeatures={{ newEditingApi: inlineEditing }}
    />
  );
};
