import {
  GridCellEditStopParams,
  GridCellEditStopReasons,
  GridColumns,
  GridRowEditStopParams,
  MuiEvent,
} from "@mui/x-data-grid";
import { GridData, InputForm } from "@/components";
import * as yup from "yup";
import { Button, Paper } from "@mui/material";
import usePrivateApi from "@/hooks/usePrivateApi";
import { Fragment, useCallback, useEffect, useState } from "react";
import {
  fetch,
  input,
  InputDefaultValue,
  InputError,
  InputTouched,
} from "@/types/public";
import { useSelector } from "react-redux";
import {
  gridDataSelector,
  toggleDeleteRow,
} from "@/redux_/slices/common/GridData";
import { useAppDispatch } from "@/redux_/store";
import { DialogBox } from "@/components";
import { toggleDialogBox } from "@/redux_/slices/common/DialogBox";
import useTranslation from "next-translate/useTranslation";
import AbcIcon from "@mui/icons-material/Abc";
import { useFormik } from "formik";
import { showErrorNotif } from "@/redux_/slices/common/Notification";
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
  const { handleGet, handlePost } = usePrivateApi();
  const [loading, setLoading] = useState<boolean>(true);
  const [list, setList] = useState<response[] | null>(null);
  const { clickDeleteRowsBtn, idItems } = useSelector(gridDataSelector);
  const dispatch = useAppDispatch();
  const { t } = useTranslation("role");
  const tv = useTranslation("validation");
  const tc = useTranslation("common");
  const items: input[] = [
    {
      id: "roleName",
      label: t("roleName"),
      type: "string",
      icon: <AbcIcon />,
    },
  ];
  useEffect(() => {
    if (loading) {
      setLoading(false);
      const fetch: fetch = {
        method: "GET",
        type: "external",
        url: "/Employer/GetAllRole",
        data: {},
      };
      handleGet<response[]>(fetch, (data) => setList(data.data));
    }
  }, []);
  useEffect(() => {
    if (clickDeleteRowsBtn) {
      const fetch: fetch = {
        method: "POST",
        type: "external",
        url: "/Employer/DeleteRole",
        data: { ids: idItems },
      };
      handlePost<boolean>(fetch, (data) => {
        let newList = list as response[];
        idItems.map((i) => {
          newList = newList.filter((l) => l.id != i.toString());
        });
        setList(newList);
      });
      dispatch(toggleDeleteRow({ status: false }));
    }
  }, [clickDeleteRowsBtn]);

  const validationHandler = yup.object({
    roleName: yup.string().required(tv.t("required", { name: t("roleName") })),
  });
  const formik = useFormik({
    initialValues: {
      roleName: "",
    },
    validationSchema: validationHandler,
    onSubmit: (values) => {
      setLoading(false);
      const fetch: fetch = {
        method: "POST",
        type: "external",
        url: "/Employer/CreateRole",
        data: values,
      };
      handlePost<number>(fetch, (data) => {
        dispatch(toggleDialogBox({ show: false }));
        setList([
          ...(list as response[]),
          { roleName: values.roleName, id: data.data.toString() },
        ]);
      });
    },
  });
  const handleUpdate = (newRow: any) => {
    const fetch: fetch = {
      method: "POST",
      type: "external",
      url: "/Employer/EditeRole",
      data: { roleName: newRow.roleName, id: newRow.id },
    };
    handlePost<boolean>(fetch, () => {});
    return newRow;
  };
  if (loading || list == null) return <p>is loading</p>;
  return (
    <Fragment>
      <DialogBox title={t("addRoleTitle")} closeIcon={true}>
        <form onSubmit={formik.handleSubmit}>
          {items.map((el: input, idx) => (
            <InputForm
              {...el}
              sx={{ width: "100%", marginBottom: "20px" }}
              value={formik.values[el.id as keyof InputDefaultValue]}
              error={formik.errors[el.id as keyof InputError]}
              touched={formik.touched[el.id as keyof InputTouched]}
              change={formik.handleChange}
              key={idx}
            />
          ))}
          <Button variant="contained" sx={{ mr: 2 }} type="submit">
            {tc.t("send")}
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => dispatch(toggleDialogBox({ show: false }))}
          >
            {tc.t("cancel")}
          </Button>
        </form>
      </DialogBox>
      <Button
        variant="contained"
        sx={{ margin: "10px 0" }}
        onClick={() => dispatch(toggleDialogBox({ show: true }))}
      >
        افزودن نقش جدید
      </Button>
      <Paper sx={{ height: "500px", direction: "rtl" }}>
        <GridData
          gridProps={{
            processRowUpdate: (newRow, oldRow) => handleUpdate(newRow),
            onProcessRowUpdateError: () => {
              dispatch(
                showErrorNotif({
                  message: tv.t("problem"),
                })
              );
            },
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
