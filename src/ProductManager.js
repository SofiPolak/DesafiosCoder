const fs = require('fs').promises;

class ProductManager {

    constructor() {
        this.products = [],
            this.path = 'Products.json'
    }

    async addProduct(newProduct) {

        try {

            let { title, description, price, thumbnail, code, stock } = newProduct;

            const codeExiste = this.products.find((p) => p.code === code);

            if (codeExiste) {
                console.log("El código ya existe.");
                return;
            }

            if (!title || !description || !price || !thumbnail || !code || !stock) {
                console.log("Todos los datos del producto son obligatorios.");
                return;
            }

            const productoId = this.products.length + 1;

            const product = {
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
                id: productoId
            }

            this.products.push(product);
            await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
            console.log("Producto creado correctamente");

        } catch (error) {
            console.error("Error al crear el producto", error);
        }

    }

    async getProducts() {

        try {
            return await this.checkProducts();
        } catch (error) {
            console.error("Error al consultar productos", error);
            return [];
        }
    }

    async getProductById(idBuscado) {

        try {
            const products = await this.checkProducts()
            const product = products.find((p) => p.id === idBuscado);
            if (!product) {
                console.log("No existe un producto con ese Id.");
            } else {
                return product;
            }
        } catch (error) {
            console.error("Error en busqueda de  producto con Id", error);
        }

    }

    async checkProducts() {

        try {
            const data = await fs.readFile(this.path, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                return [];
            } else {
                throw error;
            }
        }
    }


    async updateProduct(id, productUpdate) {

        try {
            const products = await this.checkProducts();

            const index = products.findIndex(p => p.id === id);
            if (index !== -1) {
                products[index] = { ...products[index], ...productUpdate };
                await fs.writeFile(this.path, JSON.stringify(products, null, 2));
            } else {
                console.log("No se encontro el producto para actualizar");
            }

        } catch (error) {
            console.error("Error al actualizar el producto", error);
        }

    }

    async deleteProduct(id) {

        try {
            const products = await this.checkProducts();
            const newProducts = products.filter(item => item.id != id)
            await fs.writeFile(this.path, JSON.stringify(newProducts, null, 2))

        } catch (error) {
            console.error("Error al eliminar el producto", error);
        }

    }

}

const productManager = new ProductManager();

async function mostrarProductos(){
    const productosMostrar = await productManager.getProducts();
    console.log(productosMostrar);
}

//const productos = console.log(productManager.getProducts());
//mostrarProductos();

const product1 = {

    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin Imagen",
    code: "abc123",
    stock: 25
}

const product2 = {

    title: "producto prueba2",
    description: "Este es un producto prueba2",
    price: 200,
    thumbnail: "Sin Imagen",
    code: "abc122",
    stock: 25
}

const product3 = {

    title: "producto prueba3",
    description: "Este es un producto prueba3",
    price: 200,
    thumbnail: "Sin Imagen",
    code: "abc124",
    stock: 25
}

const product4 = {

    title: "producto prueba4",
    description: "Este es un producto prueba4",
    price: 200,
    thumbnail: "Sin Imagen",
    code: "abc125",
    stock: 25
}

const product5 = {

    title: "producto prueba5",
    description: "Este es un producto prueba5",
    price: 200,
    thumbnail: "Sin Imagen",
    code: "abc126",
    stock: 25
}

const product6 = {

    title: "producto prueba6",
    description: "Este es un producto prueba6",
    price: 200,
    thumbnail: "Sin Imagen",
    code: "abc127",
    stock: 25
}

const product7 = {

    title: "producto prueba7",
    description: "Este es un producto prueba7",
    price: 200,
    thumbnail: "Sin Imagen",
    code: "abc128",
    stock: 25
}
const product8 = {

    title: "producto prueba8",
    description: "Este es un producto prueba8",
    price: 200,
    thumbnail: "Sin Imagen",
    code: "abc129",
    stock: 25
}

const product9 = {

    title: "producto prueba9",
    description: "Este es un producto prueba9",
    price: 200,
    thumbnail: "Sin Imagen",
    code: "abc110",
    stock: 25
}

const product10 = {

    title: "producto prueba10",
    description: "Este es un producto prueba10",
    price: 200,
    thumbnail: "Sin Imagen",
    code: "abc111",
    stock: 25
}

productManager.addProduct(product1);
productManager.addProduct(product2);
productManager.addProduct(product3);
productManager.addProduct(product4);
productManager.addProduct(product5);
productManager.addProduct(product6);
productManager.addProduct(product7);
productManager.addProduct(product8);
productManager.addProduct(product9);
productManager.addProduct(product10);

//const productosNuevos = console.log(productManager.getProducts());
//mostrarProductos();

/*productManager.addProduct(product1);

productManager.getProductById(3);

productManager.getProductById(1);

productManager.updateProduct(1, { stock: 12 });

productManager.deleteProduct(1);
*/

module.exports = ProductManager;