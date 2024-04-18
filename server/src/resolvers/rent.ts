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
