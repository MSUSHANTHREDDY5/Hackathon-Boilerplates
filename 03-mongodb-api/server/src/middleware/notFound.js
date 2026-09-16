const { sendError } = require('../utils/response');

/**
 * Middleware for handling unknown API routes (404 Not Found)
 */
const notFound = (req, res, next) => {
  return sendError(res, 404, `Cannot find route ${req.originalUrl} on this server`);
};

module.exports = notFound;
