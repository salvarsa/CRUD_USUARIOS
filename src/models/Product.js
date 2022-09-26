const {Schema, model} = require('mongoose');


const collectionName = "products";

const productSchema = Schema({
    _id: String,
    name: String,
    price: Number,
    userId: String,
    createdAt: {type: Date, default: Date.now}, 
    isRemove: {type: Boolean, default: false}
},{
    collection: collectionName,
    _id: false
})

module.exports = model(collectionName, productSchema);