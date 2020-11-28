import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { RegisterResolver } from "./modules/user/Register";


const main = async () => {
    const connection = await createConnection();
    await connection.synchronize();

    const schema = await buildSchema({
        resolvers: [RegisterResolver],
    });

    const apolloServer = new ApolloServer({ schema });
    
    const app = Express();

    apolloServer.applyMiddleware({ app });

    const PORT = 5544
    app.listen(PORT, () =>{
        console.log(`Running on http://localhost:${PORT}/graphql`);
    })
}


main();