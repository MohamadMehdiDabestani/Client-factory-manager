import { Menu, UserLayout, Roles as RC } from "@/components";
import useTranslation from 'next-translate/useTranslation'
import Head from "next/head";
import { Fragment } from "react";

const Roles = () => {
  const {t , lang} = useTranslation('common')
  console.log("lang" , lang);
  
  return (
    <Fragment>
      <Head>
        <title>
          {process.env.NEXT_PUBLIC_PROJ_NAME} | پنل مدیریت کارفرمایان
        </title>
      </Head>
      <RC />
      {t("userName")}
    </Fragment>
  );
};

export default Roles;
