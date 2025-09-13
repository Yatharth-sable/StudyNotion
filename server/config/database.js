    const mongoose = require("mongoose")
    require("dotenv").config();

    exports.connect = () =>{
        mongoose.connect(process.env.MONGODB_URL)
        .then( () => console.log("Connection with Database Successfully"))
        .catch((err)=> {
            console.log("Connnection with Database is failed")
            console.log(err)
            process.exit(1)
        })
        }
