const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
class ProductService {
  constructor() {
    this.products = [];
    this.generate();
  }

  async generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        preice: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  async find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 1000);
    });
  }

  async findOne(id) {
    const product = this.products.find((item) => item.id == id);
    console.log(product);
    if (!product) {
      console.log('entro1');
      throw boom.notFound('Product not foud');
    }
    console.log(product);
    if (product.isBlock) {
      console.log('entro2');
      throw boom.conflict('Product is block');
    }
    return this.products.find((item) => item.id == id);
  }

  async update(id, changes) {
    const index = this.products.findIndex((item) => item.id == id);

    if (index === -1) {
      throw boom.notFound('Product not foud');
    }
    this.products[index] = { ...this.products[index], ...changes };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((item) => item.id == id);
    console.log(index, '🐱 ');
    if (index === -1) {
      throw boom.notFound('Product not foud');
    }
    this.products.splice(index, 1);
    return { id };
  }
}

module.exports = ProductService;
