import {
  fetch,
  input,
  InputDefaultValue,
  InputError,
  InputTouched,
  selectListDisplay,
} from "@/types/public";
import * as yup from "yup";
import { useFormik } from "formik";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PasswordIcon from "@mui/icons-material/Password";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import { InputForm } from "@/components/common/InputForm";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  NoSsr,
  Select,
  TextField,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import usePrivateApi from "@/hooks/usePrivateApi";

interface roleResponse {
  roleName: string;
  id: string;
}
export const Single = () => {
  const { handleGet } = usePrivateApi();
  const [loading, setLoading] = useState<boolean>(true);
  const [list, setRoleList] = useState<selectListDisplay[] | null>(null);
  const validationHandler = yup.object({
    mobile: yup.number().required("شماره ی موبایل وارد کنید"),
    userName: yup.string().required("نام را وارد کنید"),
    email: yup
      .string()
      .email("ایمیل معتبر وارد کنید")
      .required("ایمیل را وارد کنید"),
    password: yup
      .string()
      .min(8, "رمز عبور باید بیشتر از 8 رقم باشد")
      .required("رمز عبور را وراد کنید"),
    codeMeli: yup.number().required("کد ملی"),
    roleId: yup.string().required("role"),
  });
  const formik = useFormik({
    initialValues: {
      mobile: "",
      email: "",
      password: "",
      userName: "",
      codeMeli: 0,
      roleId: "26",
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
      console.log("values", values);
    },
  });
  useEffect(() => {
    if (loading) {
      setLoading(false);
      const fetch: fetch = {
        method: "GET",
        type: "external",
        url: "/Employer/GetAllRole",
        data: {},
      };
      handleGet<roleResponse[]>(fetch, (data) => {
        const newList: selectListDisplay[] = data.data.map((e) => {
          return { id: e.id, displayName: e.roleName } as selectListDisplay;
        });
        setRoleList(newList);
      });
    }
  }, []);
  let items: input[] = [
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
    {
      id: "codeMeli",
      label: "کد ملی",
      type: "number",
      icon: <RecentActorsIcon />,
    },
    {
      id: "roleId",
      label: "role",
      type: "select",
      icon: <RecentActorsIcon />,
      list: list,
    },
  ];

  if (loading) return <p>loading</p>;
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Fragment>
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
            </Grid>
          ))}
        </Fragment>
      </Grid>
      <Button type="submit" variant="contained" sx={{ mt: 3 }}>
        ارسال
      </Button>
    </form>
  );
};
