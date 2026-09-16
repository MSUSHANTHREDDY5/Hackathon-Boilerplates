const mongoose = require('mongoose');
const itemService = require('../services/itemService');
const { sendSuccess, sendError } = require('../utils/response');

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

/**
 * @desc    Create a new item
 * @route   POST /api/items
 * @access  Public
 */
const createItem = async (req, res, next) => {
  try {
    const { name, description, status } = req.body;

    if (!name || name.trim() === '') {
      return sendError(res, 400, 'Item name is required and cannot be empty');
    }

    if (status && !['active', 'inactive'].includes(status)) {
      return sendError(res, 400, 'Status must be either active or inactive');
    }

    const item = await itemService.createItem({ name, description, status });
    return sendSuccess(res, 201, 'Item created successfully', { item });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all items (sorted newest first)
 * @route   GET /api/items
 * @access  Public
 */
const getItems = async (req, res, next) => {
  try {
    const items = await itemService.getItems();
    return sendSuccess(res, 200, 'Items retrieved successfully', { items, count: items.length });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single item by ID
 * @route   GET /api/items/:id
 * @access  Public
 */
const getItemById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return sendError(res, 400, 'Invalid item ID format');
    }

    const item = await itemService.getItemById(id);
    return sendSuccess(res, 200, 'Item retrieved successfully', { item });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update item by ID
 * @route   PATCH /api/items/:id
 * @access  Public
 */
const updateItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return sendError(res, 400, 'Invalid item ID format');
    }

    const { name, description, status } = req.body;

    if (name !== undefined && name.trim() === '') {
      return sendError(res, 400, 'Item name cannot be empty');
    }

    if (status !== undefined && !['active', 'inactive'].includes(status)) {
      return sendError(res, 400, 'Status must be either active or inactive');
    }

    const item = await itemService.updateItem(id, { name, description, status });
    return sendSuccess(res, 200, 'Item updated successfully', { item });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete item by ID
 * @route   DELETE /api/items/:id
 * @access  Public
 */
const deleteItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return sendError(res, 400, 'Invalid item ID format');
    }

    await itemService.deleteItem(id);
    return sendSuccess(res, 200, 'Item deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem
};
