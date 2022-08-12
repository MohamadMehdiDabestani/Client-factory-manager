import type { NextPage } from "next";
import { Menu } from "@/components";
import { Fragment } from "react";
import Head from "next/head";
import { Box, Typography } from "@mui/material";
const Panel: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>
          {process.env.NEXT_PUBLIC_PROJ_NAME} | پنل مدیریت کارفرمایان
        </title>
      </Head>
      <Typography>کارمندان</Typography>
    </Fragment>
  );
};

export default Panel;
