import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { toTitleCase } from "../../../utils/tools";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import {
  Avatar,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
} from "@mui/material";
import CreateGroup from "./users_list/CreateGroup";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function GroupList() {
  const { groups, users } = useSelector((data) => data.mainSlice);
  const [value, setValue] = React.useState(0);
  const [groupOpen, setGroupOpen] = React.useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleGroupOpen = () => setGroupOpen(true);
  const handleGroupClose = () => setGroupOpen(false);
  return (
    <>
      <Box sx={{ mt: 2, mb: 1, }}>
        <Stack
          direction={{ xs: "row", sm: "row" }}
          spacing={{ xs: 1, sm: 1, md: 1 }}
        >
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
        </Stack>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          mt:2,
          bgcolor: "background.paper",
          display: "flex",
          justifyContent: "center",
          height: "70vh",
          maxHeight: "70vh",
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          {groups.map((group, index) => (
            <Tab key={"tab_left"+group.name} label={toTitleCase(group.name)} {...a11yProps(index)} />
          ))}
        </Tabs>
        {groups.map((group, index) => (
          <TabPanel key={"tab_panel"+group.name} value={value} index={index} sx={{ width: "100%" }}>
            Memebers
            <List
              sx={{
                width: "100vw",
                maxWidth: "52vw !important",
                maxHeight: "70vh",
                overflowY: "scroll",
                bgcolor: "background.paper",
              }}
            >
              {users
                .filter((user) =>
                  user.group.find(
                    (el) => el.toLowerCase() == group.name.toLowerCase()
                  )
                )
                .map((item,index) => {
                  return (
                    <>
                      <ListItem key={item.id+index+"user"} alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar alt={item.firstName} src={item.pic} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={toTitleCase(
                            item.firstName + " " + item.lastName
                          )}
                          secondary={
                            <React.Fragment>
                              <Typography
                                sx={{ display: "block" }}
                                component="p"
                                variant="body2"
                                color="text.primary"
                              >
                                {toTitleCase(item.role)}
                              </Typography>
                              {item.email}
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                      <Divider key={item.id+index+"devider"} variant="inset" component="li" />
                    </>
                  );
                })}
            </List>
          </TabPanel>
        ))}
        <CreateGroup
          open={groupOpen}
          handleClose={handleGroupClose}
          handleOpen={handleGroupOpen}
        />
      </Box>
    </>
  );
}
