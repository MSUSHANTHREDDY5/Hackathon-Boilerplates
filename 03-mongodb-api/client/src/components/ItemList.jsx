import React from 'react';

const ItemList = ({ items, onEdit, onDelete, onToggleActive }) => {
  if (!items || items.length === 0) {
    return (
      <div className="empty-state">
        <p>No items found in database. Create your first item above.</p>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="items-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Description</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>
                <strong>{item.name}</strong>
              </td>
              <td>
                <span className="badge badge-category">{item.category}</span>
              </td>
              <td>{item.description || <span style={{ color: '#aaa' }}>No description</span>}</td>
              <td>
                <span className={`badge ${item.isActive ? 'badge-success' : 'badge-inactive'}`}>
                  {item.isActive ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td>{new Date(item.createdAt).toLocaleString()}</td>
              <td className="actions-cell">
                <button onClick={() => onEdit(item)} className="btn btn-sm btn-edit">
                  Edit
                </button>
                <button
                  onClick={() => onToggleActive(item)}
                  className="btn btn-sm btn-toggle"
                >
                  {item.isActive ? 'Deactivate' : 'Activate'}
                </button>
                <button onClick={() => onDelete(item._id)} className="btn btn-sm btn-delete">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemList;
