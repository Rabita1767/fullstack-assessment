import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import AuthRouter from "./routes/auth";
import { createHandler } from "graphql-http/lib/use/http";
import { GraphQLSchema, GraphQLObjectType, GraphQLString } from "graphql";
import { PrismaClient } from "@prisma/client";
// import { ApolloServer } from "apollo-server";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import http from "http";

const app = express();
dotenv.config();
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const prisma = new PrismaClient();

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Query",
        fields: {
            hello: {
                type: GraphQLString,
                resolve: () => "world",
            },
        },
    }),
});

// Create the GraphQL over HTTP Node request handler
// const handler = createHandler({ schema });

// Create a HTTP server using the listener on `/graphql`
// const server = http.createServer((req, res) => {
//     if (req.url && req.url.startsWith("/graphql")) {
//         handler(req, res);
//     } else {
//         res.writeHead(404).end();
//     }
// });

// server.listen(4000);
// console.log(`Server started at: 4000`);

// app.all("/graphql", createHandler({ schema }));

// app.listen(process.env.SERVER_PORT, () => {
//     console.log(`Server started at: ${process.env.SERVER_PORT}`);
// });

const typeDefs = `#graphql
    type Auth{
        id: ID,
        email: String,
        password: String,
        status: Boolean
    }
    
    type User{
        id: ID,
        first_name: String,
        last_name: String,
        address: String,
        phone: String
    }

    type Product{
        id: ID,
        title: String,
        description: String,
        price: Int,
        rent: Int,
        post_date: String,
        views: String,
        status: String,
        category_product: String
    }

    type Query{
        auth: [Auth],
        user: [User],
        product: [Product]
    }
`;

const resolvers = {
    Query: {
        auth() {
            return prisma.auth.findMany({});
        },
        product() {
            return prisma.product.findMany({});
        },
    },
};

//int, float, string, boolean, id

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

startStandaloneServer(server, {
    listen: { port: 8000 },
});
