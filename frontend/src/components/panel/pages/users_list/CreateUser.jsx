import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Typography } from "@mui/material";
import UserForm from "../../../common/UserForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  maxWidth:"calc(100vw - 40px)",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export default function CreateUser({ open, handleClose,onFileSelect}) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography level="h1" fontFamily={"sans-serif"} sx={{fontSize:22,mb:3,fontWeight:700,textAlign:"center"}}>Create User Form</Typography>
        <UserForm callBack={handleClose} />
      </Box>
    </Modal>
  );
}
