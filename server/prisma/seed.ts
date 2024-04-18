/// <reference types="node" />
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    const users = await prisma.user.createMany({
        data: [
            {
                id: 1,
                first_name: "Snigdho Dip",
                last_name: "Howlader",
                address: "Dhaka, Bangladesh",
                phone: "+8801111111111",
            },
            {
                id: 2,
                first_name: "Arup Kumar",
                last_name: "Saha",
                address: "Dhaka, Bangladesh",
                phone: "+8802222222222",
            },
            {
                id: 3,
                first_name: "Meraj",
                last_name: "Kabir",
                address: "Dhaka, Bangladesh",
                phone: "+8803333333333",
            },
        ],
    });

    const auth = await prisma.auth.createMany({
        data: [
            {
                id: 1,
                email: "snigdho.howlader@gmail.com",
                password: "Abc@1234",
                userId: 1,
                admin: true,
                status: true,
            },
            {
                id: 2,
                email: "arup.kumar@gmail.com",
                password: "Abc@1234",
                userId: 2,
                admin: false,
                status: true,
            },
            {
                id: 3,
                email: "meraj.kabir@gmail.com",
                password: "Abc@1234",
                userId: 3,
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
            },
        ],
    });

    const categories = await prisma.category.createMany({
        data: [
            {
                name: "smartphones",
                id: 1,
                created: new Date(),
            },
            {
                name: "phones",
                id: 2,
                created: new Date(),
            },
            {
                name: "electronics",
                id: 3,
                created: new Date(),
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
