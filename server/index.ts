import * as dotenv from 'dotenv';
dotenv.config()
import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'
import productRouter from './routers/Products/productsRouter'


const app = express()
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(express.json())
app.use('/products', productRouter)



app.listen(5000,():void => {
    console.log('Server Running');
})


mongoose.connect(process.env.DB_URI as string)

const db = mongoose.connection;

db.on('error', (err) => {
    console.log(err);
})

db.once('open', () => {
    console.log('MongoDB ready!');
})