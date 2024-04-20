/// <reference types="node" />
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    const users = await prisma.user.createMany({
        data: [
            {
                first_name: "Snigdho Dip",
                last_name: "Howlader",
                address: "Dhaka, Bangladesh",
                phone: "+8801111111111",
            },
            {
                first_name: "Arup Kumar",
                last_name: "Saha",
                address: "Dhaka, Bangladesh",
                phone: "+8802222222222",
            },
            {
                first_name: "Meraj",
                last_name: "Kabir",
                address: "Dhaka, Bangladesh",
                phone: "+8803333333333",
            },
            {
                first_name: "John",
                last_name: "Doe",
                address: "Dhaka, Bangladesh",
                phone: "+8802222222222",
            },
        ],
    });

    const auth = await prisma.auth.createMany({
        data: [
            {
                email: "snigdho.howlader@gmail.com",
                password: "Abc@1234",
                userId: 1,
                admin: false,
                status: true,
            },
            {
                email: "arup.kumar@gmail.com",
                password: "Abc@1234",
                userId: 2,
                admin: false,
                status: true,
            },
            {
                email: "meraj.kabir@gmail.com",
                password: "Abc@1234",
                userId: 3,
                admin: false,
                status: true,
            },
            {
                email: "john.doe@gmail.com",
                password: "Abc@1234",
                userId: 4,
                admin: false,
                status: true,
            },
        ],
    });

    const products = await prisma.product.createMany({
        data: [
            {
                title: "Samsung Galaxy S24 Ultra",
                description:
                    "With the most megapixels on a smartphone and AI processing, Galaxy S24 Ultra sets the industry standard for image quality every time you hit the shutter. What's more, the new ProVisual engine recognizes objects — improving color tone, reducing noise and bringing out detail.",
                price: 1299,
                posted: new Date(),
                rent_amount: 50,
                rent_rate: "month",
                views: 2642,
                userId: 1,
            },
            {
                title: "Apple iPhone 15 Pro max",
                description:
                    "The iPhone 15 Pro Max is the latest addition to the iPhone 15 series, which includes the iPhone 15, iPhone 15 Plus, and iPhone 15 Pro. This smartphone offers 5G connectivity and is available in a range of colors, including Black Titanium, Blue Titanium, Natural Titanium, and White Titanium.",
                price: 1199,
                posted: new Date(),
                rent_amount: 60,
                rent_rate: "month",
                views: 2513,
                userId: 1,
            },

            {
                title: "Dining Table",
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sem mauris, pulvinar non congue a, placerat a est. Vestibulum pretium convallis ultrices. Duis eu feugiat metus. Cras quis imperdiet leo, nec lobortis risus. Praesent quis interdum justo. Suspendisse sit amet lacus non magna aliquet bibendum. Maecenas sit amet porta lorem. Etiam pulvinar nibh et porttitor tincidunt. Nulla ac est urna. Nam feugiat ipsum eu nisl dignissim ultrices. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. ",
                price: 500,
                posted: new Date(),
                rent_amount: 70,
                rent_rate: "month",
                views: 2513,
                userId: 2,
            },
        ],
    });

    const categories = await prisma.category.createMany({
        data: [
            {
                name: "ELECTRONICS",
                created: new Date(),
            },
            {
                name: "FURNITURE",
                created: new Date(),
            },
            {
                name: "HOME APPLIANCES",
                created: new Date(),
            },
            {
                name: "SPORTING GOODS",
                created: new Date(),
            },
            {
                name: "OUTDOOR",
                created: new Date(),
            },
            {
                name: "TOYS",
                created: new Date(),
            },
        ],
    });

    const category_product = await prisma.category_Product.createMany({
        data: [
            {
                categoryId: 1,
                productId: 1,
            },
            {
                categoryId: 1,
                productId: 2,
            },
            {
                categoryId: 2,
                productId: 3,
            },
        ],
    });

    const rent_instance = await prisma.rent_Instance.createMany({
        data: [
            {
                from: new Date("2023-07-01T00:00:00"),
                to: new Date("2023-07-01T00:00:00"),
                userId: 1,
                productId: 1,
            },
            {
                from: new Date("2023-07-01T00:00:00"),
                to: new Date("2023-07-01T00:00:00"),
                userId: 1,
                productId: 2,
            },
        ],
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
