import React, { useState, useRef } from 'react';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf', 'text/plain'];
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

const FileUploadForm = ({ onUploadSuccess, submitting }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    setError('');
    const file = e.target.files[0];

    if (!file) {
      setSelectedFile(null);
      return;
    }

    // Client-side pre-validation for user experience
    if (file.size > MAX_SIZE_BYTES) {
      setError(`File size exceeds maximum allowed limit of 5 MB (${(file.size / (1024 * 1024)).toFixed(2)} MB select)`);
      setSelectedFile(null);
      return;
    }

    if (!ALLOWED_TYPES.includes(file.type.toLowerCase())) {
      setError(`Unsupported file type '${file.type || 'unknown'}'. Allowed: JPG, PNG, WEBP, PDF, TXT.`);
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setError('Please select a valid file to upload.');
      return;
    }

    try {
      await onUploadSuccess(selectedFile);
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      setError(err.message || 'Failed to upload file.');
    }
  };

  const formatSize = (bytes) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="card form-card">
      <h3>Upload File</h3>
      <p className="card-subtitle">Supported formats: JPG, PNG, WEBP, PDF, TXT (Max 5 MB)</p>

      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="file-input">Select File from System</label>
          <input
            id="file-input"
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".jpg,.jpeg,.png,.webp,.pdf,.txt,image/jpeg,image/png,image/webp,application/pdf,text/plain"
            required
          />
        </div>

        {selectedFile && (
          <div className="file-preview">
            <p><strong>Selected File:</strong> {selectedFile.name}</p>
            <p><strong>Size:</strong> {formatSize(selectedFile.size)}</p>
            <p><strong>Type:</strong> {selectedFile.type || 'plain text / document'}</p>
          </div>
        )}

        <button type="submit" className="btn btn-primary" disabled={!selectedFile || submitting}>
          {submitting ? 'Uploading File...' : 'Upload File'}
        </button>
      </form>
    </div>
  );
};

export default FileUploadForm;
