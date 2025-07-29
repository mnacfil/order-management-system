const Product = require("../models/Product");
const {
  createProductSchema,
  updateProductSchema,
  productIdSchema,
} = require("../utils/validations/productValidations");
const AppError = require("../utils/errors/AppError");

class ProductService {
  async validateProductId(id) {
    try {
      await productIdSchema.parseAsync({ id });
    } catch (err) {
      throw new AppError(`Error: ${err.message}`, 400);
    }
  }

  async createProduct(productData) {
    try {
      await createProductSchema.parseAsync(productData);
      return await Product.create(productData);
    } catch (err) {
      if (err instanceof AppError) throw err;
      throw new AppError(`Error: ${err.message}`, 400);
    }
  }

  async getProductById(id) {
    await this.validateProductId(id);
    return await Product.findById(id);
  }

  async getAllProducts() {
    return await Product.findAll();
  }

  async updateProduct(id, productData) {
    await this.validateProductId(id);
    try {
      await updateProductSchema.parseAsync(productData);
      return await Product.update(id, productData);
    } catch (err) {
      if (err instanceof AppError) throw err;
      throw new AppError(`Error: ${err.message}`, 400);
    }
  }

  async deleteProduct(id) {
    await this.validateProductId(id);
    return await Product.delete(id);
  }
}
module.exports = new ProductService();
