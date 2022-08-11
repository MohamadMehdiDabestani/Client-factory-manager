import { AppBar, Button, ButtonGroup, Toolbar } from "@mui/material";
import Link from "next/link";

export const Navbar = () => {
  return (
    <AppBar color="inherit" position="static">
      <Toolbar>
        <ButtonGroup variant="contained">
          <Link href="/register">
            <Button>
              <a>ثبت نام</a>
            </Button>
          </Link>
          <Link href="/login">
            <Button>
              <a>ورود</a>
            </Button>
          </Link>
          <Link href="/">
            <Button>
              <a>خانه</a>
            </Button>
          </Link>
        </ButtonGroup>
      </Toolbar>
    </AppBar>
  );
};
