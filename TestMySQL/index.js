const db = require("./config/db");
const Product = require("./models/product");
const ProductDAO = require("./dataAcces/productDAO");
const ProductPromiseDAO = require("./dataAcces/productPromiseDAO");

//Database conection with promises
db.connect((err) => {
    if (err) {
        console.error("Database connection failed: ", err);
    }
    console.log("Database connected");

    //Insert a product
    const item = new Product(
        null,
        "Viquingos",
        38.7,
        "Un hotdog con salchicha, tocino"
    );

    
    ProductPromiseDAO.insertProduct(item)
        .then((resolve) => {
            console.log("Product inserted: ", resolve);
            return ProductPromiseDAO.selectProducts();
        })
        .then((resolve) => {
            console.log("Products: ", resolve);
            //closeDatabase();
        })
        .catch((error) => {
            console.error("Error inserting product: ", error);
        });
    

    /**
    //Retriving all products
    ProductPromiseDAO.selectProducts()
        .then((resolve) => {
            console.log("Products: ", resolve);
        })
        .catch((error) => {
            console.error("Error selecting products: ", error);
        });
    */

    //Update a product by id
    const itemUpdate = new Product(
        null,
        "Vikingos",
        40,
        "Un hotdog con salchicha, tocino, queso y cebolla"
    );

    ProductPromiseDAO.updateProductById(5, itemUpdate)
        .then((resolve) => {
            console.log("Product updated: ", resolve);
            return ProductPromiseDAO.selectProducts();
        })
        .then((resolve) => {
            console.log("Products: ", resolve);
            //Delete a product by id
            return ProductPromiseDAO.deleteProductById(5);
        })
        .then((resolve) => {
            console.log("Product deleted: ", resolve);
            return ProductPromiseDAO.selectProducts();
        })
        .then((resolve) => {
            console.log("Products: ", resolve);
            closeDatabase();
        })
        .catch((error) => {
            console.error("Error updating product: ", error);
        });

    //Delete a product by id
    /**
    ProductPromiseDAO.deleteProductById(2)
        .then((resolve) => {
            console.log("Product deleted: ", resolve);
        })
        .catch((error) => {
            console.error("Error deleting product: ", error);
        });
    */
});

//Close Database Conection
async function closeDatabase() {
    db.end((err) => {
        if (err) {
            console.error("Error closing database: ", err);
        }
        console.log("Database closed");
    });
}

//Database conection
/**
db.connect((err) => {
    if (err) {
        console.error("Database connection failed: ", err);
    }
    console.log("Database connected");

    // Insert a product
    const item = new Product(5, "BIDA", 10, "Bida de manzana");

    ProductDAO.insertProduct(item, (err, result) => {
        if (err) {
            console.error("Error inserting product: ", err);
        } else {
            console.log("Product inserted: ", result);
        }
    });

    //Select all products
    ProductDAO.selectProducts((err, result, fields) => {
        if (err) {
            console.error("Error selecting products: ", err);
        } else {
            console.log("Products: ", result);
            console.log("Products selected: ", fields);
        }
    });

    //close database conection
    db.end((err) => {
        if (err) {
            console.error("Error closing database: ", err);
        }
        console.log("Database closed");
    });
});
*/
