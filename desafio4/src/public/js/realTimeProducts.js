socket = io()

const listProducts = document.getElementById('productsRealTime')

const btnSend = document.getElementById('btn-send')

btnSend.addEventListener('click', () => {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const thumbnail = document.getElementById('thumbnail').value;
    const code = document.getElementById('code').value;
    const stock = document.getElementById('stock').value;
    const category = document.getElementById('category').value;
    socket.emit('addProduct', { title, description, price, thumbnail, code, stock, category});

})

socket.on('productsRealTime', products => {
    listProducts.innerHTML = ``;
    products.forEach(product => {
        const newProduct = document.createElement('li');
        const btnDelete = document.createElement('button');

        btnDelete.innerHTML = 'Eliminar';
        btnDelete.addEventListener('click', () => {
            socket.emit('deleteProduct', product.id)
            console.log(product.id);
        });
        newProduct.innerHTML = `<strong>Nombre: </strong>${product.title}, <strong>Descripcion: </strong>${product.description},
        <strong>Precio: </strong>${product.price}, <strong>URL: </strong>${product.thumbnail}, 
        <strong>Codigo: </strong>${product.code}, <strong>Stock: </strong>${product.stock},
        <strong>Categoria: </strong>${product.category}`;
        listProducts.appendChild(newProduct);
        listProducts.appendChild(btnDelete);
    });
})