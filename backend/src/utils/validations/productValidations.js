const { z } = require("zod");

const productIdSchema = z.object({
  id: z.number().int().positive(),
});

const createProductSchema = z.object({
  name: z.string().min(3).max(255),
  description: z.string().optional(),
  price: z.number().positive(),
  stock_quantity: z.number().int().min(0),
});

const updateProductSchema = z.object({
  name: z.string().min(3).max(255),
  description: z.string().optional(),
  price: z.number().positive(),
  stock_quantity: z.number().int().min(0),
});

module.exports = { productIdSchema, createProductSchema, updateProductSchema };
