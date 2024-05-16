import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { toTitleCase } from "../../utils/tools";
import HomeIcon from "@mui/icons-material/Home";
function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function CustomSeparator({ location }) {
  const breadcrumbs = [
    <HomeIcon />,
    ...location.filter(el=>el).map((el, i) => (
      <Link
        underline="hover"
        key={"b" + i + el}
        color="inherit"
        href="/"
        onClick={handleClick}
      >
        {toTitleCase(el)}
      </Link>
    )),
  ];

  return (
   <div style={{marginBottom:"10px"}}>
     <Stack spacing={2}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
   </div>
  );
}
