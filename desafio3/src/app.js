const express = require('express');

const app = express();
const PORT = 8080;

const ProductManager = require("./ProductManager");
const productManager = new ProductManager('./Products.json');

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.get("/products", async (req, res) => {

    try {
        const products = await productManager.getProducts();
        let limit = parseInt(req.query.limit);
        if (limit) {
            const productsLimit = products.slice(0, limit);
            res.json(productsLimit);
        } else {
            res.json(products);
        }
    } catch (error) {
        res.status(404).json({ message: "Error, productos no encontrados" });
    }

})

app.get("/products/:pid", async (req, res) => {

    try {
        let pid = parseInt(req.params.pid);
        const productById = await productManager.getProductById(pid);
        if (pid) {
            res.json(productById);
        } else {
            res.status(404).json({ message: "Producto no encontrado por id" });
        }
    } catch (error) {
        res.status(404).json({ message: "Error, producto no encontrado por id" });
    }

})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})