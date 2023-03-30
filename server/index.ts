import * as dotenv from 'dotenv';
dotenv.config()
import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'
import productRouter from './routers/Products/productsRouter'
import path from 'path'
import { db } from './config/db';
import userRouter from './routers/Users/userRouter';


const app = express()
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(express.json())
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use('/products', productRouter)
app.use('users', userRouter)

app.listen(5000,():void => {
    console.log('Server Running');
})

db.on('error', (err) => {
    console.log(err);
})

db.once('open', () => {
    console.log('MongoDB ready!');
})