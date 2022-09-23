const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { connect } = require('mongoose');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const {  gql } = require('apollo-server');

//conectar mongodb
const db = process.env.MONGODB || 'mongodb://localhost:27017/usuarios';

//conexión a base de datos
const connectdb = connect(db);

const app = express();

const PORT = process.env.PORT || 3000;

const typeDefs = require('./merge/mergeSchema');
const resolvers = require('./merge/mergeResolvers');

// const typeDefs = gql`
//   type Book {
//     title: String
//     author: String
//   }
//   type Query {
//     books: [Book]
//   }
// `;

// const resolvers = {
//   Query: {
//     books: () => books,
//   },
// };

app.get('/', (req, res) => {
    res.send('cualquier mensaje'),
        connectdb
});


//apollo server
async function start() {
    const schema = makeExecutableSchema({typeDefs, resolvers});
    const apolloServer = new ApolloServer({
        schema
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
    app.listen(PORT, (req, res) => {
        console.log(`Servidor en el puerto ${PORT} 🚀`);
    });
}

start()



