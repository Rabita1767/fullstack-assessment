import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { GraphQLError } from "graphql";

const app = express();
dotenv.config();
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const prisma = new PrismaClient();

const typeDefs = `#graphql
    type Auth{
        id: ID,
        email: String,
        password: String,
        status: Boolean,
        user: User
    }
    
    type User{
        id: ID,
        first_name: String,
        last_name: String,
        address: String,
        phone: String
    }

    type AuthInstance{
        id: ID,
        first_name: String,
        email: String,
        last_name: String,
        address: String,
        phone: String
    }

    type ErrorAuthInstance{
        error: String,
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
        auths: [Auth],
        login(email: String!, password: String!): Auth
        signup(
            first_name: String!, 
            last_name: String!,
            address: String!,
            email: String!,
            phone: String!,
            password: String!
        ): AuthInstance,
        users: [User],
        products: [Product]
    }
`;

const resolvers = {
    Query: {
        auths() {
            return prisma.auth.findMany({});
        },
        async login(_: any, args: { email: string; password: string }) {
            const auth = await prisma.auth.findFirst({
                where: {
                    email: args.email,
                    password: args.password,
                },
                include: { user: true },
            });
            return auth;
        },
        async signup(
            _: any,
            args: {
                first_name: string;
                last_name: string;
                address: string;
                email: string;
                phone: string;
                password: string;
            }
        ) {
            // try {
            const checkEmail = await prisma.auth.findFirst({
                where: {
                    email: args.email,
                },
            });
            if (checkEmail && checkEmail.email) {
                throw new GraphQLError("Invalid argument value", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        argumentName: "id",
                    },
                });
            }
            const user = await prisma.user.create({
                data: {
                    first_name: args.first_name,
                    last_name: args.last_name,
                    address: args.address,
                    phone: args.phone,
                },
            });
            const auth = await prisma.auth.create({
                data: {
                    email: args.email,
                    password: args.password,
                    userId: user.id,
                    status: true,
                },
            });
            return { ...user, email: auth.email };
            // } catch (error) {
            //     console.log(error);
            // }
        },
        products() {
            return prisma.product.findMany({});
        },
    },
};

type CustomError = {
    code: string;
    message: string;
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (formattedError, error) => {
        if (error instanceof Error) {
            // console.log(error.name)
            // return {
            //   message: error.originalError.message,
            //   extensions: {
            //     code: error.originalError.code,
            //   },
            // };
        }
        console.log(error);
        return {
            ...formattedError,
            message: "Ok",
        };
    },
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
