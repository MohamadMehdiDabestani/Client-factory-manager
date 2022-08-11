import type { NextPage } from "next";
import { UserPanel } from "@/components";
import { Fragment } from "react";
import Head from "next/head";
const Register: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>{process.env.NEXT_PUBLIC_PROJ_NAME} | پنل مدیریت کارفرمایان</title>
      </Head>
      <UserPanel />
    </Fragment>
  );
};

export default Register;
