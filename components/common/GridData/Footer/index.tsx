import {
  Box,
  Button,
  Menu,
  MenuItem,
  Pagination,
  PaginationItem,
} from "@mui/material";
import {
  gridPageCountSelector,
  gridPageSelector,
  gridPageSizeSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import { Fragment, useEffect, useState } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

export const Footer = () => {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  const perPage = useGridSelector(apiRef, gridPageSizeSelector);
  useEffect(() => {
    apiRef.current.setPageSize(5);
  }, []);
  //   const rowPerPage
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChangePerPage = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    setAnchorEl(null);
    apiRef.current.setPageSize(index);
  };
  return (
    <Box
      sx={{
        p: 2,
        width: "100%",
        display: " flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Pagination
        color="primary"
        count={pageCount}
        page={page + 1}
        onChange={(event, value) => apiRef.current.setPage(value - 1)}
        variant="outlined"
        shape="rounded"
        renderItem={(item) => (
          <PaginationItem
            components={{
              previous: NavigateNextIcon,
              next: NavigateBeforeIcon,
            }}
            {...item}
          />
        )}
      />
      <Button
        aria-controls={open ? "perPageMenu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        id="perPageBtn"
        onClick={handleClick}
        variant="outlined"
      >
        نمایش ردیف در هر صفه : {perPage}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        id="perPageMenu"
        aria-labelledby="perPageBtn"
      >
        {[5, 15, 20, 25].map((el, idx) => (
          <MenuItem key={idx} onClick={(e) => handleChangePerPage(e, el)}>
            {el}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
