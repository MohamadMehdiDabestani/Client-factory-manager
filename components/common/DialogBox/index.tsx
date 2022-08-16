import {
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/system";

import CloseIcon from "@mui/icons-material/Close";
import { FC, ReactNode } from "react";
import {
  dialogBoxSelector,
  toggleDialogBox,
} from "@/redux_/slices/common/DialogBox";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/redux_/store";
interface Props {
  children: ReactNode;
  title: string;
  rest?: DialogProps;
  closeIcon: boolean;
}
export const DialogBox: FC<Props> = ({ title, children, rest, closeIcon }) => {
  const dispatch = useAppDispatch();
  const { show } = useSelector(dialogBoxSelector);
  const handleClose = () => {
    dispatch(toggleDialogBox({ show: false }));
  };
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Dialog
      {...rest}
      open={show}
      fullScreen={fullScreen}
      fullWidth={true}
      onClose={handleClose}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {title}{" "}
        {closeIcon && (
          <CloseIcon
            fontSize="large"
            sx={{ cursor: "pointer" }}
            onClick={() => dispatch(toggleDialogBox({ show: false }))}
          />
        )}
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};
