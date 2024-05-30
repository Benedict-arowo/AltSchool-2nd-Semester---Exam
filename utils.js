const jwt = require("jsonwebtoken");
const ErrorWithStatus = require("./middlewears/ErrorWithStatus");
const { StatusCodes } = require("http-status-codes");
require("dotenv").config({});

const REFRESH_TOKEN_EXPIRY = "7d";
const ACCESS_TOKEN_EXPIRY = "1h";
const AVERAGE_WORDS_PER_MINUTE = 215;

/**
 * Checks if the required fields are present in the given array of fields.
 * Throws an error if any required field is missing.
 *
 * @param {Array} fields - The array of fields to be checked.
 * @throws {ErrorWithStatus} Throws an error with status code 400 if any required field is missing.
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
		expiresIn: ACCESS_TOKEN_EXPIRY,
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
		expiresIn: REFRESH_TOKEN_EXPIRY,
	});
};

function constructCacheKey({ limit, page, query }) {
	const { author, title, tags, orderBy, orderDirection } = query;

	// Normalize and encode parameters
	const encodedLimit = `limit:${limit}`;
	const encodedPage = `page:${page}`;
	const encodedAuthor = author ? `author:${encodeURIComponent(author)}` : "";
	const encodedTitle = title ? `title:${encodeURIComponent(title)}` : "";
	const encodedTags = tags
		? `tags:${
				Array.isArray(tags)
					? tags.map(encodeURIComponent).join(",")
					: tags
		  }`
		: "";
	const encodedOrderBy = orderBy ? `orderBy:${orderBy.toLowerCase()}` : "";
	const encodedOrderDirection = orderDirection
		? `orderDirection:${orderDirection.toLowerCase()}`
		: "";

	// Concatenate parts with hyphen as delimiter
	const keyParts = [
		encodedLimit,
		encodedPage,
		encodedAuthor,
		encodedTitle,
		encodedTags,
		encodedOrderBy,
		encodedOrderDirection,
		"getAllBlogs",
	];

	// Filter out empty parts and join with hyphen
	return keyParts.filter((part) => part).join("-");
}

module.exports = {
	checkFields,
	generateAccessToken,
	generateRefreshToken,
	REFRESH_TOKEN_EXPIRY,
	ACCESS_TOKEN_EXPIRY,
	AVERAGE_WORDS_PER_MINUTE,
	constructCacheKey,
};
