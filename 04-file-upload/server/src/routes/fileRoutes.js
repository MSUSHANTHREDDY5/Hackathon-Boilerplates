const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
const { uploadSingleFile } = require('../middleware/uploadMiddleware');

router.post('/', uploadSingleFile, fileController.uploadFile);
router.get('/', fileController.getFiles);
router.get('/:id', fileController.getFileById);
router.get('/:id/download', fileController.downloadFile);
router.delete('/:id', fileController.deleteFile);

module.exports = router;
