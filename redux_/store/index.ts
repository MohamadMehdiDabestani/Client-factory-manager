import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import toggleNotificationSelector from "@/redux_/slices/common/Notification";
import validationAlertSelector from "@/redux_/slices/common/ValidationAlert";
import initializerSelector from "@/redux_/slices/common/Initializer";
import userPanelMenuSelector from "@/redux_/slices/common/UserPanelMenu";
import themingSelector from "@/redux_/slices/common/Theming";
import gridDataSelector from "@/redux_/slices/common/GridData";
import dialogBoxSelector from "@/redux_/slices/common/DialogBox";
const reducer = {
  themingSelector,
  toggleNotificationSelector,
  validationAlertSelector,
  initializerSelector,
  userPanelMenuSelector,
  gridDataSelector,
  dialogBoxSelector
};

export const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV === "development",
});

// export type of root state from reducers
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
