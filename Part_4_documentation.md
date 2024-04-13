Teebay App

1. ##### Biggest changes involved.
    As GraphQL is not something I was familar with, it was the biggest challenge. Coming up with the database schema was the other most challenging part as per my implementation. Understanding how renting, purchasing and categorizing the products was a huge challenge. For each of the most challenging aspects, here is what I have done:
    1. To tackle the requirement of GraphQL I quickly read through the very basics of grpahql and it took some time to go through how graphql can be integrated with express or node. I ended up using the package `@apollo/server` with express as it seemed to be the simplest to use.
    2. To handle the renting, I have maintained a rent_amount and rent_rate for each product which will be fixed for each particular product unless they are changed. This was initially confusing as I assumed a junction/linking table would be required. It ended up causing multiple instances of intricate changes in the schema multiple times and slowed down the development.
    3. Categorizing the products ended up causing confusion as well, as it involves a junction table and the implementation got messy when testing with dummy data from the database, as there was always going to be contraints when working with them.
2. ##### Project Development
    The project has been developed with
    1. React
    2. Express
    3. Node
    4. TypeScript
    5. GraphQL (Apollo)
    6. Prisma ORM
    7. PostgreSQL
