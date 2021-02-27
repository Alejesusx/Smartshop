import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './Models/UserModel.js';
import Product from './Models/ProductModel.js';
import Order from './Models/OrderModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);

        const admin = createdUsers[0]._id;

        const sampleproducts = products.map(product => {
            return { ...product, user: admin }
        });

        await Product.insertMany(sampleproducts);

        console.log('Data succesfully imported!'.black.bgGreen.bold);
        process.exit();

    } catch (error) {
        console.error(`${error}`.red.inverse.bold);
        process.exit(1);
    }
}

const deleteData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        console.log('Data succesfully deleted!'.underline.yellow.bold);
        process.exit();

    } catch (error) {
        console.error(`${error}`.red.inverse.bold);
        process.exit(1);
    }
}

if (process.argv[2] === '-d') {
    deleteData();
} else {
    importData();
}