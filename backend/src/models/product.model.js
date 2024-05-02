const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute('SELECT * FROM products');
  return products;
};

const getById = async (productId) => {
  const [product] = await connection.execute('SELECT * FROM products WHERE id = ?', [productId]);
  if (product.length === 0) return null;

  return product[0];
};

module.exports = {
  getAll,
  getById,
};
