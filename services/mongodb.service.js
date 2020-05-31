const mongoose = require("mongoose");
const MONGODB_API = process.env.MONGODB_API;


class MongoDB {
    static async connect() {
        await mongoose.connect(MONGODB_API, { useNewUrlParser: true, useCreateIndex: true } , function(err){
            if(err) return console.error("Error connection to MongoDB", err);
            console.log("Connected to MongoDB Successfully");
        });
    }
}

module.exports = MongoDB;