require("dotenv").config({ path: ".env" });
const express = require("express");
const app = express();
const connectDB = require("./connectDb");
const PORT = process.env.PORT || 5000;
const applyRoutes = require("./routes");

applyRoutes(app);

// Start the server if not being used as a library
if (!module.parent) {
	connectDB(process.env.MONGOD_DB_URI);

	app.listen(PORT, () => {
		console.log(`Server is listening on PORT ${PORT}`);
	});
}

module.exports = app;
