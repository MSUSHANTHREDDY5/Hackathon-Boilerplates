const { sendError } = require('../utils/response');

/**
 * Unknown API route 404 handler
 */
const notFound = (req, res, next) => {
  return sendError(res, 404, `Cannot find route ${req.originalUrl} on this server`);
};

module.exports = notFound;
