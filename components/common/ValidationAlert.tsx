import { validationAlertSelector } from "@/redux_/slices/common/ValidationAlert";
import { Alert, Typography } from "@mui/material";
import { Fragment } from "react";
import { useSelector } from "react-redux";

export const ValidationAlert = () => {
  const validationAlert = useSelector(validationAlertSelector);
  if (validationAlert.list == null) return <Fragment></Fragment>;
  return (
    <Alert severity="error">
      <Typography variant="subtitle1">{validationAlert.description}</Typography>
      {validationAlert.list?.map((e, idx) => (
        <Typography key={idx} sx={{ margin: "5px 0" }} variant="body2">
          {e}
        </Typography>
      ))}
    </Alert>
  );
};
