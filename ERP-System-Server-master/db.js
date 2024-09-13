require('dotenv').config();
const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/final-year-erp"
const connectToMongo = () => {
    mongoose.connect(mongoURI)
}
module.exports = connectToMongo;