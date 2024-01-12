// import * as React from "react";
import { ModeToggle } from "./mode-toggle"; 

export function MainNav() {
  return (
    <div className="flex flex-row justify-between px-4 py-2">
        <img src="/intel.png" alt="Intel Logo" className="h-10 w-10" />
        <ModeToggle />
    </div>
  );
}