const fs = require('fs');
const mongoose = require('mongoose');
const fileService = require('../services/fileService');
const { sendSuccess, sendError } = require('../utils/response');

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

/**
 * @desc    Upload file and save metadata
 * @route   POST /api/files
 * @access  Public
 */
const uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return sendError(res, 400, 'Please select a file to upload');
    }

    const fileDoc = await fileService.saveFileMetadata({
      originalName: req.file.originalname,
      storedName: req.file.filename,
      mimeType: req.file.mimetype,
      size: req.file.size,
      filePath: req.file.path
    });

    return sendSuccess(res, 201, 'File uploaded successfully', {
      file: fileDoc
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all uploaded files metadata
 * @route   GET /api/files
 * @access  Public
 */
const getFiles = async (req, res, next) => {
  try {
    const files = await fileService.getAllFiles();
    return sendSuccess(res, 200, 'Files metadata retrieved successfully', {
      files,
      count: files.length
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single file metadata by ID
 * @route   GET /api/files/:id
 * @access  Public
 */
const getFileById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return sendError(res, 400, 'Invalid file ID format');
    }

    const fileDoc = await fileService.getFileById(id);
    return sendSuccess(res, 200, 'File metadata retrieved successfully', {
      file: fileDoc
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Download physical file by ID
 * @route   GET /api/files/:id/download
 * @access  Public
 */
const downloadFile = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return sendError(res, 400, 'Invalid file ID format');
    }

    const fileDoc = await fileService.getFileById(id);

    if (!fs.existsSync(fileDoc.path)) {
      return sendError(res, 404, 'Physical file missing from server storage');
    }

    // Send physical file for browser download using original file name
    return res.download(fileDoc.path, fileDoc.originalName);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete file metadata and physical file
 * @route   DELETE /api/files/:id
 * @access  Public
 */
const deleteFile = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return sendError(res, 400, 'Invalid file ID format');
    }

    await fileService.deleteFile(id);
    return sendSuccess(res, 200, 'File deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadFile,
  getFiles,
  getFileById,
  downloadFile,
  deleteFile
};
