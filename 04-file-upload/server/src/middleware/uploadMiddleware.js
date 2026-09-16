const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const { sendError } = require('../utils/response');

// Centralized allowed MIME types configuration
const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/pdf',
  'text/plain'
];

// Maximum allowed file size: 5 MB
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Configure Multer Disk Storage with safe filename generation
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../../uploads');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Generate unique random prefix + timestamp + original extension to prevent collisions and sanitize names
    const uniqueSuffix = `${Date.now()}-${crypto.randomBytes(8).toString('hex')}`;
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${uniqueSuffix}${ext}`);
  }
});

// File filter function for MIME type validation
const fileFilter = (req, file, cb) => {
  if (ALLOWED_MIME_TYPES.includes(file.mimetype.toLowerCase())) {
    cb(null, true);
  } else {
    const error = new Error(`Invalid file type '${file.mimetype}'. Allowed types: JPEG, PNG, WEBP, PDF, TXT.`);
    error.code = 'INVALID_FILE_TYPE';
    cb(error, false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE
  }
});

/**
 * Express middleware wrapper for handling single file upload with custom error responses
 */
const uploadSingleFile = (req, res, next) => {
  const singleUpload = upload.single('file');

  singleUpload(req, res, (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return sendError(res, 400, 'File size exceeds maximum allowed limit of 5 MB');
      }
      if (err.code === 'INVALID_FILE_TYPE') {
        return sendError(res, 400, err.message);
      }
      return sendError(res, 400, err.message || 'File upload error');
    }
    next();
  });
};

module.exports = {
  uploadSingleFile,
  ALLOWED_MIME_TYPES,
  MAX_FILE_SIZE
};
