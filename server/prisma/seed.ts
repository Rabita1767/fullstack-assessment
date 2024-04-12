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
                // email: "snigdho.howlader@gmail.com",
            },
            {
                id: 2,
                first_name: "Arup Kumar",
                last_name: "Saha",
                address: "Dhaka, Bangladesh",
                phone: "+8802222222222",
                // email: "giorno.giovanna@gmail.com",
            },
            {
                id: 3,
                first_name: "Meraj",
                last_name: "Kabir",
                address: "Dhaka, Bangladesh",
                phone: "+8803333333333",
                // email: "jotaro.kujo@morio.com",
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
                title: "Samsung Galax 123",
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed elementum tellus. Etiam placerat ullamcorper turpis a ultricies. Cras gravida ipsum sapien, ac suscipit nibh scelerisque nec. Donec maximus finibus velit nec tincidunt. Integer nulla urna, luctus vitae diam sit amet, consectetur luctus erat. Donec nec odio lobortis, eleifend eros sollicitudin, tempor neque. Phasellus bibendum, nisi vitae ultricies imperdiet, quam libero imperdiet augue, ut rhoncus arcu lorem nec quam. Aliquam aliquet enim eu vulputate congue. Donec sodales nunc at lacinia maximus. \n\nCras quis metus ante. Vivamus vestibulum nibh vitae tristique aliquam. Curabitur suscipit efficitur dui, eget pellentesque turpis gravida non. Vivamus a dignissim massa. Nulla lobortis eros vitae risus tristique, sed varius massa pretium. Vivamus at lorem auctor, elementum sem sit amet, finibus ex. Aenean id metus in nulla ultricies tincidunt. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc arcu nisi, semper luctus vehicula sit amet, luctus ut elit.\n\nFusce quis nisl sit amet lectus dignissim facilisis. ",
                price: 2000,
                posted: new Date(),
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
