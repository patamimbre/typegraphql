import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import * as Express from "express";
import { buildSchema, Query, Resolver } from "type-graphql";


@Resolver()
class HelloResolver {
    @Query(() => String, { name: "helloWorld"})
    async hello() {
        return await "Hello world";
    }
}


const main = async () => {
    const schema = await buildSchema({
        resolvers: [HelloResolver],
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