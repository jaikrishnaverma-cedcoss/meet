import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Chip,
	IconButton,
	Modal,
	Stack,
	Typography,
	styled,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { columns, getColorById, toTitleCase } from "../../../../utils/tools";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import CreateUser from "./CreateUser";
import CreateGroup, { style } from "./CreateGroup";
import GroupIcon from "@mui/icons-material/Group";
import { useSnackbar } from "notistack";
import { deleteUser } from "../../../../features/mainSlice";
import EditUser from "./EditUser";
import { getReq, postReq } from "../../../../utils/core";
/**
 * when no user exist this style work
 */
const StyledGridOverlay = styled("div")(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	height: "100%",
	"& .ant-empty-img-1": {
		fill: theme.palette.mode === "light" ? "#aeb8c2" : "#262626",
	},
	"& .ant-empty-img-2": {
		fill: theme.palette.mode === "light" ? "#f5f5f7" : "#595959",
	},
	"& .ant-empty-img-3": {
		fill: theme.palette.mode === "light" ? "#dce0e6" : "#434343",
	},
	"& .ant-empty-img-4": {
		fill: theme.palette.mode === "light" ? "#fff" : "#1c1c1c",
	},
	"& .ant-empty-img-5": {
		fillOpacity: theme.palette.mode === "light" ? "0.8" : "0.08",
		fill: theme.palette.mode === "light" ? "#f5f5f5" : "#fff",
	},
}));

