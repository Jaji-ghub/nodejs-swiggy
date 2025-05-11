const mongoose = require("mongoose")

const firmSchema = new mongoose.Schema({
    firmName : {
        type : String,
        required:true,
        unique : true
    },
    area : {
        type : String,
        required : true
    },
    categrory : {
        type : [
            {
                type : String,
                enum : ["veg", "non-veg"]
            }
        ]
    },
    region : {
        type:[
            {
                type : String,
                enum : ["south-Indian", "NorthIndian","chinese","bakery"]
            }
        ]
    },

    offer : {
        type : String

    },

    image : {
        type:String
    },
    vendor : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Vendor"
    },
    products : [{
            type : mongoose.Schema.Types.ObjectId,
            ref : "Product"
        }]
})

const Firms = mongoose.model("firm", firmSchema)
module.exports =  Firms