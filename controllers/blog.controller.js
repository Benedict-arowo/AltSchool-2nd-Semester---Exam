const { StatusCodes } = require("http-status-codes");
const {
	createBlogService,
	getBlogsService,
	getBlogService,
	deleteBlogService,
	getUserBlogService,
	updateBlogService,
} = require("../services/blog.service");
const { constructCacheKey } = require("../utils");
const ErrorWithStatus = require("../middlewears/ErrorWithStatus");
const redisClientPromise = require("../redisClient");

const timeInSeconds = 60 * 10;

const createBlog = async (req, res) => {
	const newBlog = await createBlogService({ user: req.user, data: req.body });
	return res.status(StatusCodes.CREATED).json({
		message: "success",
		data: newBlog,
	});
};

const getUserBlog = async (req, res) => {
	const { limit = 20, page = 1, state } = req.query;

	const blogs = await getUserBlogService(req.user.id, { limit, page, state });
	return res.status(StatusCodes.OK).json({
		message: "success",
		data: blogs,
	});
};
const getBlog = async (req, res) => {
	const { id } = req.params;
	const blog = await getBlogService({ id, user: req.user });

	return res.status(StatusCodes.OK).json({
		message: "success",
		data: blog,
	});
};

const getBlogs = async (req, res) => {
	const { limit, page, author, title, tags, orderBy, orderDirection } =
		req.query;
	const key = constructCacheKey({
		limit,
		page,
		query: { author, title, tags },
	});
	try {
		const redisClient = await redisClientPromise;
		const cache = await redisClient.get(key);

		if (cache) {
			// Returns data from cache, if it exists
			return res.status(StatusCodes.OK).json({
				message: "success",
				data: JSON.parse(cache),
			});
		}

		// Fetches data from database due to it not existing in the cache
		const blogs = await getBlogsService({
			limit,
			page,
			query: { author, title, tags, orderBy, orderDirection },
		});

		// Adding the data that did to the cache
		await redisClient.set(key, JSON.stringify(blogs), "EX", timeInSeconds);

		return res.status(StatusCodes.OK).json({
			message: "success",
			data: blogs,
		});
	} catch (error) {
		throw new ErrorWithStatus(
			error.message,
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
};

const updateBlog = async (req, res) => {
	const { id } = req.params;
	const blog = await updateBlogService({
		id,
		data: req.body,
		user_id: req.user.id,
	});

	return res.status(StatusCodes.OK).json({
		message: "success",
		data: blog,
	});
};

const deleteBlog = async (req, res) => {
	const { id } = req.params;
	await deleteBlogService({ id, user_id: req.user.id });
	return res.status(StatusCodes.NO_CONTENT).json({
		message: "success",
	});
};

module.exports = {
	getBlog,
	getBlogs,
	updateBlog,
	deleteBlog,
	createBlog,
	getUserBlog,
};
