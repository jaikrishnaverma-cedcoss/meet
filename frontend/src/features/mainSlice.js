import { createSlice } from "@reduxjs/toolkit";
import { initial_demo_users } from "../utils/tools";
/**
 * initial state for our reducer which is mainSlice
 */
const initialState = {
  users: initial_demo_users,
  groups: [
    { id: 1, name: "Group1" },
    { id: 2, name: "Group2" },
    { id: 3, name: "Group3" },
  ],
  session: null,
  loading: true,
  message: "",
};

const mainSlice = createSlice({
  name: "mainSlice",
  initialState,
  reducers: {
    registration(state, action) {
      const id = state.users.length
        ? state.users[state.users.length - 1].id + 1
        : 1035;
      state.users.push({
        id,
        role: "user",
        group: [],
        pic: "/default_pic.png",
        ...action.payload,
        userName: action.payload.firstName + id,
      });
    },
    logOut(state, action) {
      state.session = null;
    },
    updateUser(state, action) {
      const { id, updated_details } = action.payload;
      const index = state.users.findIndex((el) => el.id == id);
      if (index != -1) {
        state.users[index] = {
          ...state.users[index],
          ...updated_details,
        };
      }
    },
    updatePic(state, action) {
      const { pic, id } = action.payload;
      const index = state.users.findIndex((el) => el.id == id);
      if (index != -1) {
        state.users[index].pic = pic;
      }
    },
    setSession(state, action) {
      state.session = action.payload;
    },
    createGroup(state, action) {
      const { name, users } = action.payload;
      const id = state.groups.length
        ? state.groups[state.groups.length - 1].id + 1
        : 0;
      state.groups.push({ id, name });
      state.users = state.users.map((el) => {
        if (
          users.find((user) => user.id == el.id) &&
          !el.group.find((grp) => grp.name == name)
        ) {
          return {
            ...el,
            group: [...el.group, name],
          };
        }
        return el;
      });
    },
    deleteUser(state, action) {
      const { ids } = action.payload;
      state.users = state.users.filter(
        (user) => !ids.find((el) => el == user.id)
      );
    },
  },
});

/**
 * here exporting all action of our reducer to use
 */
export const {
  registration,
  updateUser,
  setSession,
  createGroup,
  deleteUser,
  logOut,
  updatePic
} = mainSlice.actions;
export default mainSlice.reducer;
