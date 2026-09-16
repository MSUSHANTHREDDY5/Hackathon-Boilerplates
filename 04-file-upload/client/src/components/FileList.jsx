import React from 'react';

const FileList = ({ files, onDownload, onDelete, downloadingId, deletingId }) => {
  if (!files || files.length === 0) {
    return (
      <div className="empty-state">
        <p>No files uploaded yet.</p>
      </div>
    );
  }

  const formatSize = (bytes) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="table-responsive">
      <table className="files-table">
        <thead>
          <tr>
            <th>Original Filename</th>
            <th>Type</th>
            <th>Size</th>
            <th>Uploaded Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <tr key={file._id}>
              <td>
                <strong>{file.originalName}</strong>
              </td>
              <td>
                <span className="badge badge-type">{file.mimeType}</span>
              </td>
              <td>{formatSize(file.size)}</td>
              <td>{new Date(file.createdAt).toLocaleString()}</td>
              <td className="actions-cell">
                <button
                  onClick={() => onDownload(file._id, file.originalName)}
                  className="btn btn-sm btn-download"
                  disabled={downloadingId === file._id}
                >
                  {downloadingId === file._id ? 'Downloading...' : 'Download'}
                </button>
                <button
                  onClick={() => onDelete(file._id)}
                  className="btn btn-sm btn-delete"
                  disabled={deletingId === file._id}
                >
                  {deletingId === file._id ? 'Deleting...' : 'Delete'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FileList;
