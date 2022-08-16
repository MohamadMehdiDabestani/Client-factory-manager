import { ReactElement } from "react";
import {
  IconButton,
  InputAdornment,
  TextField,
  SxProps,
  TextFieldProps,
  MenuItem,
} from "@mui/material";
import {
  InputError,
  InputDefaultValue,
  InputTouched,
  selectListDisplay,
} from "@/types/public";
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
  list?: selectListDisplay[] | null;
}
export const InputForm = (props: Props) => {
  const config: TextFieldProps = {
    label: props.label,
    variant: "filled",
    fullWidth: true,
    sx: props.sx,
    onChange: props.change,
    error: props.touched ? (props.error ? true : false) : false,
    helperText: props.touched && props.error,
    value: props.value,
    id: props.id,
    name: props.id,
    InputProps: {
      endAdornment: (
        <InputAdornment position="end">
          <IconButton edge="end">{props?.icon}</IconButton>
        </InputAdornment>
      ),
    },
  };
  if (props.type == "select") {
    return (
      <TextField select {...config}>
        {props.list?.map((el: any, idx: number) => (
          <MenuItem value={el.id} key={idx}>
            {el.displayName}
          </MenuItem>
        ))}
      </TextField>
    );
  }
  return (
    <TextField
      // select={props.type == "select"}
      {...config}
      type={props.type}
    />
  );
};
