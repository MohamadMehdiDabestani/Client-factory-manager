import * as yup from "yup";
import { useFormik } from "formik";
import { Box, Button, Grid, Typography } from "@mui/material";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import Dropzone, { DropEvent, useDropzone } from "react-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { grey, indigo, red, green } from "@mui/material/colors";
import { showErrorNotif } from "@/redux_/slices/common/Notification";
import { useAppDispatch } from "@/redux_/store";
import useSheet from "@/hooks/useSheet";
import {
  Cols,
  input,
  InputDefaultValue,
  InputError,
  InputTouched,
  readSheetResult,
  selectListDisplay,
} from "@/types/public";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PasswordIcon from "@mui/icons-material/Password";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import DoneIcon from "@mui/icons-material/Done";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import { InputForm } from "@/components/common/InputForm";

export const File = () => {
  const [file, setFile] = useState<readSheetResult | null>(null);
  const [cols, setCols] = useState<selectListDisplay[] | null>(null);
  const { readSheet } = useSheet();
  const handleFile = async (file: File) => {
    const result = await readSheet(file);
    setCols(
      result.cols.map((e: Cols) => {
        return {
          id: e.key.toString(),
          displayName: e.name,
        } as selectListDisplay;
      })
    );
    setFile(result);
  };
  const dispatch = useAppDispatch();
  const validationHandler = yup.object({
    mobile: yup.number().required("شماره ی موبایل وارد کنید"),
    userName: yup.string().required("نام را وارد کنید"),
    email: yup
      .string()
      .email("ایمیل معتبر وارد کنید")
      .required("ایمیل را وارد کنید"),
    autoGenerate: yup.boolean(),
    password: yup.string().when("autoGenerate", {
      is: false,
      then: yup.string().required("رمز عبور را وراد کنید"),
    }),
    codeMeli: yup.number().required("کد ملی"),
    roleId: yup.string().required("role"),
  });
  const formik = useFormik({
    initialValues: {
      mobile: "",
      email: "",
      password: "",
      userName: "",
      codeMeli: "",
      roleId: "",
      autoGenerate: true,
    },
    validationSchema: validationHandler,

    onSubmit: (values) => {
      console.log("values", values);
    },
  });
  const {
    getRootProps,
    getInputProps,
    fileRejections,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    maxFiles: 1,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "text/csv": [".csv"],
      "application/vnd.ms-excel": [".xls"],
    },
    onDrop: (acceptedFiles, fileRejections, event) =>
      handleFile(acceptedFiles[0]),
  });
  useEffect(() => {
    if (fileRejections.length > 1) {
      dispatch(
        showErrorNotif({
          message: "شما نمینوانید در لحظه بیشتر از یک فایل آپلود کنید",
        })
      );
    }
  }, [fileRejections]);
  let items: input[] = [
    {
      id: "userName",
      label: "نام کاربری",
      icon: <AccountCircleIcon />,
      type: "select",
      list: cols,
    },
    {
      id: "email",
      label: "ایمیل",
      icon: <AlternateEmailIcon />,
      type: "select",
      list: cols,
    },
    {
      id: "mobile",
      label: "شماره ی موبایل",
      icon: <LocalPhoneIcon />,
      type: "select",
      list: cols,
    },
    {
      id: "password",
      label: "رمز عبور",
      icon: <PasswordIcon />,
      type: "select",
      list: cols,
    },
    {
      id: "codeMeli",
      label: "کد ملی",
      icon: <RecentActorsIcon />,
      type: "select",
      list: cols,
    },
    {
      id: "roleId",
      label: "role",
      icon: <RecentActorsIcon />,
      type: "select",
      list: cols,
    },
  ];
  return (
    <Fragment>
      {file == null ? (
        <Box
          sx={{
            border: "2px dashed",
            borderColor: grey[700],
            borderRadius: "10px",
            cursor: "pointer",
            padding: "7px 10px",
            height: "400px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            ...(isFocused && {
              borderColor: green[800],
            }),
            ...(isDragAccept && {
              borderColor: indigo["A700"],
            }),
            ...(isDragReject && {
              borderColor: red["A700"],
            }),
          }}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <CloudUploadIcon sx={{ fontSize: "50px" }} />
          <Typography>فایل اکسل یا csv خود را اینجا رها کنید</Typography>
        </Box>
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            {items.map((el: input, idx) => (
              <Grid key={idx} item xl={3} lg={3} md={4} sm={6} xs={12}>
                <InputForm
                  {...el}
                  sx={{ width: "100%" }}
                  value={formik.values[el.id as keyof InputDefaultValue]}
                  error={formik.errors[el.id as keyof InputError]}
                  touched={formik.touched[el.id as keyof InputTouched]}
                  change={formik.handleChange}
                />
                <Button
                  variant="contained"
                  fullWidth
                  size="small"
                  sx={{ my: 1 }}
                  onClick={() => {
                    console.log(
                      el.id,
                      formik.values[el.id as keyof InputDefaultValue]
                    );
                  }}
                >
                  <DoneIcon />
                </Button>
              </Grid>
            ))}
          </Grid>
          <Button type="submit" variant="contained" sx={{ mt: 3 }}>
            ارسال
          </Button>
        </form>
      )}
    </Fragment>
  );
};
