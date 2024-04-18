const jwt = require("jsonwebtoken");
const ErrorWithStatus = require("./middlewears/ErrorWithStatus");
const { StatusCodes } = require("http-status-codes");
require("dotenv").config({});
/**
 * Checks if the required fields are present in an array of objects.
 * @param {Array} fields - The array of objects to check.
 * @returns {Array} - An array containing the names of the fields that are missing.
 */
const checkFields = (fields) => {
	const err = [];
	fields.forEach((field) => {
		if (!field.field) err.push(field.name);
	});

	if (err.length !== 0)
		throw new ErrorWithStatus(
			"Required fields, " + err.join(", "),
			StatusCodes.BAD_REQUEST
		);
	return;
};

/**
 * Generates an access token using the provided payload.
 *
 * @param {Object} payload - The payload to be signed.
 * @returns {string} The generated access token.
 */
const generateAccessToken = (payload) => {
	return jwt.sign(payload, process.env.JWT_SECRET, {
		expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
	});
};

/**
 * Generates a refresh token using the provided payload.
 *
 * @param {object} payload - The payload to be signed.
 * @returns {string} - The generated refresh token.
 */
const generateRefreshToken = (payload) => {
	return jwt.sign(payload, process.env.JWT_SECRET, {
		expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
	});
};

module.exports = {
	checkFields,
	generateAccessToken,
	generateRefreshToken,
};
