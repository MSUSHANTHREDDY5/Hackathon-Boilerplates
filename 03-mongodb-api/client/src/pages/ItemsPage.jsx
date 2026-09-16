import React, { useState, useEffect } from 'react';
import ItemForm from '../components/ItemForm';
import ItemList from '../components/ItemList';
import {
  getItems,
  createItem,
  updateItem,
  deleteItem
} from '../services/itemService';

const ItemsPage = () => {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const fetchItems = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getItems();
      if (res.success && res.data?.items) {
        setItems(res.data.items);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch items from backend database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleFormSubmit = async (formData) => {
    setSubmitting(true);
    setError('');
    setSuccessMsg('');
    try {
      if (editingItem) {
        const res = await updateItem(editingItem._id, formData);
        setSuccessMsg('Item updated successfully!');
        setEditingItem(null);
      } else {
        const res = await createItem(formData);
        setSuccessMsg('Item created successfully!');
      }
      await fetchItems();
    } catch (err) {
      setError(err.message || 'Failed to save item.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    setError('');
    setSuccessMsg('');
    try {
      await deleteItem(id);
      setSuccessMsg('Item deleted successfully.');
      await fetchItems();
    } catch (err) {
      setError(err.message || 'Failed to delete item.');
    }
  };

  const handleToggleActive = async (item) => {
    setError('');
    setSuccessMsg('');
    try {
      await updateItem(item._id, { isActive: !item.isActive });
      setSuccessMsg(`Item ${!item.isActive ? 'activated' : 'deactivated'} successfully.`);
      await fetchItems();
    } catch (err) {
      setError(err.message || 'Failed to update item status.');
    }
  };

  return (
    <div className="container">
      <header className="page-header">
        <h2>Item Resource Management</h2>
        <p className="page-subtitle">
          Demonstrating Express → Mongoose Layered Architecture (Route → Controller → Service → Model → Database)
        </p>
      </header>

      {error && <div className="alert alert-error">{error}</div>}
      {successMsg && <div className="alert alert-success">{successMsg}</div>}

      <div className="layout-grid">
        <div className="form-column">
          <ItemForm
            onSubmit={handleFormSubmit}
            editingItem={editingItem}
            onCancel={() => setEditingItem(null)}
            submitting={submitting}
          />
        </div>

        <div className="list-column">
          <div className="card">
            <div className="card-header">
              <h3>Items Directory</h3>
              <span className="badge badge-count">Total: {items.length}</span>
            </div>

            {loading ? (
              <div className="loading-spinner">Loading items from database...</div>
            ) : (
              <ItemList
                items={items}
                onEdit={(item) => setEditingItem(item)}
                onDelete={handleDelete}
                onToggleActive={handleToggleActive}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemsPage;
