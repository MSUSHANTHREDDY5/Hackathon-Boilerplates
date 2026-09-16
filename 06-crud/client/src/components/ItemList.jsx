import React from 'react';

const ItemList = ({ items, onEdit, onDelete, isLoading }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDeleteClick = (item) => {
    if (window.confirm(`Are you sure you want to delete "${item.name}"?`)) {
      onDelete(item._id);
    }
  };

  if (isLoading) {
    return (
      <div className="card list-card">
        <div className="loading-state">Loading items...</div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="card list-card">
        <div className="empty-state">
          <h3>No Items Found</h3>
          <p>Create your first item using the form above to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card list-card">
      <div className="list-header">
        <h2>Items List</h2>
        <span className="badge badge-count">{items.length} {items.length === 1 ? 'item' : 'items'}</span>
      </div>

      <div className="table-responsive">
        <table className="items-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td className="item-name">{item.name}</td>
                <td className="item-description">{item.description || '—'}</td>
                <td>
                  <span className={`badge badge-status badge-${item.status}`}>
                    {item.status}
                  </span>
                </td>
                <td className="item-date">{formatDate(item.createdAt)}</td>
                <td className="item-actions">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => onEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDeleteClick(item)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemList;
