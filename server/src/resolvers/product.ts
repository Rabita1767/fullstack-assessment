import { prisma } from "../config/prisma";

class _Product_ {
    async allProductsQuery() {
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
    }

    async oneProductQuery(_: any, args: { id: string }) {
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
    }

    async productAddMutation(
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
    }

    async productUpdateMutation(
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
    }
}

const Product = new _Product_();
export default Product;
