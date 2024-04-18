require("dotenv").config({ path: ".env" });
const express = require("express");
const app = express();
const userRouter = require("./routes/user.route");
const blogRouter = require("./routes/blog.route");
const connectDB = require("./connectDb");
const morgan = require("morgan");
const ErrorHandler = require("./middlewears/ErrorHandler");
const IsAuthenticated = require("./middlewears/IsAuthenticated");
const PORT = process.env.PORT || 5000;

app.use(morgan("dev"));
app.use(express.json());

app.use("/auth", userRouter);
app.use("/blog", blogRouter);

app.route("/").get(IsAuthenticated, (req, res) => {
	res.json({
		hello: "world",
	});
});

app.use(ErrorHandler);
// app.listen(PORT, () => {
// 	console.log(`Server is listening on PORT ${PORT}`);
// });

module.exports = app; // Export the app object

// Start the server if not being used as a library
if (!module.parent) {
	connectDB(process.env.MONGOD_DB_URI);

	app.listen(PORT, () => {
		console.log(`Server is listening on PORT ${PORT}`);
	});
}
