import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config()


mongoose.connect('mongodb://localhost:27017/mart')

const db = mongoose.connection;

db.on('error', (err) => {
    console.log(err);
})

db.once('open', () => {
    console.log('MongoDB ready!');
})

export default db