import React, { useState, useEffect } from 'react';
import FileUploadForm from '../components/FileUploadForm';
import FileList from '../components/FileList';
import {
  getFiles,
  uploadFile,
  downloadFile,
  deleteFile
} from '../services/fileService';

const FilesPage = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [downloadingId, setDownloadingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const fetchFiles = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getFiles();
      if (res.success && res.data?.files) {
        setFiles(res.data.files);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch files from server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleUpload = async (fileObject) => {
    setSubmitting(true);
    setError('');
    setSuccessMsg('');
    try {
      const res = await uploadFile(fileObject);
      setSuccessMsg(`File '${res.data?.file?.originalName || 'file'}' uploaded successfully!`);
      await fetchFiles();
    } catch (err) {
      setError(err.message || 'Upload failed.');
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  const handleDownload = async (id, originalName) => {
    setDownloadingId(id);
    setError('');
    try {
      await downloadFile(id, originalName);
    } catch (err) {
      setError(err.message || 'Failed to download file.');
    } finally {
      setDownloadingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this file from disk and database?')) return;
    setDeletingId(id);
    setError('');
    setSuccessMsg('');
    try {
      await deleteFile(id);
      setSuccessMsg('File and metadata deleted successfully.');
      await fetchFiles();
    } catch (err) {
      setError(err.message || 'Failed to delete file.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="container">
      <header className="page-header">
        <h2>File Upload Management</h2>
        <p className="page-subtitle">
          Demonstrating Multer Disk Storage, File Validation (Max 5 MB, JPG/PNG/WEBP/PDF/TXT), and MongoDB Metadata Tracking
        </p>
      </header>

      {error && <div className="alert alert-error">{error}</div>}
      {successMsg && <div className="alert alert-success">{successMsg}</div>}

      <div className="layout-grid">
        <div className="form-column">
          <FileUploadForm onUploadSuccess={handleUpload} submitting={submitting} />
        </div>

        <div className="list-column">
          <div className="card">
            <div className="card-header">
              <h3>Uploaded Files Repository</h3>
              <span className="badge badge-count">Total: {files.length}</span>
            </div>

            {loading ? (
              <div className="loading-spinner">Loading files from server...</div>
            ) : (
              <FileList
                files={files}
                onDownload={handleDownload}
                onDelete={handleDelete}
                downloadingId={downloadingId}
                deletingId={deletingId}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilesPage;
