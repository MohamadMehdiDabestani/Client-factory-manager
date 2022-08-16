import { NoSsr, Paper } from "@mui/material";
import { AppBar, Box, Tab, Tabs, Typography, useTheme } from "@mui/material";
import { ChangeEvent, Fragment, SyntheticEvent, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import * as XLSX from "xlsx";
import { File } from "./File";
import { Single } from "./Single";
interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <NoSsr>
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    </NoSsr>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}
const make_cols = (refstr: any) => {
  let o = [],
    C = XLSX.utils.decode_range(refstr).e.c + 1;
  for (var i = 0; i < C; ++i) o[i] = { name: XLSX.utils.encode_col(i), key: i };
  return o;
};
export const AddEmployes = () => {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };
  const change = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const files = e.target.files;
    if (files != null) {
      reader.onload = (e) => {
        if (e.target != null) {
          /* Parse data */
          const ab = e.target.result;
          const wb = XLSX.read(ab, { type: "array" });
          /* Get first worksheet */
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          /* Convert array of arrays */
          const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
          console.log("data", data);
          console.log("cols", make_cols(ws["!ref"]));
        }
        // /* Update state */
        // setData(data);
        // setCols(make_cols(ws['!ref']))
      };
      reader.readAsArrayBuffer(files[0]);
    }
  };

  return (
    <Fragment>
      <Paper>
        <Box
          sx={{
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="افزودن تکی" {...a11yProps(0)} />
            <Tab label="افزودن با فایل" {...a11yProps(1)} />
          </Tabs>
        </Box>
        {/* </AppBar> */}
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Single />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <File />
        </TabPanel>
        </SwipeableViews>
      </Paper>
    </Fragment>
  );
};
