import { Avatar } from "@mui/material";

/**
 * 
 * @param {*} str string
 * @returns titalCase of that string
 */
export function toTitleCase(str) {
  return str
    .split("_")
    .map((el) => {
      return el.replace(/\b\w/g, function (match) {
        return match.toUpperCase();
      });
    })
    .join(" ");
}
/**
 * Colors for Groups
 */
const lightColors = [
  "#FFF9C4", // Light yellow
  "#D7FFFE", // Light cyan
  "#FFE4E1", // Light pink
  "#D9F7BE", // Light green
  "#E2E2F9", // Light blue
];
/**
 * 
 * @param {*} id number
 * @returns color hexcode 
 */
export function getColorById(id) {
  return lightColors[parseInt(id % 4)];
}
/**
 * user table Data grid header columns  
 */
export const columns = [
  { field: "id", headerName: "ID", width: 90, type: "number" },
  {
    field: "userName",
    headerName: "User Name",
    width: 130,
    flex: true,
    valueGetter: (value, row) => "#" + row.userName,
  },
  {
    field: "firstName",
    headerName: "Full name",
    width: 130,
    flex: true,
    renderCell: (values) => {
      const { row } = values;
      return (
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Avatar alt={row.firstName} src={row.pic} />
          {toTitleCase(row.firstName + " " + row.lastName)}
        </div>
      );
    },
  },
  {
    field: "role",
    headerName: "Role",
    width: 100,
    flex: true,
    valueGetter: (value, row) => toTitleCase(row.role),
  },
  {
    field: "email",
    headerName: "Email",
    width: 150,
    flex: true,
  },
];
export const initial_demo_users = [
  {
    id: 1001,
    userName: "arjun1001",
    firstName: "arjun",
    lastName: "virat",
    email: "arjunvirat@example.com",
    password: "securepassword",
    role: "admin",
    group: ["Group1", "Group2", "Group3"],
    pic: "/default_pic.png",
  },
  {
    id: 1002,
    userName: "ram1002",
    firstName: "ram",
    lastName: "kapoor",
    email: "ram@example.com",
    password: "securepassword",
    role: "admin",
    group: ["Group1", "Group2", "Group3"],
    pic: "/default_pic.png",
  },
  {
    id: 1023,
    userName: "arjun1023",
    firstName: "arjun",
    lastName: "kapoor",
    email: "arjun@example.com",
    password: "securepassword",
    role: "admin",
    group: ["Group1", "Group2", "Group3"],
    pic: "/default_pic.png",
  },
  {
    id: 1034,
    userName: "jai1034",
    firstName: "jai",
    lastName: "verma",
    email: "jai@gmail.com",
    password: "123456",
    role: "admin",
    group: ["Group1", "Group2"],
    pic: "/default_pic.png",
  },
  {
    id: 2045,
    userName: "riya2045",
    firstName: "riya",
    lastName: "sharma",
    email: "riya@example.com",
    password: "qwerty",
    role: "user",
    group: ["Group1"],
    pic: "/default_pic.png",
  },
  {
    id: 3056,
    userName: "rahul3056",
    firstName: "rahul",
    lastName: "singh",
    email: "rahul@example.com",
    password: "password123",
    role: "user",
    group: ["Group2", "Group3"],
    pic: "/default_pic.png",
  },
  {
    id: 4067,
    userName: "neha4067",
    firstName: "neha",
    lastName: "gupta",
    email: "neha@example.com",
    password: "letmein",
    role: "admin",
    group: ["Group1", "Group3"],
    pic: "/default_pic.png",
  },
  {
    id: 5078,
    userName: "amit5078",
    firstName: "amit",
    lastName: "kumar",
    email: "amit@example.com",
    password: "securepass",
    role: "user",
    group: ["Group2"],
    pic: "/default_pic.png",
  },
  {
    id: 6089,
    userName: "priya6089",
    firstName: "priya",
    lastName: "desai",
    email: "priya@example.com",
    password: "mypassword",
    role: "user",
    group: ["Group1", "Group2", "Group3"],
    pic: "/default_pic.png",
  },
  {
    id: 7090,
    userName: "vijay7090",
    firstName: "vijay",
    lastName: "patel",
    email: "vijay@example.com",
    password: "password123",
    role: "admin",
    group: ["Group3"],
    pic: "/default_pic.png",
  },
  {
    id: 8001,
    userName: "sonal8001",
    firstName: "sonal",
    lastName: "shah",
    email: "sonal@example.com",
    password: "qwerty123",
    role: "user",
    group: ["Group2", "Group3"],
    pic: "/default_pic.png",
  },
  {
    id: 9012,
    userName: "nisha9012",
    firstName: "nisha",
    lastName: "kulkarni",
    email: "nisha@example.com",
    password: "letmein123",
    role: "user",
    group: ["Group1"],
    pic: "/default_pic.png",
  },
];
