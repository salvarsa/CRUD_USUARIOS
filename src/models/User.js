const {Schema, model} = require('mongoose');

const collectionName = "user";

const userSchema = Schema({
    _id: String,
    name: String,
    mail: String,
    phone: String,
    genderId: String,
    createdAt: {type: Date, default: Date.now}, 
    isRemove: {type: Boolean, default: false}
},{
    collection: collectionName,
    _id: false
})

module.exports = model(collectionName, userSchema);