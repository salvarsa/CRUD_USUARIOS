const productSchema = [`
    type Product{
        _id: String,
        name: String,
        price: Int,
        userId: String,
        result: User,
        createdAt: GraphQLDateTime, 
        isRemove: Boolean
    }
    
    input Product_Input{
        _id: String,
        name: String,
        price: Int,
        userId: String!,
    }

    input Product_Filter{
        _id: String,
        name: String,
        price: Int,   
    }

    type Query{
        Product_Get(filter: Product_Filter, option:Option):[Product]
        Product_Count(filter: Product_Filter):Int
        ProductUser_Get(userId: String):[Product]
    }

    type Mutation{
        Product_Save(productInput: Product_Input):ID
        Product_Delete(_id: String!): Boolean
    }
`]

module.exports = productSchema;