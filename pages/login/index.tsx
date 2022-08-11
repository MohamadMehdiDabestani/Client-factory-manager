import type { NextPage } from "next";
import { Login as LC } from "@/components";
import { Fragment } from "react";
import Head from "next/head";

const Login: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>{process.env.NEXT_PUBLIC_PROJ_NAME} | ورود</title>
      </Head>
      <LC />
    </Fragment>
  );
};

export default Login;
