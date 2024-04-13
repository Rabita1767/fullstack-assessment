Teebay App

1. ##### Biggest changes involved.
    As GraphQL is not something I was familar with, it was the biggest challenge. Coming up with the database schema was the other most challenging part as per my implementation. Understanding how renting, purchasing and categorizing the products was a huge challenge. For each of the most challenging aspects, here is what I have done:
    1. To tackle the requirement of GraphQL I quickly read through the very basics of grpahql and it took some time to go through how graphql can be integrated with express or node. I ended up using the package `@apollo/server` with express as it seemed to be the simplest to use.
    2. To handle the renting, I have maintained a rent_amount and rent_rate for each product which will be fixed for each particular product unless they are changed. This was initially confusing as I assumed a junction/linking table would be required. It ended up causing multiple instances of intricate changes in the schema multiple times and slowed down the development.
    3. Categorizing the products ended up causing confusion as well, as it involves a junction table and the implementation got messy when testing with dummy data from the database, as there was always going to be contraints when working with them.
    4. I did not end up doing the rent and purchase modules due to time constraints and bugs already being persistent.
2. ##### Project Development
    The project has been developed with
    1. React
    2. Express
    3. Node
    4. TypeScript
    5. GraphQL (Apollo)
    6. Prisma ORM
    7. PostgreSQL
3. ##### Future Scope (Possible implementations with more time)
    1. The Authentication system is not implemented properly and can be enhanced upon using something similar to Redux Toolkit.
    2. The overall database schema can be made further scalable
4. ##### Project Setup
    In order to run the project, the best solution would be to set it up in Docker compose, however this was not achievable due to time constraints.
    1. The machine should have Node JS and NPM installed.
    2. The machine should also have PostgreSQL installed.
    3. The user should go to the client directory and run the command `npm i`
    4. The user should go to the server directory and run the command `npm i`
    5. The user should setup their necessary env variables in the client and server directories, mainly the PostgreSQL connection string being a huge concern.
    6. Then run the commands `npm run dev` in both the directories (client and server), and the project should be running on both the client and the server
