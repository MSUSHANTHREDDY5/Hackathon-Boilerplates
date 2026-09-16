const mongoose = require('mongoose');
const itemService = require('../services/itemService');
const { sendSuccess, sendError } = require('../utils/response');

/**
 * Helper to validate MongoDB ObjectId string
 */
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

/**
 * @desc    Create new item
 * @route   POST /api/items
 * @access  Public
 */
const create = async (req, res, next) => {
  try {
    const { name, description, category, isActive } = req.body;
    const item = await itemService.createItem({ name, description, category, isActive });
    return sendSuccess(res, 201, 'Item created successfully', { item });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all items
 * @route   GET /api/items
 * @access  Public
 */
const getAll = async (req, res, next) => {
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
const getById = async (req, res, next) => {
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
const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return sendError(res, 400, 'Invalid item ID format');
    }

    const item = await itemService.updateItem(id, req.body);
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
const remove = async (req, res, next) => {
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
  create,
  getAll,
  getById,
  update,
  remove
};
