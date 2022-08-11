import { FC } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  Alert,
  Box,
  Button,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PasswordIcon from "@mui/icons-material/Password";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { InputForm, ValidationAlert } from "@/components";
import {
  InputError,
  InputDefaultValue,
  InputTouched,
  fetch,
  input,
} from "@/types/public";
import { blue } from '@mui/material/colors';
import Link from "next/link";
import useApi from "@/hooks/useApi";
import { showSuccessNotif } from "@/redux_/slices/common/Notification";
import { useAppDispatch } from "@/redux_/store";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
const items: input[] = [
  {
    id: "userName",
    label: "نام کاربری",
    type: "text",
    icon: <AccountCircleIcon />,
  },
  {
    id: "email",
    label: "ایمیل",
    type: "email",
    icon: <AlternateEmailIcon />,
  },
  {
    id: "mobile",
    label: "شماره ی موبایل",
    type: "number",
    icon: <LocalPhoneIcon />,
  },
  {
    id: "password",
    label: "رمز عبور",
    type: "password",
    icon: <PasswordIcon />,
  },
];

export const Register: FC = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useAppDispatch();
  const axios = useApi();
  const validationHandler = yup.object({
    mobile: yup.number().required("شماره ی موبایل وارد کنید"),
    userName: yup.string().required("نام را وارد کنید"),
    email: yup.string().email("ایمیل معتبر وارد کنید").required("ایمیل را وارد کنید"),
    password: yup
      .string()
      .min(8, "رمز عبور باید بیشتر از 8 رقم باشد")
      .required("رمز عبور را وراد کنید"),
  });
  const formik = useFormik({
    initialValues: {
      mobile: "",
      email: "",
      password: "",
      userName: "",
    },
    validationSchema: validationHandler,
    validate: (values) => {
      let errors: any = {};
      const checkMobile = values.mobile.toString().match(/^0?9[0-9]{9}$/);
      if (!checkMobile) {
        errors.mobile = "شماره ی همراه معتبری وارد کنید";
      }
      return errors;
    },
    onSubmit: (values) => {
      const fetch: fetch = {
        method: "POST",
        type: "external",
        data: values,
        url: "User/Register",
      };
      axios.handlePost<boolean>(fetch, (data) => {
        dispatch(
          showSuccessNotif({
            message:
              "حساب کاربری شما ساخته شد منتظر تاییده باشید . سپاس از همراهی شما",
            severity: "success",
          })
        );
      });
    },
  });
  return (
    <Box
      sx={{
        width: "100%",
        height: "87%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        flexDirection: "column",
        padding: "0 10px",
      }}
    >
      <Alert severity="warning">
        توجه : اگر شما کارفرما هستید باید از این طریق اقدام به بازگشایی حساب و
        استفاده از ابزار کنید در غیر این صورت باید توسط کارفرما ی خود اطلاعات
        شما در سیستم ثبت شود
      </Alert>
      <Paper
        sx={{
          padding: "10px 15px",
          width: matches ? "80%" : "50%",
        }}
        elevation={6}
      >
        <ValidationAlert />
        <Alert severity="info" variant="outlined" sx={{ margin: "10px 0" , "a" : {color: blue['A400']} }}>
          حساب کاربری دارید ؟{" "}
          <Link href="/login">
            <a>وارد شوید</a>
          </Link>
        </Alert>
        <Typography
          variant="h4"
          component="p"
          textAlign="center"
          sx={{ margin: "20px 0 30px 0" }}
        >
          ثبت نام
        </Typography>
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

          <Button sx={{ width: "100%" }} variant="contained" type="submit">
            ثبت نام
          </Button>
        </form>
      </Paper>
    </Box>
  );
};
