import express from 'express'
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import cartRouter from './routes/carts.router.js'
import productRouter from './routes/products.router.js'
import viewsRouter from './routes/views.router.js'
import dotenv from 'dotenv'
import session from 'express-session';
//import bodyParser from 'body-parser';
import mongoose from './config/database.js';
import MongoStore from 'connect-mongo';
import sessionsRouter from './routes/sessions.router.js';
dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

app.use('/api/carts', cartRouter)
app.use('/api/products', productRouter)
app.use('/', viewsRouter)
app.use('/api/sessions', sessionsRouter);

const httpServer = app.listen(PORT, console.log(`Server running on port ${PORT}`));

app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB }),
    // cookie: { maxAge: 180 * 60 * 1000 },
}));