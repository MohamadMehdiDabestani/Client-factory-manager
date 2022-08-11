import type { AppProps } from "next/app";
import { Navbar, Notification, StyleManagment } from "@/components";
import { Provider } from "react-redux";
import { store } from "@/redux_/store";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <StyleManagment>
        <Notification />
        <Navbar />
        <Component {...pageProps} />
        
      </StyleManagment>
    </Provider>
  );
}

export default MyApp;
