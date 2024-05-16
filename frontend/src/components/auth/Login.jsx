import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import CubeAnimation from "./CubeAnimation";
import { PasswordInput } from "./PasswordInput";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { setSession } from "../../features/mainSlice";
import { postReq } from "../../utils/core";

const defaultTheme = createTheme();

export default function Login() {
	const navigate = useNavigate();
	const [inputs, setInputs] = React.useState({
		email: "",
		password: "",
	});
	const { enqueueSnackbar } = useSnackbar();
	const dispatch = useDispatch();
	const { users, session } = useSelector((data) => data.mainSlice);
	/**
	 * to save inputs on Change value
	 * @param {*} e
	 */
	const inputChangeHandler = (e) => {
		const { name, value } = e.target;
		setInputs({ ...inputs, [name]: value });
	};
	const login = async (payload) => {
		const data = await postReq("login", payload);
		console.log({ data });
		if (data?.success) {
			dispatch(setSession(data?.session));
			localStorage.setItem("meet_token", data?.session?.token);
			enqueueSnackbar(data?.message, {
				variant: "success",
			});
		} else {
			enqueueSnackbar(data?.message, {
				variant: "error",
			});
		}
	};
	/**
	 * form validation and submission handled here
	 * @param {*} event
	 */
	const handleSubmit = (event) => {
		const { email, password } = inputs;
		event.preventDefault();
		login({ email, password });
		// const nonEmpty = Object.values(inputs).filter((el) => el == "").length == 0;
		// if (nonEmpty) {
		//   const user = users.find((user) => user.email == email);
		//   if (user) {
		//     if (user.password == password) {
		//       dispatch(setSession(user));
		//     } else {
		//       enqueueSnackbar("Invalid Password.", {
		//         variant: "error",
		//       });
		//     }
		//   } else {
		//     enqueueSnackbar(
		//       "Wrong email: No account associated with this email id.",
		//       {
		//         variant: "error",
		//       }
		//     );
		//   }
		// } else {
		//   enqueueSnackbar("Fields can't be empty.", {
		//     variant: "error",
		//   });
		// }
	};

	/**
	 * if session is exist then navigate to user listing page
	 */
	React.useEffect(() => {
		if (session != null) navigate("/user_management/users");
	}, [session]);

	return (
		<ThemeProvider theme={defaultTheme}>
			<Grid container component="main" sx={{ height: "100vh" }}>
				<CssBaseline />
				<CubeAnimation />
				<Grid
					item
					xs={12}
					sm={8}
					md={6}
					component={Paper}
					elevation={6}
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
					}}
					square
				>
					<Box
						sx={{
							my: 8,
							mx: 4,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Box
							sx={{
								mt: 5,
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								maxWidth: "400px",
							}}
						>
							<Avatar
								sx={{ m: 1, color: "secondary.main", background: "none" }}
							>
								<VpnKeyIcon />
							</Avatar>
							<Typography component="h1" variant="h5">
								Sign in
							</Typography>
							<Box
								component="form"
								noValidate
								onSubmit={handleSubmit}
								sx={{ mt: 1 }}
							>
								<TextField
									margin="normal"
									required
									fullWidth
									id="email"
									label="Email Address"
									placeholder="jai@gmail.com"
									name="email"
									autoComplete="email"
									value={inputs.email}
									onChange={inputChangeHandler}
									autoFocus
								/>
								<PasswordInput
									margin="normal"
									required
									fullWidth
									placeholder="123456"
									name="password"
									label="Password"
									id="password"
									value={inputs.password}
									onChange={inputChangeHandler}
									autoComplete="current-password"
								/>

								<Button
									type="submit"
									fullWidth
									variant="contained"
									sx={{ mt: 3, mb: 2 }}
								>
									Sign In
								</Button>
								<Grid container>
									<Grid item xs></Grid>
									<Grid item>
										<Link
											sx={{ cursor: "pointer" }}
											variant="body2"
											onClick={() => navigate("/signup")}
										>
											{"Don't have an account? Sign Up"}
										</Link>
									</Grid>
								</Grid>
							</Box>
						</Box>
					</Box>
				</Grid>
			</Grid>
		</ThemeProvider>
	);
}
