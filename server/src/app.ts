import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import Auth from "./resolvers/auth";
import Product from "./resolvers/product";
import Rent from "./resolvers/rent";
import GQLTypes from "./_types_/gql";
import Category from "./resolvers/category";
import Purchase from "./resolvers/purchase";

const app = express();
dotenv.config();
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const resolvers = {
    Query: {
        login: Auth.loginQuery,
        allProducts: Product.allProductsQuery,
        oneProduct: Product.oneProductQuery,
        category: Category.allCategoriesQuery,
    },
    Mutation: {
        signup: Auth.signupMutation,
        productAdd: Product.productAddMutation,
        productUpdate: Product.productUpdateMutation,
        rentProduct: Rent.rentProductMutation,
        purchaseProduct: Purchase.purchaseProduct,
        deleteProduct: Product.deleteProduct,
    },
};

type CustomError = {
    code: string;
    message: string;
};

const server = new ApolloServer({
    typeDefs: GQLTypes,
    resolvers,
    // formatError: (formattedError, error) => {
    //     if (error instanceof Error) {
    //         // console.log(error.name)
    //         // return {
    //         //   message: error.originalError.message,
    //         //   extensions: {
    //         //     code: error.originalError.code,
    //         //   },
    //         // };
    //     }
    //     console.log(error);
    //     return {
    //         ...formattedError,
    //         message: "Ok",
    //     };
    // },
});

try {
    if (process.env.PORT) {
        startStandaloneServer(server, {
            listen: { port: Number(process.env.PORT) },
        });
        console.log("Successfully started server at: ", process.env.PORT);
    } else {
        console.log("No port is defined");
    }
} catch (error) {
    console.log(error);
}

// npx prisma migrate dev
// npx prisma db seed
