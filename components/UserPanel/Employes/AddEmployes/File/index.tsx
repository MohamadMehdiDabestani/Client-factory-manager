import * as yup from "yup";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, Fragment, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
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
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import { InputForm } from "@/components/common/InputForm";

export const File = () => {
  const [file, setFile] = useState<readSheetResult | null>(null);
  const [cols, setCols] = useState<selectListDisplay[] | null>(null);
  const [columnType, setColumnType] = useState<string>("default");
  const { readSheet } = useSheet();
  const dispatch = useAppDispatch();

  const handleChangeColumnType = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setColumnType(e.target.value);
  };
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

  const validationHandler = yup.object({
    mobile: yup.number().required("شماره ی موبایل وارد کنید"),
    userName: yup.string().required("نام را وارد کنید"),
    email: yup.string().required("ایمیل را وارد کنید"),
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
      file?.rows.shift();
      console.log("file?.rows", file?.rows);
      const objs: any[] = [];
      file?.rows.map((e: any[]) => {
        objs.push({
          userName: e[values.userName as keyof typeof e],
          email: e[values.email as keyof typeof e],
          codeMeli: e[values.codeMeli as keyof typeof e],
          mobile: e[values.mobile as keyof typeof e],
          role: e[values.roleId as keyof typeof e],
          password: e[values.password as keyof typeof e],
          autoPassword: values.autoGenerate,
        });
      });
      console.log(objs);
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
  useEffect(() => {
    if (file) {
      if (columnType === "default") {
        setCols(
          file.cols.map((e: Cols) => {
            return {
              id: e.key.toString(),
              displayName: e.name,
            } as selectListDisplay;
          })
        );
      } else {
        const newCols: string[] = file.rows[0];
        setCols(
          newCols.map((e: string, idx: number) => {
            return {
              id: idx.toString(),
              displayName: e,
            } as selectListDisplay;
          })
        );
      }
    }
  }, [columnType]);
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
            <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="autoGenerate"
                      id="autoGenerate"
                      onChange={formik.handleChange}
                      checked={formik.values.autoGenerate}
                    />
                  }
                  label="ساخت اتوماتیک رمز عبور برای کارمند و ارسال آن به صورت پیامک برای فرد"
                />
              </FormGroup>
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
              <TextField
                label="نوع سر ستون ها"
                variant="filled"
                fullWidth
                select
                value={columnType}
                onChange={handleChangeColumnType}
              >
                <MenuItem value="default">پیش فرض</MenuItem>
                <MenuItem value="manual">دستی</MenuItem>
              </TextField>
            </Grid>
            <Divider sx={{ width: "100%", my: "20px" }} />
            {items.map((el: input, idx) => (
              <Grid key={idx} item xl={3} lg={3} md={4} sm={6} xs={12}>
                <Fragment>
                  <InputForm
                    {...el}
                    sx={{ width: "100%" }}
                    value={formik.values[el.id as keyof InputDefaultValue]}
                    error={formik.errors[el.id as keyof InputError]}
                    touched={formik.touched[el.id as keyof InputTouched]}
                    change={formik.handleChange}
                  />
                </Fragment>
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
