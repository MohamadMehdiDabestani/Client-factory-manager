import {
  toggleNotificationSelector,
  hideNotif,
} from "@/redux_/slices/common/Notification";
import { useAppDispatch } from "@/redux_/store";
import { Alert, Snackbar, AlertColor } from "@mui/material";
import { useSelector } from "react-redux";

export const Notification = () => {
  const notification = useSelector(toggleNotificationSelector);
  const dispatch = useAppDispatch();
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(hideNotif());
  };
  return (
    <Snackbar
      open={notification.show}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      <Alert
        onClose={handleClose}
        severity={notification.severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {notification.message}
      </Alert>
    </Snackbar>
  );
};
