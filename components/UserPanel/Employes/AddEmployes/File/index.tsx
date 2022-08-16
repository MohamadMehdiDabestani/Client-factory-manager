import { Box, Typography } from "@mui/material";
import { Fragment, useCallback, useEffect, useMemo } from "react";
import Dropzone, { useDropzone } from "react-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { grey, indigo, red, green } from "@mui/material/colors";
import { showErrorNotif } from "@/redux_/slices/common/Notification";
import { useAppDispatch } from "@/redux_/store";
export const File = () => {
  const dispatch = useAppDispatch();
  const onDrop = useCallback((acceptedFiles: any) => {
    console.log(acceptedFiles);
  }, []);
  const {
    getRootProps,
    getInputProps,
    fileRejections,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    maxFiles: 1,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "text/csv": [".csv"],
      "application/vnd.ms-excel": [".xls"],
    },
    onDrop,
  });
  useEffect(() => {
    if (fileRejections.length > 1) {
      dispatch(
        showErrorNotif({
          message: "شما نمینوانید در لحظه بیشتر از یک فایل آپلود کنید",
        })
      );
    }
    console.log("file rejecion event", fileRejections);
  }, [fileRejections]);
  return (
    <Fragment>
      <Box
        sx={{
          border: "2px dashed",
          borderColor: grey[700],
          borderRadius: "10px",
          cursor: "pointer",
          padding: "7px 10px",
          height: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          ...(isFocused && {
            borderColor: green[800],
          }),
          ...(isDragAccept && {
            borderColor: indigo["A700"],
          }),
          ...(isDragReject && {
            borderColor: red["A700"],
          }),
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <CloudUploadIcon sx={{ fontSize: "50px" }} />
        <Typography>فایل اکسل یا csv خود را اینجا رها کنید</Typography>
      </Box>
    </Fragment>
  );
};
