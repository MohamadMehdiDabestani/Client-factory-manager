import type { AppProps } from "next/app";
import { Navbar, Notification, StyleManagment, UserLayout } from "@/components";
import { Provider } from "react-redux";
import { store } from "@/redux_/store";
import { Box } from "@mui/system";
import { useTheme } from "@emotion/react";
function MyApp({ Component, pageProps }: AppProps) {
  const theme = useTheme();
  return (
    <Provider store={store}>
      <StyleManagment>
        <Notification />
        {/* <Box
          sx={{
            display: "block",
            width: "100%",
            height: "100%",
            background: theme.palette.mode == "light" ? "#e6e6e8" : "red",
          }}
        > */}
          {/* <Navbar /> */}
          <UserLayout>
            <Component {...pageProps} />
          </UserLayout>
        {/* </Box> */}
      </StyleManagment>
    </Provider>
  );
}

export default MyApp;
