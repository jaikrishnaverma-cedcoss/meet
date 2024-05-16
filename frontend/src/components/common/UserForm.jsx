import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import {
	Autocomplete,
	Checkbox,
	Chip,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { toTitleCase } from "../../utils/tools";
import { PasswordInput } from "../auth/PasswordInput";
import ImageUpload from "./ImageUpload";
import { getReq, postReq } from "../../utils/core";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
export const initialUser = {
	firstName: "",
	lastName: "",
	email: "",
	password: "",
	role: "user",
	pic: "/default_pic.png",
	group: [],
};
export default function UserForm(props) {
	const id = props?.id;
	const { users, groups } = useSelector((data) => data.mainSlice);
	const user = React.useMemo(() => users.find((el) => el.id == id), []);
	const [inputs, setInputs] = React.useState({
		...(id ? user : initialUser),
	});
	const [loading, setLoading] = React.useState(id ? true : false);
	const { enqueueSnackbar } = useSnackbar();
	const dispatch = useDispatch();
	/**
	 * save input values on change to state variable
	 * @param {*} e
	 */
	const inputChangeHandler = (e) => {
		const { name, value } = e.target;
		setInputs({ ...inputs, [name]: value });
	};

	const getUser = async () => {
		const data = await getReq(`user/${id}`);
		if (data.success) {
			const { firstName, lastName, email, password, group, role, pic } =
				data.data;
			setInputs({ firstName, lastName, email, password, group, role, pic });
		} else {
			enqueueSnackbar(data?.message, {
				variant: "error",
			});
		}
		setLoading(false);
	};

	React.useEffect(() => {
		if (id) getUser();
	}, []);
	/**
	 * handle image updatation
	 * @param {*} pic image url
	 */
	const onFileSelect = (pic) => {
		setInputs({ ...inputs, ["pic"]: pic });
	};

	const registerOrUpdate = async (payload) => {
		let data = null;
		if (id) data = await postReq(`user/${id}`, payload);
		else data = await postReq("register", payload);
		if (data?.success) {
			enqueueSnackbar(data?.message, {
				variant: "success",
			});
			if (!props?.forProfile)
				setInputs({
					...initialUser,
				});
			if ("callBack" in props) props.callBack();
		} else {
			enqueueSnackbar(data?.message, {
				variant: "error",
			});
		}
	};
	/**
	 * validation and submission handled
	 * @param {*} event
	 */
	const handleSubmit = async (event) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const { email, password } = inputs;
		event.preventDefault();
		const nonEmpty = Object.values(inputs).filter((el) => el == "").length == 0;
		if (nonEmpty) {
			if (!emailRegex.test(email)) {
				enqueueSnackbar("Please enter valid email.", {
					variant: "error",
				});
			} else if (password.split("").length < 6) {
				enqueueSnackbar("Password length cant be less than 6 character", {
					variant: "error",
				});
			} else {
				await registerOrUpdate({ ...inputs });
			}
		} else {
			enqueueSnackbar("All fields are required.", {
				variant: "error",
			});
		}
	};

	return (
		<Grid
			item
			xs={12}
			sm={8}
			md={6}
			elevation={6}
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
			}}
			square
		>
			{loading ? (
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						width: "100%",
						maxWidth: 600,
					}}
				>
					<CircularProgress />
				</Box>
			) : (
				<Box
					component="form"
					noValidate
					onSubmit={handleSubmit}
					sx={{ mt: 0, width: "100%", maxWidth: 600 }}
				>
					<ImageUpload id={id} onFileSelect={onFileSelect} />
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
							<FormControl fullWidth>
								<InputLabel id="demo-simple-select-label">Role</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={inputs.role}
									label="Role"
									name="role"
									onChange={inputChangeHandler}
								>
									<MenuItem value={"admin"}>Admin</MenuItem>
									<MenuItem value={"user"}>User</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12}>
							<Autocomplete
								limitTags={3}
								defaultValue={[]}
								multiple
								id="checkboxes-tags-demo"
								noOptionsText="No friends available."
								options={groups.map((el) => el.name)}
								value={inputs.group}
								getOptionLabel={(option) => option}
								onChange={(event, newValue) => {
									setInputs((prev) => {
										prev.group = [
											...newValue.map((option) => {
												const alreadyIndex = prev.group.findIndex(
													(item) => item == option
												);
												if (alreadyIndex !== -1)
													return prev.group[alreadyIndex];
												else return option;
											}),
										];
										return { ...prev };
									});
								}}
								renderTags={(tagValue, getTagProps) =>
									tagValue.map((option, index) => (
										<Chip
											key={"option" + index + option}
											label={option}
											{...getTagProps({ index })}
										/>
									))
								}
								renderOption={(props, option, { selected }) => (
									<li {...props}>
										<Checkbox
											icon={icon}
											checkedIcon={checkedIcon}
											style={{ marginRight: 8 }}
											checked={selected}
										/>
										{toTitleCase(option)}
									</li>
								)}
								style={{ width: "100%" }}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Select Group"
										placeholder="choose group"
									/>
								)}
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
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						{`${id ? "Update" : "Create"} `} User
					</Button>
				</Box>
			)}
		</Grid>
	);
}
