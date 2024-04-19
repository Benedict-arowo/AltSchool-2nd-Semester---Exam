const morgan = require("morgan");
const express = require("express");
const userRouter = require("./user.route");
const blogRouter = require("./blog.route");
const ErrorHandler = require("../middlewears/ErrorHandler");

const applyRoutes = (app) => {
	app.use(morgan("dev"));
	app.use(express.json());

	app.use("/auth", userRouter);
	app.use("/blog", blogRouter);

	app.use(ErrorHandler);
};

module.exports = applyRoutes;
