import { themingSelector } from "@/redux_/slices/common/Theming";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/router";
import { FC, ReactElement, useMemo } from "react";
import { useSelector } from "react-redux";
import { Rtl } from "./Rtl";
export const StyleManagment: FC<{ children: ReactElement[] }> = ({
  children,
}) => {
  const { mode } = useSelector(themingSelector);
  const { locale } = useRouter();
  const defaultSetting = createTheme({
    direction: locale == "fa-IR" ? "rtl" : "ltr",
  });
  const theme = useMemo(
    () =>
      createTheme({
        ...defaultSetting,
        palette: {
          mode,
        },
      }),
    [mode]
  );
  return (
    <Rtl>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Rtl>
  );
};
