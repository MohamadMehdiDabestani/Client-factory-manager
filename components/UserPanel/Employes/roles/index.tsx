import { GridColumns } from "@mui/x-data-grid";
import { GridData } from "@/components";

import { Button, Paper } from "@mui/material";
import usePrivateApi from "@/hooks/usePrivateApi";
import { Fragment, useEffect, useState } from "react";
import { fetch } from "@/types/public";
import { useSelector } from "react-redux";
import {
  gridDataSelector,
  toggleDeleteRow,
} from "@/redux_/slices/common/GridData";
import { useAppDispatch } from "@/redux_/store";

const columns: GridColumns = [
  { field: "id", headerName: "شناسه", hideable: false },
  {
    field: "roleName",
    headerName: "نام نقش",
    editable: true,
    width: 300,
    hideable: true,
  },
];

interface response {
  roleName: string;
  id: string;
}
export const Roles = () => {
  const { handleGet } = usePrivateApi();
  const [loading, setLoading] = useState<boolean>(true);
  const [list, setList] = useState<response[] | null>(null);
  const { clickDeleteRowsBtn, idItems } = useSelector(gridDataSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (loading) {
      setLoading(false);
      const fetch: fetch = {
        method: "GET",
        type: "external",
        url: "/api/Employer/GetAllRole",
        data: {},
      };
      console.log("I sent");
      handleGet<response[]>(fetch, (data) => setList(data.data));
    }
  }, []);
  useEffect(() => {
    if (clickDeleteRowsBtn) {
      console.log("clicked", idItems);
      dispatch(toggleDeleteRow({ status: false }));
    }
  }, [clickDeleteRowsBtn]);
  if (loading || list == null) return <p>is loading</p>;

  return (
    <Fragment>
      <Button variant="contained" sx={{ margin: "10px 0" }}>
        افزودن نقش جدید
      </Button>
      <Paper sx={{ height: "500px", direction: "rtl" }}>
        <GridData
          gridProps={{
            loading,
            rows: list,
            columns: columns,
            initialState: {
              columns: {
                columnVisibilityModel: {
                  id: false,
                },
              },
            },
          }}
          inlineEditing={true}
        />
      </Paper>
    </Fragment>
  );
};
