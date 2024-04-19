import { GraphQLError } from "graphql";
import { prisma } from "../config/prisma";

class _Purchase_ {
    async purchaseProduct(
        _: any,
        args: {
            productId: number;
            userId: number;
        }
    ) {
        const selfProduct = await prisma.product.findFirst({
            where: {
                id: args.productId,
                userId: args.userId,
            },
        });
        if (selfProduct) {
            throw new GraphQLError("Cannot purchase own product!", {
                extensions: {
                    code: "BAD_USER_INPUT",
                    argumentName: "id",
                },
            });
        }
        const newPurchase = await prisma.purchases.create({
            data: {
                date: new Date(),
                productId: args.productId,
                userId: args.userId,
            },
        });

        return newPurchase;
    }
}

const Purchase = new _Purchase_();
export default Purchase;
