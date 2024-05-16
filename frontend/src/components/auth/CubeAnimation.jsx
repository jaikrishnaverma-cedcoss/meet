import { Grid } from "@mui/material";
import React from "react";
import About from "../common/About";
import Details from "../common/Details";

const CubeAnimation = () => {
	return (
		<Grid
			item
			xs={false}
			sm={4}
			md={6}
			className="cube-animation"
			style={{ position: "relative" }}
		>
			<div className="area">
				<ul className="circles">
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
				</ul>
			</div>
			<div
				style={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
				}}
			>
				<h2 style={{ color: "#FFFF", textAlign: "center" }} className="abs">
					meet- app Assignment
				</h2>
				<code style={{ color: "#FFFF", textAlign: "center", display: "block" }}>
					By Jai Krishna verma
				</code>
				<Details />
			</div>
		</Grid>
	);
};

export default CubeAnimation;
