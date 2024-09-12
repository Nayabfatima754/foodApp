const mongoose = require('mongoose')
const restaurantSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Restaurant name is required']
    },
    imageUrl:{
        type:String
    },
    food:{
        type:Array
    },
    time:{
        type:String
    },
    pickup:{
        type:Boolean,
        default:true
    },
    delivery:{
        type:Boolean,
        default:true
    },
    isOpen:{
        type:Boolean,
        default:true
    },
    logoUrl:{
        type:String
    },
    rating:{
        type:Number,
        default:1,
        min:1,
        max:5
    },
    ratingCount:{
        type:String
    },
    restaurantCode:{
        type:String
    },
    coords:{
        id:{type:String},
        latitude:{type:Number},
        latitudeDelta:{type:Number},

        longitude:{type:Number},
        longitudeDelta:{type:Number},
        address:{type:String},
        title:{type:String}


    }

})
const Restaurant = mongoose.model("Restaurant",restaurantSchema)
module.exports=Restaurant