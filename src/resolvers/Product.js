const product = require('../models/Product');
const { generateId, handlePagination } = require('@codecraftkit/utils');

const Product_Create = async (_, {productInput}) => {
    try {
        const ID = generateId();
        const{
            name,
            price,
            userId,
        } = productInput;
        await new product({_id: ID, name, price, userId}).save()
        return ID
    } catch (error){
        return error;
    }
}

const Update_Product = async (_,{productInput}) => {
    try {
        await product.findByIdAndUpdate(productInput._id, {$set: productInput}, {new: true});
        return productInput._id;
    } catch (error) {
        return error;
    }
}
 const Product_Save = async (_, {productInput}) => {
    try {
        if(productInput._id){
            return await Update_Product(_, {productInput});
        }else {
            return await Product_Create(_,{productInput});
        }
    } catch (error) {
        return error;
    }
 }

const Product_Delete = async (_, {_id}) =>{
    try {
        await product.findByIdAndUpdate(_id, {$set: {isRemove: true}});
        return true
    } catch (error) {
        return error;
    }
}

const Product_Get = async (_, {filter = {}, option = {}}) =>{
    try {
        let query = {isRemove: false};
        let {
            _id,
            name,
            price,
        } = filter

        let {skip, limit} = handlePagination(option);

        if(_id) query.id = _id;
        if(name) query.name = {$regex: name, $option: 'i'}
        if(price) query.price = price
        const find = product.find(query);
        if (skip) {find.skip(skip)};
        if (limit) {find.limit(limit)};
        let result = await find.lean();
        console.log(result)
        return result
    } catch (error) {
        return error;
    }
}

const Product_Count = async (_, {filter = {}}) => {
    try {
        const counter = await Product_Get(_, {filter})
        return counter.length;
    } catch (error) {
        return error;
    }
}

const ProductUser_Get = async (_, args) =>{
    try {
        return await product.aggregate([
            {
                $match: {
                    isRemove: false
                  }
            },
            {
                $lookup: {
                    from: "user",
                    localField: "userId",
                    foreignField: "_id",
                    as: "result"
                  }
            },
            {
                $unwind:{
                    path: "$result",
                    preserveNullAndEmptyArrays: true
                }
            }
        ]);
    } catch (error) {
        return error;
    }
}

module.exports = {
    Query: {
        Product_Get,
        Product_Count,
        ProductUser_Get
    },
    
    Mutation: {
        Product_Save,
        Product_Delete
    }
}