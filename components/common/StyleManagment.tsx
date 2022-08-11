import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FC, ReactElement } from "react";
import { Rtl } from "./Rtl";
const theme = createTheme({
  direction: "rtl",
});
export const StyleManagment: FC<{ children: ReactElement[] }> = ({
  children,
}) => {
  return (
    <Rtl>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Rtl>
  );
};
