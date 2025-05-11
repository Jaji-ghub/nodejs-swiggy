const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name :{
        type : String,
        required:true

    },
    price : {
        type : String,
        required : true
    },
    categeory : {
        type : [{
            type  : String,
            enum : ["veg", "non-veg"]
        }]
    },
    image : {
        type : String,
        
    },
    bestseller : {
        type : String,
        
    },
    description :{
        type : String
    },
    firm : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "firm"
    }]
})

const product = mongoose.model("Product",productSchema)

module.exports = product