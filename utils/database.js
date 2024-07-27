import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
    mongoose.set('strictQuery', true);
    if (isConnected) {
        console.log('Already connected');
        return;
    }
    try {
        console.log('connected');
        await mongoose.connect(process.env.MONGO_URL, {
            dbName: 'sass_next'
        })
        isConnected = true;
    } catch (error) {
        console.log('Error', error);
    }
}