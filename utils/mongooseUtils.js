const mongoose = require('mongoose');

const connectDB = () => {
    mongoose
    .connect(process.env.DATABASE.replace(
        '<password>',
        process.env.PASSWORD
    ))
    .then(() => console.log('資料庫連接成功'))
    .catch((err) => console.log(err));
}

module.exports = connectDB;