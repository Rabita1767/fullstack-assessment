import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import AuthRouter from "./routes/auth";
import { createHandler } from "graphql-http/lib/use/http";
import { GraphQLSchema, GraphQLObjectType, GraphQLString } from "graphql";
import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server";

const app = express();
dotenv.config();
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const prisma = new PrismaClient();

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server started at: ${process.env.SERVER_PORT}`);
});
