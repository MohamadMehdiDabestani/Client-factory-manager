import type { NextPage } from "next";
import { Menu, UserLayout } from "@/components";
import { Fragment } from "react";
import Head from "next/head";
import { Box, Typography } from "@mui/material";

const Add: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>{process.env.NEXT_PUBLIC_PROJ_NAME} | ایجاد کارمند</title>
      </Head>
        <Typography>ایجاد کارمند</Typography>
    </Fragment>
  );
};

export default Add;
