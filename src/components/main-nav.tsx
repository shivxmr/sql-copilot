import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import intelLogo from "/intel.svg";
import Button from "@mui/material/Button";

export function MainNav() {
  return (
    <>
      <AppBar
        position="fixed"
        sx={{ boxShadow: "none", backgroundColor: "#2155BF" }}
      >
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <a href="/">
            <img
              src={intelLogo}
              style={{ maxWidth: "4rem", minWidth: "4rem", marginLeft: "1rem" }}
              alt="Intel logo"
            />
          </a>
          <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
            <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
              <Button>Button</Button>
              {/* <RightDrawer /> */}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}


// import { ModeToggle } from "./mode-toggle";

// export function MainNav() {
//   return (
//     <div className="flex flex-row justify-between px-4 py-1">
//         <img src="/intel.svg" alt="Intel Logo" className="h-10 w-10" />
//         {/* <ModeToggle /> */}
//     </div>
//   );
// }