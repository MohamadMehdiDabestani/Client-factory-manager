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
import PasswordIcon from "@mui/icons-material/Password";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import { InputForm, ValidationAlert } from "@/components";
import {
  InputError,
  InputDefaultValue,
  InputTouched,
  fetch,
  input,
} from "@/types/public";
import Link from "next/link";
import useApi from "@/hooks/useApi";
import { showSuccessNotif } from "@/redux_/slices/common/Notification";
import { useAppDispatch } from "@/redux_/store";
import { setCookie } from "cookies-next";
import { blue } from "@mui/material/colors";
import { setTokenAndRefreshToken } from "@/redux_/slices/common/Initializer";

const items: input[] = [
  {
    id: "email",
    label: "ایمیل",
    type: "string",
    icon: <AlternateEmailIcon />,
  },
  {
    id: "password",
    label: "رمز عبور",
    type: "password",
    icon: <PasswordIcon />,
  },
];
interface responseLogin {
  expireAt: string;
  token: string;
  refreshToken: string;
  refreshTokenExpireAt: string;
}

export const Login: FC = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useAppDispatch();
  const axios = useApi();
  const validationHandler = yup.object({
    email: yup
      .string()
      .email("ایمیل معتبر وارد کنید")
      .required("ایمیل را وارد کنید"),
    password: yup
      .string()
      .min(8, "رمز عبور باید بیشتر از 8 رقم باشد")
      .required("رمز عبور را وراد کنید"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationHandler,
    onSubmit: (values) => {
      const fetch: fetch = {
        method: "POST",
        type: "external",
        data: values,
        url: "User/Login",
      };
      axios.handlePost<responseLogin>(fetch, ({ data }) => {
        setCookie("TokenVerification", data.token, {
          expires: new Date(data.expireAt),
        });
        setCookie("RefreshTokenVerification", data.refreshToken, {
          expires: new Date(data.refreshTokenExpireAt),
        });
        dispatch(
          setTokenAndRefreshToken({
            token: data.token,
            refreshToken: data.refreshToken,
          })
        );
        dispatch(
          showSuccessNotif({
            message: "وارد حساب شدید",
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
      <Paper
        sx={{
          padding: "10px 15px",
          width: matches ? "80%" : "50%",
        }}
        elevation={6}
      >
        <ValidationAlert />
        <Alert
          severity="info"
          variant="outlined"
          sx={{ margin: "10px 0", a: { color: blue["A400"] } }}
        >
          حساب کاربری ندارید ؟{" "}
          <Link href="/register">
            <a>ثبت نام کنید</a>
          </Link>
        </Alert>
        <Typography
          variant="h4"
          component="p"
          textAlign="center"
          sx={{ margin: "20px 0 30px 0" }}
        >
          ورود به حساب
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
            ورود
          </Button>
        </form>
      </Paper>
    </Box>
  );
};
