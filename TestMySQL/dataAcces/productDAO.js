const db = require("../config/db");

class ProductDAO {
    constructor() {}

    //Method to create a product
    insertProduct(product, callback) {
        const insertQuery = `INSERT INTO products(name, price, description) VALUES ('${product.name}', ${product.price}, '${product.description}')`;

        db.query(insertQuery, (err, result) => {
            if (err) {
                callback(err);
            } else {
                callback(result);
            }
        });
    }

    //Methot to select all products
    selectProducts(callback) {
        const selectQuery = `SELECT * FROM products`;

        db.query(selectQuery, (err, result, fields) => {
            if (err) {
                callback(err);
            } else {
                callback(null, result, fields);
            }
        });
    }

    //Method to select a product by id
    selectProductById(id, callback) {
        const selectQuery = `SELECT * FROM products WHERE id = ${id}`;

        db.query(selectQuery, (err, result, field) => {
            if (err) {
                callback(err);
            } else {
                callback(null, result, field);
            }
        });
    }

    //Method to update a product by id
    updateProductById(id, product, callback) {
        const updateQuery = `UPDATE products SET name = '${product.name}', price = ${product.price}, description = '${product.description}' WHERE id = ${id}`;

        db.query(updateQuery, (err, result) => {
            if (err) {
                callback(err);
            } else {
                callback(null, result);
            }
        });
    }

    //Delete a product by id
    deleteProductById(id, callback) {
        const deleteQuery = `DELETE FROM products WHERE id = ${id}`;

        db.query(deleteQuery, (err, result) => {
            if (err) {
                callback(err);
            } else {
                callback(null, result);
            }
        });
    }
}

module.exports = new ProductDAO();
