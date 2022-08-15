import { toggleDeleteRow } from "@/redux_/slices/common/GridData";
import { useAppDispatch } from "@/redux_/store";
import { Button } from "@mui/material";
import {
  gridSelectionStateSelector,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import useTranslation from "next-translate/useTranslation";

export const Toolbar = () => {
  const dispatch = useAppDispatch();
  const apiRef = useGridApiContext();
  const gridSelection = useGridSelector(apiRef, gridSelectionStateSelector);
  const { t } = useTranslation("common");

  return (
    <GridToolbarContainer>
      {gridSelection.length > 0 && (
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={() =>
            dispatch(toggleDeleteRow({ status: true, idItems: gridSelection }))
          }
        >
          {t("dataGrid.deleteMultipleRow", { count: gridSelection.length })}
        </Button>
      )}
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
    </GridToolbarContainer>
  );
};
