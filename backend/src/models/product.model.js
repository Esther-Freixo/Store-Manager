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

const createProduct = async (name) => {
  const [{ insertId }] = await connection.execute('INSERT INTO products (name) VALUES (?)', [name]);
  return { id: insertId, name };
};

const updateProduct = async (id, name) => {
  const [uptProduct] = await connection.execute('UPDATE products SET name = ? WHERE id = ?', [name, id]);
  if(uptProduct.affectedRows === 0){
    return null;
  }
  return { id:Number(id), name };
};

module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
};
