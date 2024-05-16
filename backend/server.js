const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors"); // Import cors package
const User = require("./models/user");
const app = express();
const PORT = process.env.PORT || 3004;
const mongo_uri =
	"mongodb+srv://jaikrishnaverma:7gmvAgQhVbjLIUnq@demodata.zbvpe1f.mongodb.net/nextAuth";
// MongoDB connection
mongoose.connect(mongo_uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Routes
app.post("/api/register", async (req, res) => {
	try {
		const { email, password, lastName, firstName, group, role } = req.body;
		const exist = await User.findOne({ email });

		if (exist) {
			return res
				.status(200)
				.json({ success: false, message: "Email Already Exist." });
		}
		const user = new User({
			email,
			password,
			lastName,
			firstName,
			group: group ?? [],
			role: role ?? "user",
		});
		await user.save();
		res
			.status(201)
			.json({ success: true, message: "User registered successfully" });
	} catch (error) {
		console.log({ error });
		res.status(500).json({ success: false, error: "Failed to register user" });
	}
});

app.post("/api/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });

		if (!user) {
			return res
				.status(200)
				.json({ success: false, message: "User not found" });
		}

		if (password !== user.password) {
			return res
				.status(200)
				.json({ success: false, message: "Invalid password" });
		}

		// Generate JWT token
		const token = jwt.sign({ userId: user._id }, "secretKey");
		console.log({ user });

		res.json({
			session: {
				id: user._id,
				lastName: user.lastName,
				firstName: user.firstName,
				email: user.email,
				role: user.role,
				group: user.group,
				pic: user.pic,
				token,
			},
			success: true,
			message: "logged in.",
		});
	} catch (error) {
		res.status(200).json({ success: false, message: "Failed to login" });
	}
});
app.post("/api/user/:id", authenticateToken, async (req, res) => {
	try {
		const userId = req.params.id;
		const { firstName, lastName, email, role, group, pic, password } = req.body;

		// Find the user by ID
		const user = await User.findById(userId);

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		// Update user details
		user.firstName = firstName || user.firstName;
		user.lastName = lastName || user.lastName;
		user.email = email || user.email;
		user.role = role || user.role;
		user.group = group || user.group;
		user.pic = pic || user.pic;
		user.password = password || user.password;

		// Save updated user
		await user.save();

		res.json({
			success: true,
			message: "User details updated successfully",
			user,
		});
	} catch (error) {
		console.error("Error updating user details:", error);
		res
			.status(200)
			.json({ success: false, message: "Failed to update user details" });
	}
});
app.get("/api/user/:id", authenticateToken, async (req, res) => {
	try {
		const userId = req.params.id;
		// Find the user by ID
		const user = await User.findById(userId);

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
		res.json({ success: true, message: "User details", data: user });
	} catch (error) {
		console.error("Error updating user details:", error);
		res
			.status(200)
			.json({ success: false, message: "Failed to get user details" });
	}
});
app.post("/api/users", authenticateToken, async (req, res) => {
	try {
		// Find all users
		const users = await User.find({}, "-password").lean();

		// Modify _id field to id in each user object
		const modifiedUsers = users.map((user) => {
			return { ...user, id: user._id };
		});

		res.json({ success: true, message: "", data: modifiedUsers });
	} catch (error) {
		console.error("Error fetching users:", error);
		res.status(200).json({ success: false, message: "Failed to fetch users" });
	}
});
app.get("/api/user_delete/:id", authenticateToken, async (req, res) => {
	try {
		const userId = req.params.id;

		// Find user by ID and delete
		const user = await User.findByIdAndDelete(userId);

		if (!user) {
			return res
				.status(200)
				.json({ success: false, message: "User not found" });
		}

		res.json({ success: true, message: "User deleted successfully" });
	} catch (error) {
		console.error("Error deleting user:", error);
		res.status(200).json({ success: false, message: "Failed to delete user" });
	}
});
// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (token == null) {
		return res.status(401).json({ error: "Token is missing" });
	}

	jwt.verify(token, "secretKey", (err, user) => {
		if (err) {
			return res.status(403).json({ error: "Invalid token" });
		}
		req.user = user;
		next();
	});
}

app.get("/api/protected", authenticateToken, (req, res) => {
	res.json({ message: "Access granted" });
});

// Start server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
