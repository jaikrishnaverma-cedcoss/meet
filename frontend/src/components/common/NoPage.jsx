import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
/**
 * Fallback 404 component
 * @returns 
 */
const NoPage = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        flexDirection:"column",
        gap:"5px",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
        width: "100%",
      }}
    >
      <h2>Invalid Route</h2>
      <Button variant="contained" onClick={() => navigate("/")}>
        Back to login
      </Button>
    </div>
  );
};

export default NoPage;
