import express, { json, urlencoded } from "express";
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import productsRouter from "./routes/products.router.js";
import viewsRouter from './routes/views.router.js';

import ProductManager from "./ProductManager.js";
const productManager = new ProductManager();

const app = express();
const PORT = 8080;
const httpServer = app.listen(PORT, console.log(`Server running on port ${PORT}`));
const socketServer = new Server(httpServer);

app.use(json());
app.use(urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

app.use('/', viewsRouter);
//app.use("/api/", productsRouter);
app.use("/", productsRouter);

socketServer.on('connection', socket => {
    console.log("Cliente conectado");

    productManager.checkProducts()
    .then(products => {

        socketServer.emit('products', products)
        socketServer.emit('productsRealTime', products)
    })

    socket.on('addProduct', (data)=> {
        productManager.addProduct( data.title, data.description, data.price, data.thumbnail, data.code, data.stock, data.category)
        .then(() => {
            productManager.checkProducts()
            .then(products => {
                socketServer.emit('productsRealTime', products)
            })
        })

    })


    socket.on('deleteProduct', (data) => {
        productManager.deleteProduct(data)
        .then(() => {
            productManager.checkProducts()
            .then((products) =>{
                socketServer.emit('productsRealTime', products)
            })
        })
    })
})