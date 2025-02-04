const connection = require('./connection');

const getAll = async () => {
  const query = `
    SELECT 
      sal.date, 
      spr.product_Id as productId, 
      spr.quantity, 
      spr.sale_Id as saleId 
    FROM 
      sales AS sal 
    INNER JOIN 
      sales_products AS spr 
    ON 
      sal.id = spr.sale_Id 
    ORDER BY 
      spr.product_Id ASC
  `;
  const [sales] = await connection.execute(query);
  return sales;
};

const getById = async (saleId) => {
  const query = `
    SELECT 
      sal.date,
      spr.product_Id as productId,
      spr.quantity
    FROM sales AS sal
    INNER JOIN sales_products AS spr ON sal.id = spr.sale_id
    WHERE sal.id = ?
    ORDER BY spr.product_Id ASC;
  `;
  const [sales] = await connection.execute(query, [saleId]);
  return sales.length > 0 ? sales : null;
};

const createSale = async (newSaleInfo) => {
  const [newSale] = await connection.execute('INSERT INTO sales (date) VALUES (NOW())');
  const insertSale = newSaleInfo.map(({ productId, quantity }) => connection.execute(
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [newSale.insertId, productId, quantity],
  ));
  await Promise.all(insertSale);
  return {
    id: newSale.insertId,
    itemsSold: newSaleInfo,
  };
};

module.exports = {
  getAll,
  getById,
  createSale,
};