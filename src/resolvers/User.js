const user = require('../models/User');
const { generateId, handlePagination } = require('@codecraftkit/utils');

const gender = {
    "1": {_id: "1", name: "men"},
    "2": {_id: "2", name: "women"}
}

const User_Create = async (_, {userInput})=>{
    try {
        const ID = generateId();
        const {
            name,
            mail,
            phone,
            genderId,
        } = userInput;
        await new user ({_id: ID, name, mail, phone, genderId}).save()
         return ID
    } catch (error) {
        return error;
    }
}
const Update_User = async(_, {userInput}) =>{
    try {
        await user.findByIdAndUpdate(userInput._id, {$set: userInput}, {new: true})
        return userInput._id;
    } catch (error) {
        return error;
    }
}

const User_Save = async(_, {userInput}) =>{
    try {
        if(userInput._id){
           return await  Update_User(_, {userInput});
        }else{
            return await User_Create(_, {userInput});
        }
    } catch (error) {
        return  error
    }
}

const User_Delete = async(_, {_id}) =>{
    try {
        await user.findByIdAndUpdate(_id, {$set: {isRemove: true}})
        return true
    } catch (error) {
        return error
    }
}

const User_Get = async (_, {filter = {}, option = {}}) => {
    try {
        let query = {isRemove: false};
        let {
            _id,
            name,
            mail,
            phone,
            genderId,
        } = filter

        

        let {skip, limit} = handlePagination(option);

        if(_id) query._id = _id;
        if(name) query.name = { $regex: name, $options: 'i' }
        if(mail) query.mail = {$regex: mail, $options: 'i'}
        if(phone) query.phone = phone;
        if(genderId) query.genderId = genderId;
        const find = user.find(query);
        if(skip) {find.skip(skip)};
        if(limit) {find.limit(limit)};
        let result = await find.lean();
        for(let results of result){
            results.gender = gender[results.genderId];
            console.log(results)
        }
        console.log(result)
        return result;
    } catch (error) {
        return error
    }
}

 const User_Count = async (_, {filter = {}}) =>{
    try {
        const counter = await User_Get( _, {filter})
        return counter.length;
    } catch (error) {
        return error
    }
 }

 const User_Gender = async () => {
    return Object.values(gender);
 }




 module.exports = {
    Query: {
        User_Get,
        User_Count,
        User_Gender
    },
    Mutation: {
        User_Save, 
        User_Delete
    }

}