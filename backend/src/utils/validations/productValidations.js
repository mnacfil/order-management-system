const { z } = require("zod");

const productIdSchema = z.object({
  id: z.preprocess(
    (val) => Number(val),
    z.number().int().positive("ID must be a positive integer")
  ),
});

const createProductSchema = z.object({
  name: z.string().min(3).max(255),
  description: z.string().optional(),
  price: z.preprocess(
    (val) => Number(val),
    z.number().min(0, "Price is required and must be >= 0")
  ),
  stock_quantity: z.preprocess(
    (val) => Number(val),
    z.number().int().min(0, "Stock is required and must be >= 0")
  ),
});

const updateProductSchema = z.object({
  name: z.string().min(3).max(255),
  description: z.string().optional(),
  price: z.preprocess(
    (val) => Number(val),
    z.number().min(0, "Price is required and must be >= 0")
  ),
  stock_quantity: z.preprocess(
    (val) => Number(val),
    z.number().int().min(0, "Stock is required and must be >= 0")
  ),
});

module.exports = { productIdSchema, createProductSchema, updateProductSchema };
