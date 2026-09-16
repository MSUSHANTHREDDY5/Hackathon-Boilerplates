import React, { useState, useEffect } from 'react';

const ItemForm = ({ editingItem, onSubmit, onCancel, isSubmitting }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'active'
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (editingItem) {
      setFormData({
        name: editingItem.name || '',
        description: editingItem.description || '',
        status: editingItem.status || 'active'
      });
      setError(null);
    } else {
      setFormData({
        name: '',
        description: '',
        status: 'active'
      });
      setError(null);
    }
  }, [editingItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    // Client-side validation
    if (!formData.name || formData.name.trim() === '') {
      setError('Item name is required and cannot be empty');
      return;
    }

    onSubmit({
      name: formData.name.trim(),
      description: formData.description.trim(),
      status: formData.status
    });
  };

  return (
    <div className="card form-card">
      <h2 className="form-title">{editingItem ? 'Edit Item' : 'Create New Item'}</h2>

      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="name">Item Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            placeholder="Enter item name"
            value={formData.name}
            onChange={handleChange}
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            rows="3"
            placeholder="Enter item description (optional)"
            value={formData.description}
            onChange={handleChange}
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            className="form-control"
            value={formData.status}
            onChange={handleChange}
            disabled={isSubmitting}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : editingItem ? 'Update Item' : 'Create Item'}
          </button>

          {editingItem && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ItemForm;
