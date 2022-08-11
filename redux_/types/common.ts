import { AlertColor } from "@mui/material";

export type InitialStateToggleNotification = {
  severity: AlertColor;
  variant: string;
  message: string;
  show: boolean;
};
export type ValidationAlert = {
  list: string[] | null;
  description : string
};
export type Initializer = {
  token : string,
  refreshToken : string
}
export type UserPanelMenu = {
  show : boolean
}