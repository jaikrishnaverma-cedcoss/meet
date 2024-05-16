import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Grid, TextField } from "@mui/material";
import { registration } from "../../features/mainSlice";
import { PasswordInput } from "./PasswordInput";
import { postReq } from "../../utils/core";

export default function AddUser(props) {
	const { users } = useSelector((data) => data.mainSlice);
	const [inputs, setInputs] = React.useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const { enqueueSnackbar } = useSnackbar();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const inputChangeHandler = (e) => {
		const { name, value } = e.target;
		setInputs({ ...inputs, [name]: value });
	};
	const register = async (payload) => {
		const data = await postReq("register", payload);
		if (data?.success) {
			dispatch(registration({ ...inputs }));
			enqueueSnackbar(
				`User ${props?.isSignup ? "Registerd" : "Created"} Successfully.`,
				{
					variant: "success",
				}
			);
			setInputs({
				firstName: "",
				lastName: "",
				email: "",
				password: "",
			});
			if (props?.isSignup) navigate("/");
			else props?.callBack();
		} else {
			enqueueSnackbar(data?.message, {
				variant: "error",
			});
		}
	};
	const handleSubmit = (event) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const { firstName, lastName, email, password } = inputs;
		event.preventDefault();
		const nonEmpty = Object.values(inputs).filter((el) => el == "").length == 0;
		if (nonEmpty) {
			if (!emailRegex.test(email)) {
				enqueueSnackbar("Please enter valid email.", {
					variant: "error",
				});
			} else if (users.find((el) => el.email == email)) {
				enqueueSnackbar("Email already exist.", {
					variant: "error",
				});
			} else if (password.split("").length < 6) {
				enqueueSnackbar("Password length cant be less than 6 character", {
					variant: "error",
				});
			} else {
				register({ ...inputs });
			}
		} else {
			enqueueSnackbar("All fields are required.", {
				variant: "error",
			});
		}
	};

	return (
		<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<TextField
						autoComplete="given-name"
						name="firstName"
						value={inputs.firstName}
						onChange={inputChangeHandler}
						required
						fullWidth
						id="firstName"
						label="First Name"
						autoFocus
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						fullWidth
						id="lastName"
						label="Last Name"
						name="lastName"
						value={inputs.lastName}
						onChange={inputChangeHandler}
						autoComplete="family-name"
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						required
						fullWidth
						id="email"
						label="Email Address"
						value={inputs.email}
						onChange={inputChangeHandler}
						name="email"
						autoComplete="email"
					/>
				</Grid>
				<Grid item xs={12}>
					<PasswordInput
						required
						fullWidth
						name="password"
						value={inputs.password}
						onChange={inputChangeHandler}
						label="Password"
						id="password"
						autoComplete="new-password"
					/>
				</Grid>
			</Grid>
			<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
				{props?.isSignup ? "Sign Up" : "Add User"}
			</Button>
			{props?.isSignup && (
				<Grid container justifyContent="flex-end">
					<Grid item>
						<Link
							sx={{ cursor: "pointer" }}
							variant="body2"
							onClick={() => navigate("/")}
						>
							Already have an account? Sign in
						</Link>
					</Grid>
				</Grid>
			)}
		</Box>
	);
}
