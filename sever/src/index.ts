require('dotenv').config()
import 'reflect-metadata'
import express from 'express'
import { createConnection } from 'typeorm'
import { User } from './entities/User'
import { Post } from './entities/Post'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { HelloResolver } from './resolvers/hello'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'

const main = async () => {
    await createConnection({
        type: 'postgres',
        database: 'reddit',
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        logging: true,
        synchronize: true,
        entities: [User, Post]
    })

    const app = express()

    const apolloserver = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver], validate: false}),
        plugins: [ApolloServerPluginLandingPageGraphQLPlayground()]
    })

    await apolloserver.start()

    apolloserver.applyMiddleware({ app, cors: false})

    const PORT  = process.env.PORT || 4000

    app.listen(PORT, () => console.log(
        `Server started on port ${PORT}, server GrapSQL started on localhost:${PORT}${apolloserver.graphqlPath}`
        )
    );
    
}

main().catch(error => console.log(error))
