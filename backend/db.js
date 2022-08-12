const mongoose = require('mongoose');
// const mongoURL = "mongodb://localhost:27017/"
const mongoURL = "mongodb://localhost:27017/test"


connectToMongo = ()=>{
    mongoose.connect(mongoURL, ()=>{
        console.log("MongoDB Connected Successfully!")
    })
}
module.exports = connectToMongo;