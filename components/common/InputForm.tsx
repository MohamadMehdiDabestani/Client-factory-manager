import { ReactElement } from "react";
import { IconButton, InputAdornment, TextField, SxProps } from "@mui/material";
import { InputError , InputDefaultValue , InputTouched } from "@/types/public";
interface Props {
  sx: SxProps;
  label: string;
  type: string;
  id: string;
  change: {
    (e: React.ChangeEvent<any>): void;
    <T_1 = string | React.ChangeEvent<any>>(
      field: T_1
    ): T_1 extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  value: InputDefaultValue;
  error: InputError;
  touched: InputTouched;
  icon?: ReactElement;
}
export const InputForm = (props: Props) => {
  return (
    <TextField
      label={props.label}
      variant="filled"
      sx={props.sx}
      type={props.type}
      onChange={props.change}
      error={props.touched ? props.error ? true : false : false}
      helperText={props.touched && props.error}
      value={props.value}
      id={props.id}
      name={props.id}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton edge="end">{props?.icon}</IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
