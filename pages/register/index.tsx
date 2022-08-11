import type { NextPage } from "next";
import { Register as RC } from "@/components";
import { Fragment } from "react";
import Head from "next/head";
const Register: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>{process.env.NEXT_PUBLIC_PROJ_NAME} | ثبت نام</title>
      </Head>
      <RC />
    </Fragment>
  );
};

export default Register;
