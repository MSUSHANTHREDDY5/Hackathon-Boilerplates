const Item = require('../models/Item');

/**
 * Service function to create a new item in MongoDB
 */
const createItem = async (itemData) => {
  const item = await Item.create({
    name: itemData.name,
    description: itemData.description,
    status: itemData.status
  });
  return item;
};

/**
 * Service function to retrieve all items from MongoDB, sorted newest first
 */
const getItems = async () => {
  const items = await Item.find().sort({ createdAt: -1 });
  return items;
};

/**
 * Service function to retrieve single item by ID from MongoDB
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
 * Service function to update item by ID in MongoDB
 * Filters update payload to prevent modifying protected fields (_id, createdAt, updatedAt)
 */
const updateItem = async (id, updateData) => {
  const allowedUpdates = {};
  if (updateData.name !== undefined) allowedUpdates.name = updateData.name;
  if (updateData.description !== undefined) allowedUpdates.description = updateData.description;
  if (updateData.status !== undefined) allowedUpdates.status = updateData.status;

  const item = await Item.findByIdAndUpdate(
    id,
    allowedUpdates,
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
 * Service function to delete item by ID from MongoDB
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
