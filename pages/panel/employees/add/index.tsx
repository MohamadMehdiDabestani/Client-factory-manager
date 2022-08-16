import type { NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";
import { AddEmployes } from "@/components";

const Add: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>{process.env.NEXT_PUBLIC_PROJ_NAME} | ایجاد کارمند</title>
      </Head>
      <AddEmployes />
    </Fragment>
  );
};

export default Add;
