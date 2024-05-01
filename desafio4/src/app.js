import express, { json, urlencoded } from "express";
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.router.js';
import { Server } from 'socket.io';
import productsRouter from "./routes/products.router.js";

const app = express();
const PORT = 8080;
const httpServer = app.listen(PORT, console.log(`Server running on port ${PORT}`));
const socketServer = new Server(httpServer);

app.use(json());
app.use(urlencoded({ extended: true }));
app.use("/api/", productsRouter);

app.use("/realTimeProducts", viewsRouter); //???

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.use('/', viewsRouter);

/*app.use((req, res, next) => {
    req.context = { socketServer };
    next();
  });

const newProduct = [];

socketServer.on("connection", (socket) => {
  console.log(`Se conectó el usuario con socket id: ${socket.id}`);

  socket.on("product", (data) => {
    newProduct.push({ socketid: socket.id, product: data });
    socketServer.emit("product", newProduct);
  });
});*/