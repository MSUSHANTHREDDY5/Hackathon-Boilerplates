const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema(
  {
    originalName: {
      type: String,
      required: [true, 'Original file name is required'],
      trim: true
    },
    storedName: {
      type: String,
      required: [true, 'Stored file name is required'],
      unique: true,
      trim: true
    },
    mimeType: {
      type: String,
      required: [true, 'MIME type is required'],
      trim: true
    },
    size: {
      type: Number,
      required: [true, 'File size is required']
    },
    path: {
      type: String,
      required: [true, 'File path is required']
    }
  },
  {
    timestamps: true
  }
);

const FileModel = mongoose.model('File', fileSchema);

module.exports = FileModel;
