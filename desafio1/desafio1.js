class ProductManager {

    constructor(){
        this.products = [];
    }

    addProduct(title, description, price, thumbnail, code, stock){

        const codeExiste = this.products.find((p) => p.code === code)
        if (codeExiste) {
            console.log("El código ya existe.");
            return;
        }

        const productoId = this.products.length + 1;

        const producto = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: productoId
        }

        this.products.push(producto);
        
    }

    getProducts(){

        return this.products;

    }

    getProductById(idBuscado){

        const idExiste = this.products.find((p) => p.id === idBuscado);      
        
        if (!idExiste) {
            console.log("Not found");
            return;
        }

        console.log(idExiste);

    }

}

const productManager = new ProductManager();

const productos = console.log(productManager.getProducts());

productManager.addProduct("producto prueba","Este es un producto prueba",200,"Sin imagen","abc123",25);

const productosNuevos = console.log(productManager.getProducts());

productManager.addProduct("producto prueba","Este es un producto prueba",200,"Sin imagen","abc123",25);

productManager.getProductById(2);

productManager.getProductById(1);

