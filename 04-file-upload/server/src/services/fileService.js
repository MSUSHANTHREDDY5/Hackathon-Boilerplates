const fs = require('fs');
const path = require('path');
const FileModel = require('../models/File');

/**
 * Safely delete a physical file from local disk if it exists
 */
const cleanupPhysicalFile = (filePath) => {
  try {
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`[File Cleanup] Removed physical file: ${filePath}`);
    }
  } catch (err) {
    console.error(`[File Cleanup Error] Failed to delete file ${filePath}: ${err.message}`);
  }
};

/**
 * Save uploaded file metadata to MongoDB
 */
const saveFileMetadata = async ({ originalName, storedName, mimeType, size, filePath }) => {
  try {
    const fileDoc = await FileModel.create({
      originalName: originalName.trim(),
      storedName,
      mimeType,
      size,
      path: filePath
    });
    return fileDoc;
  } catch (err) {
    // SECURITY: If database metadata creation fails, remove physical uploaded file to prevent orphan files
    cleanupPhysicalFile(filePath);
    throw err;
  }
};

/**
 * Retrieve all file metadata records from MongoDB
 */
const getAllFiles = async () => {
  const files = await FileModel.find().sort({ createdAt: -1 });
  return files;
};

/**
 * Retrieve single file metadata record by ID
 */
const getFileById = async (id) => {
  const fileDoc = await FileModel.findById(id);
  if (!fileDoc) {
    const error = new Error('File metadata not found');
    error.statusCode = 404;
    throw error;
  }
  return fileDoc;
};

/**
 * Delete file metadata record from MongoDB and delete physical file from disk
 */
const deleteFile = async (id) => {
  const fileDoc = await FileModel.findById(id);
  if (!fileDoc) {
    const error = new Error('File metadata not found');
    error.statusCode = 404;
    throw error;
  }

  // 1. Delete record from MongoDB
  await FileModel.findByIdAndDelete(id);

  // 2. Remove physical file from disk
  cleanupPhysicalFile(fileDoc.path);

  return true;
};

module.exports = {
  cleanupPhysicalFile,
  saveFileMetadata,
  getAllFiles,
  getFileById,
  deleteFile
};
