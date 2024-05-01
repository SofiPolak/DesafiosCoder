import { promises as fs } from 'fs';

class ProductManager {

    static productIdCount = 0;

    constructor() {
        this.products = [],
        this.path = 'Products.json'
    }

    async addProduct(title, description, price, thumbnail, code, stock, category) {

        try {

            const products = await this.checkProducts();

            const codeExiste = products.find((p) => p.code === code);

            if (codeExiste) {
                return "El código ya existe";
            }

            if (!title || !description || !price || !code || !stock || !category) {
                return "Faltan datos del producto que son obligatorios";
            }

            const productoId = ++ProductManager.productIdCount;

            const product = {
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
                id: productoId,
                category,
                status: true
            }

            products.push(product);
            await fs.writeFile(this.path, JSON.stringify(products, null, 2));
            return product;

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
                return products[index];
            } else {
                return "No se encontro el producto para actualizar";
            }

        } catch (error) {
            console.error("Error al actualizar el producto", error);
        }

    }

    async deleteProduct(id) {

        try {
            const products = await this.checkProducts();
            const newProducts = products.filter(item => item.id != id);
            if(products.length != newProducts.length){
                await fs.writeFile(this.path, JSON.stringify(newProducts, null, 2));
                return "Producto eliminado";
            }else{
                return "No se encontro el producto para eliminar";
            }

        } catch (error) {
            console.error("Error al eliminar el producto", error);
        }

    }

}

export default ProductManager;