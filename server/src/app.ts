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
        admin: Boolean,
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
        rent_amount:Int,
        rent_rate: String,
        posted: String,
        views: Int,
        status: String
        category_product: [Category_Product],
    }

    type Category{
        id: ID,
        name: String,
        created: String,
    }

    type Category_Product{
        id: ID,
        categoryId: String,
        category: Category,
        product: Product,
        productId: String
    }

    type Query{
        auths: [Auth],
        login(email: String!, password: String!): Auth,
        users: [User],
        products: [Product]
        product(id: String!): Product
        category: [Category]
    }

    type Mutation{
        signup(
            first_name: String!, 
            last_name: String!,
            address: String!,
            email: String!,
            phone: String!,
            password: String!
        ): AuthInstance,
        productAdd(
            title: String!,
            description: String!,
            price: Int!,
            rent_amount: Int!,
            rent_rate: String!,
            category: [String],
            posted: String!,
        ): Product
        productUpdate(
            id: ID
            title: String,
            description: String,
            category: [String],
            price: Int,
            rent_amount: Int,
            rent_rate: String
        ): Product
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
        async products() {
            return prisma.product.findMany({
                include: {
                    category_product: {
                        include: {
                            category: true,
                        },
                        take: 100,
                    },
                },
            });
        },
        async product(_: any, args: { id: string }) {
            const product = await prisma.product.findFirst({
                where: {
                    id: Number(args.id),
                },
                include: {
                    category_product: {
                        include: {
                            category: true,
                        },
                    },
                },
            });
            // console.log(product?.category_product);
            return product;
        },
        async category() {
            const categories = await prisma.category.findMany({});
            return categories;
        },
    },
    Mutation: {
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
            const checkEmail = await prisma.auth.findFirst({
                where: {
                    email: args.email,
                },
            });
            if (checkEmail && checkEmail.email) {
                throw new GraphQLError("Email already exists!", {
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
        },
        async productAdd(
            _: any,
            args: {
                title: string;
                description: string;
                price: string;
                rent_amount: string;
                rent_rate: string;
                category: string[];
                posted: string;
            }
        ) {
            // const { title } = args;
            const product = await prisma.product.create({
                data: {
                    title: args.title,
                    description: args.description,
                    price: Number(args.price),
                    rent_amount: Number(args.rent_amount) || undefined,
                    rent_rate: args.rent_rate || undefined,
                    posted: new Date(args.posted),
                    status: true,
                    views: 0,
                },
            });
            const category_product = await prisma.category_Product.createMany({
                data: args.category.map((element) => ({
                    productId: product.id,
                    categoryId: Number(element),
                })),
            });
            const new_product = await prisma.product.findFirst({
                where: { id: product.id },
                include: {
                    category_product: {
                        include: {
                            category: true,
                        },
                    },
                },
            });
            return new_product;
        },
        async productUpdate(
            _: any,
            args: {
                id: string;
                title: string;
                description: string;
                price: string;
                rent_amount: string;
                rent_rate: string;
                category: string[];
            }
        ) {
            await prisma.category_Product.deleteMany({
                where: {
                    productId: Number(args.id),
                },
            });

            let newCategories: { productId: number; categoryId: number }[] = [];

            if (args.category && args.category.length > 0) {
                newCategories = args.category.map((element) => ({
                    productId: Number(args.id),
                    categoryId: Number(element),
                }));
            }

            await prisma.category_Product.createMany({
                data: newCategories,
            });

            const product = await prisma.product.update({
                where: {
                    id: Number(args.id),
                },
                data: {
                    title: args.title || undefined,
                    description: args.description || undefined,
                    price: Number(args.price) || undefined,
                    rent_amount: Number(args.rent_amount) || undefined,
                    rent_rate: args.rent_rate || undefined,
                },
                include: {
                    category_product: {
                        include: {
                            category: true,
                        },
                    },
                },
            });

            // console.log(product);

            return product;
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