export default function Users() {
	const {
		session,
		groups,
	} = useSelector((data) => data.mainSlice);
	const [users, setUsers] = React.useState([]);
	const [selection, setSelection] = React.useState([]);
	const dispatch = useDispatch();
	const { enqueueSnackbar } = useSnackbar();
	const [open, setOpen] = React.useState(false);
	const [groupOpen, setGroupOpen] = React.useState(false);
	const [confirmation, setConfirmation] = React.useState({
		message: "",
		open: false,
		callback: () => {},
	});
	const [updateModal, setUpdateModal] = React.useState({
		open: false,
		id: -1,
	});
	const handleOpen = React.useCallback(() => setOpen(true), []);
	const handleClose = React.useCallback(() => setOpen(false), []);
	const handleGroupOpen = React.useCallback(() => setGroupOpen(true), []);
	const handleGroupClose = React.useCallback(() => setGroupOpen(false), []);
	const updateClose = React.useCallback(
		() =>
			setUpdateModal({
				open: false,
				id: -1,
			}),
		[]
	);
	const updateOpen = React.useCallback((id) => {
		setUpdateModal({
			open: true,
			id: id,
		});
	}, []);
	const confirmationClose = React.useCallback(
		() =>
			setConfirmation({
				message: "",
				open: false,
			}),
		[]
	);
	const confirmationOpen = React.useCallback(
		(msg, callback) =>
			setConfirmation({
				message: msg,
				open: true,
				callback: callback,
			}),
		[]
	);

	const singleDelete = async (e, row) => {
		e.stopPropagation();
      const data = await getReq(`user_delete/${row.id}`);
      if (data.success) {
        getUsers()
        enqueueSnackbar(data?.message, {
          variant: "success",
        });
      } else {
        enqueueSnackbar(data?.message, {
          variant: "error",
        });
      }

    };

	const editUser = (e, row) => {
		e.stopPropagation();
		updateOpen(row.id);
	};
	const bulkDelete = () => {
		confirmationOpen("Are you sure want to delete selected users?", () => {
			dispatch(deleteUser({ ids: selection }));
			enqueueSnackbar(`All selected users deleted successfully.`, {
				variant: "success",
			});
			confirmationClose();
		});
	};
	const onSelection = (ids) => {
		setSelection([...ids]);
	};
	const getUsers = async (payload) => {
		const data = await postReq("users", payload);
		if (data?.success) {
			setUsers(data?.data ?? []);
		} else {
			enqueueSnackbar(data?.message, {
				variant: "error",
			});
		}
	};
  React.useEffect(()=>{
    getUsers()
  },[open,groupOpen,confirmation,updateModal])
	return (
		<>
			<Box sx={{ mt: 2, mb: 1 }}>
				<Stack
					direction={{ xs: "row", sm: "row" }}
					spacing={{ xs: 1, sm: 1, md: 1 }}
				>
					<Button
						variant="contained"
						color="primary"
						size="small"
						sx={{ mt: 3 }}
						onClick={handleOpen}
						startIcon={<PersonAddIcon />}
					>
						Create user
					</Button>
					<Button
						variant="contained"
						color="secondary"
						size="small"
						sx={{ mt: 3 }}
						onClick={handleGroupOpen}
						startIcon={<GroupAddIcon />}
					>
						Add New Group
					</Button>
					<Button
						variant="contained"
						color="error"
						size="small"
						disabled={!selection.length}
						sx={{ mt: 3 }}
						onClick={bulkDelete}
						startIcon={<DeleteIcon />}
					>
						Bulk Delete
					</Button>
				</Stack>
			</Box>
			<div
				style={{
					maxHeight: "80vh",
					height: "75vh",
					maxWidth: "90vw",
				}}
			>
				<DataGrid
					rows={users.filter((el) => el.id !== session?.id)}
					columns={[
						...columns,
						{
							field: "group",
							headerName: "Groups",
							description:
								"This column has a value getter and is not sortable.",
							sortable: false,
							width: 300,
							renderCell: (value, row) =>
								value.value.map((el) => {
									const group = groups.find(
										(grp) => grp.name.toLowerCase() == el.toLowerCase()
									);
									const color = getColorById(group.id);

									return (
										<Chip
											sx={{ marginRight: 1, background: color }}
											icon={<GroupIcon />}
											size="small"
											label={toTitleCase(el)}
										/>
									);
								}),
						},
						{
							type: "actions",
							headerName: "Actions",
							sortable: false,
							filterable: false,
							width: 120,
							renderCell: (value, row) => (
								<div
									style={{
										display: "flex",
										alignItems: "center",
										justifyContent: "space-around",
										gap: "10px",
									}}
								>
									<IconButton onClick={(e) => editUser(e, value)}>
										<EditIcon color="primary" />
									</IconButton>
									<IconButton onClick={(e) => singleDelete(e, value)}>
										<DeleteIcon color="error" />
									</IconButton>
								</div>
							),
						},
					]}
					slots={{
						noRowsOverlay: () => {
							return (
								<StyledGridOverlay>
									<svg
										width="120"
										height="100"
										viewBox="0 0 184 152"
										aria-hidden
										focusable="false"
									>
										<g fill="none" fillRule="evenodd">
											<g transform="translate(24 31.67)">
												<ellipse
													className="ant-empty-img-5"
													cx="67.797"
													cy="106.89"
													rx="67.797"
													ry="12.668"
												/>
												<path
													className="ant-empty-img-1"
													d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
												/>
												<path
													className="ant-empty-img-2"
													d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
												/>
												<path
													className="ant-empty-img-3"
													d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
												/>
											</g>
											<path
												className="ant-empty-img-3"
												d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
											/>
											<g
												className="ant-empty-img-4"
												transform="translate(149.65 15.383)"
											>
												<ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
												<path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
											</g>
										</g>
									</svg>
									<Box sx={{ mt: 1 }}>No Data Available</Box>
									<Button
										variant="contained"
										color="primary"
										size="small"
										sx={{ mt: 3 }}
										onClick={handleOpen}
										startIcon={<PersonAddIcon />}
									>
										Create user
									</Button>
								</StyledGridOverlay>
							);
						},
					}}
					onRowSelectionModelChange={onSelection}
					initialState={{
						pagination: {
							paginationModel: { page: 0, pageSize: 10 },
						},
					}}
					pageSizeOptions={[10, 25, 50, 100]}
					checkboxSelection
				/>
				<CreateUser
					open={open}
					handleClose={handleClose}
					handleOpen={handleOpen}
				/>
				<EditUser
					open={updateModal.open}
					handleClose={updateClose}
					handleOpen={updateOpen}
					id={updateModal.id}
				/>
				<CreateGroup
					open={groupOpen}
					handleClose={handleGroupClose}
					handleOpen={handleGroupOpen}
				/>
				<Modal
					open={confirmation.open}
					onClose={confirmationClose}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box
						sx={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							width: 500,
							maxWidth: "calc(100vw - 40px)",
						}}
					>
						<Card sx={{ maxWidth: "100%", p: 2 }} variant="elevation">
							<CardContent>
								<div
									style={{
										display: "flex",
										justifyContent: "center",
										marginBottom: 15,
									}}
								>
									<InfoIcon color="warning" sx={{ fontSize: 50 }} />
								</div>
								<Typography
									gutterBottom
									variant="h6"
									component="p"
									sx={{ fontSize: 18 }}
								>
									{confirmation.message}
								</Typography>
							</CardContent>
							<hr />
							<CardActions>
								<Button onClick={confirmationClose}>Close</Button>
								<Button
									variant="contained"
									color="error"
									onClick={confirmation.callback}
								>
									Proceed
								</Button>
							</CardActions>
						</Card>
					</Box>
				</Modal>
			</div>
		</>
	);
}
