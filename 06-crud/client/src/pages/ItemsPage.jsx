import React, { useState, useEffect } from 'react';
import ItemForm from '../components/ItemForm';
import ItemList from '../components/ItemList';
import { getItems, createItem, updateItem, deleteItem } from '../services/itemService';

const ItemsPage = () => {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const fetchItems = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getItems();
      if (response.success && response.data?.items) {
        setItems(response.data.items);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to fetch items';
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      if (editingItem) {
        const response = await updateItem(editingItem._id, formData);
        if (response.success) {
          setSuccess('Item updated successfully');
          setEditingItem(null);
          await fetchItems();
        }
      } else {
        const response = await createItem(formData);
        if (response.success) {
          setSuccess('Item created successfully');
          await fetchItems();
        }
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Operation failed';
      setError(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setError(null);
    setSuccess(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setError(null);
  };

  const handleDelete = async (id) => {
    setError(null);
    setSuccess(null);
    try {
      const response = await deleteItem(id);
      if (response.success) {
        setSuccess('Item deleted successfully');
        if (editingItem && editingItem._id === id) {
          setEditingItem(null);
        }
        await fetchItems();
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to delete item';
      setError(errorMsg);
    }
  };

  return (
    <div className="container">
      <header className="page-header">
        <h1>Item Management</h1>
        <p className="subtitle">MERN Stack Reusable CRUD Boilerplate</p>
      </header>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="grid">
        <ItemForm
          editingItem={editingItem}
          onSubmit={handleFormSubmit}
          onCancel={handleCancelEdit}
          isSubmitting={isSubmitting}
        />

        <ItemList
          items={items}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default ItemsPage;
