const Item = require('../models/Item');

/**
 * Service to create a new item
 */
const createItem = async ({ name, description, category, isActive }) => {
  if (!name || name.trim() === '') {
    const error = new Error('Item name is required and cannot be empty');
    error.statusCode = 400;
    throw error;
  }

  const item = await Item.create({
    name: name.trim(),
    description: description ? description.trim() : '',
    category: category ? category.trim() : 'General',
    isActive: isActive !== undefined ? Boolean(isActive) : true
  });

  return item;
};

/**
 * Service to retrieve all items
 */
const getItems = async () => {
  const items = await Item.find().sort({ createdAt: -1 });
  return items;
};

/**
 * Service to retrieve a single item by ID
 */
const getItemById = async (id) => {
  const item = await Item.findById(id);
  if (!item) {
    const error = new Error('Item not found');
    error.statusCode = 404;
    throw error;
  }
  return item;
};

/**
 * Service to update an item by ID
 */
const updateItem = async (id, updateData) => {
  if (updateData.name !== undefined && updateData.name.trim() === '') {
    const error = new Error('Item name cannot be empty');
    error.statusCode = 400;
    throw error;
  }

  const item = await Item.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true }
  );

  if (!item) {
    const error = new Error('Item not found');
    error.statusCode = 404;
    throw error;
  }

  return item;
};

/**
 * Service to delete an item by ID
 */
const deleteItem = async (id) => {
  const item = await Item.findByIdAndDelete(id);
  if (!item) {
    const error = new Error('Item not found');
    error.statusCode = 404;
    throw error;
  }
  return item;
};

module.exports = {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem
};
