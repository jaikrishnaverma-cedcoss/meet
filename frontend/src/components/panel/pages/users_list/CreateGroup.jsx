import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  Autocomplete,
  Button,
  Checkbox,
  Chip,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toTitleCase } from "../../../../utils/tools";
import { useSnackbar } from "notistack";
import { createGroup } from "../../../../features/mainSlice";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
export const style = {
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

export default function CreateGroup({ open, handleClose }) {
  const { users, groups } = useSelector((data) => data.mainSlice);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [inputs, setInputs] = React.useState({
    name: "",
    users: [],
  });
  React.useEffect(() => {
    setInputs({
      name: "",
      users: [],
    });
  }, [open]);
  const handleSubmit = () => {
    const { name, users } = inputs;
    if (name) {
      if (users.length < 2) {
        enqueueSnackbar("At least 2 members required.", {
          variant: "error",
        });
      } else if (
        groups.find((el) => el.name.toLowerCase() == name.toLowerCase())
      ) {
        enqueueSnackbar("Group already exist with this name.", {
          variant: "error",
        });
      } else {
        dispatch(createGroup({ name, users }));
        enqueueSnackbar(
          `Group Created Successfully with name ${toTitleCase(name)}.`,
          {
            variant: "success",
          }
        );
        handleClose();
      }
    } else {
      enqueueSnackbar("Group name required.", {
        variant: "error",
      });
    }
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          level="h1"
          fontFamily={"sans-serif"}
          sx={{ fontSize: 22, mb: 2, fontWeight: 700, textAlign: "center" }}
        >
          Create Group Form
        </Typography>

        <Box
          component="div"
          noValidate
          sx={{ display: "flex", flexDirection: "column", gap: "12px" }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="group_name"
            label="New Group Name"
            name="name"
            value={inputs.name}
            onChange={(el) => setInputs({ ...inputs, name: el.target.value })}
            autoFocus
          />

          <Autocomplete
            limitTags={3}
            defaultValue={[]}
            sx={{ maxWidth: "100%" }}
            multiple
            id="checkboxes-tags-demo"
            noOptionsText="No friends available."
            options={users}
            value={inputs.users}
            getOptionLabel={(option) => option.firstName}
            onChange={(event, newValue) => {
              setInputs((prev) => {
                prev.users = [
                  ...newValue.map((option) => {
                    const alreadyIndex = prev.users.findIndex(
                      (item) => item.id == option.id
                    );
                    if (alreadyIndex !== -1) return prev.users[alreadyIndex];
                    else return option;
                  }),
                ];
                return { ...prev };
              });
            }}
            renderTags={(tagValue, getTagProps) =>
              tagValue.map((option, index) => (
                <Chip  label={option.firstName} {...getTagProps({ index })} />
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
                {toTitleCase(option.firstName)}
              </li>
            )}
            style={{ width: 500 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Group Members"
                placeholder="choose Members"
              />
            )}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            Create Group
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
