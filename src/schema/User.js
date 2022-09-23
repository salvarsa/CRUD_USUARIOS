

const userSchema = [`
type User {
    _id: String,
    name: String,
    mail: String,
    phone: String,
    genderId: String,
    gender: User_gender,
    createdAt: GraphQLDateTime, 
    isRemove: Boolean
  }
  
  type User_gender{
    _id: String,
    name: String
  }

  input User_Filter{
    _id: String,
    name: String,
    mail: String,
    phone: String,
    genderId: String
  }

  input Option{
    limit: Int,
    page: Int
  }

  input User_Input {
    _id: String,
    name: String,
    mail: String,
    phone: String,
    genderId: String!,
  }

  type Query{
    User_Get(filter: User_Filter, option:Option):[User]
    User_Count(filter: User_Filter):Int 
    User_Gender: [User_gender]
  }

  type Mutation{
    User_Save(userInput: User_Input):ID
    User_Delete(_id: String!):Boolean
  }
`]
// const Scalar = [´
//   scalar GraphQLDateTime,
//   scalar JSONObject
// ´];

module.exports = userSchema;

