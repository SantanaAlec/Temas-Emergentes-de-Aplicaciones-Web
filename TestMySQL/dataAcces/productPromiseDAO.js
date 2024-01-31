const db = require("../config/db");

class ProductPromiseDAO {
    constructor() {}
    
    async insertProduct(product) {
        const insertQuery = `INSERT INTO products(name, price, description) VALUES ('${product.name}', ${product.price}, '${product.description}')`;

        try {
            const result = await this.executeQuery(insertQuery);
            return result;
        } catch (error) {
            console.error(error);
        }
    }

    async selectProducts() {
        const selectQuery = `SELECT * FROM products`;

        try {
            const result = await this.executeQuery(selectQuery);
            return result;
        } catch (error) {
            console.error(error);
        }
    }

    async updateProductById(id, product) {
        const updateQuery = `UPDATE products SET name = '${product.name}', price = ${product.price}, description = '${product.description}' WHERE id = ${id}`;

        try {
            const result = await this.executeQuery(updateQuery);
            return result;
        } catch (error) {
            console.error(error);
        }
    }

    async deleteProductById(id) {
        const deleteQuery = `DELETE FROM products WHERE id = ${id}`;

        try {
            const result = await this.executeQuery(deleteQuery);
            return result;
        } catch (error) {
            console.error(error);
        }
    }

    async selectProductById(id) {
        const selectQuery = `SELECT * FROM products WHERE id = ${id}`;

        try {
            const result = await this.executeQuery(selectQuery);
            return result;
        } catch (error) {
            console.error(error);
        }
    }

    executeQuery(query) {
        return new Promise((resolve, reject) => {
            db.query(query, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = new ProductPromiseDAO();
