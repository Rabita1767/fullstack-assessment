import { GraphQLError } from "graphql";
import { prisma } from "../config/prisma";
import jsonwebtoken from "jsonwebtoken";

class _Auth_ {
    async loginQuery(_: any, args: { email: string; password: string }) {
        const auth = await prisma.auth.findFirst({
            where: {
                email: args.email,
                password: args.password,
            },
            include: { user: true },
        });
        const response: {
            [key: string]: any;
        } = {
            id: auth?.id,
            email: auth?.email,
            status: auth?.status,
            admin: auth?.admin,
            user: auth?.user,
        };
        if (process.env.JWT_TOKEN) {
            response.token = jsonwebtoken.sign(response, process.env.JWT_TOKEN);
        }
        console.log(response);
        return response;
    }
    
    async signupMutation(
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
    }
}

const Auth = new _Auth_();
export default Auth;
