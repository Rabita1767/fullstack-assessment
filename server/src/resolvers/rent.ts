import { GraphQLError } from "graphql";
import { prisma } from "../config/prisma";

class _Rent_ {
    async rentProductMutation(
        _: any,
        args: {
            productId: number;
            userId: number;
            from: string;
            to: string;
        }
    ) {
        if (new Date(args.from) >= new Date(args.to)) {
            throw new GraphQLError(`Product rental dates are not valid`!, {
                extensions: {
                    code: "BAD_USER_INPUT",
                    argumentName: "id",
                },
            });
        }

        const existing = await prisma.rent_Instance.findFirst({
            where: {
                productId: args.productId,
                from: {
                    gte: new Date(args.from),
                },
                to: {
                    lte: new Date(args.to),
                },
            },
            include: {
                product: true,
                user: true,
            },
        });

        // console.log(existing);
        if (existing) {
            throw new GraphQLError(
                `Product is already rented between ${new Date(args.from)} and ${new Date(args.to)}`!,
                {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        argumentName: "id",
                    },
                }
            );
        }

        const newRent = await prisma.rent_Instance.create({
            data: {
                productId: args.productId,
                userId: args.userId,
                from: new Date(args.from),
                to: new Date(args.to),
            },
        });

        return newRent;
    }
}

const Rent = new _Rent_();
export default Rent;
