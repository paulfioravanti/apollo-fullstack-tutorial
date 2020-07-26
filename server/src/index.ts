import { config } from "dotenv"

config()

import { ApolloServer } from "apollo-server"
import { typeDefs } from "./schema"
import { resolvers } from "./resolvers"
import { initStore } from "./store"
import { LaunchAPI } from "./datasources/launch"
import { UserAPI } from "./datasources/user"
import { internalEngineDemo } from "./engine-demo"
import { initContext } from "./context"

export { typeDefs, resolvers, ApolloServer, LaunchAPI, UserAPI }

// creates a sequelize connection once. NOT for every request
export const store = initStore()
export const context = initContext(store)

// set up any dataSources our resolvers need
export const dataSources = () => ({
  launchAPI: new LaunchAPI(),
  userAPI: new UserAPI({ store })
})

// Set up Apollo Server
export const server: ApolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context,
  introspection: true,
  playground: true,
  engine: {
    reportSchema: true,
    apiKey: process.env.ENGINE_API_KEY,
    ...internalEngineDemo
  }
})

const PORT: string = process.env.PORT || "4000"

// Start our server if we're not in a test env.
// if we're in a test env, we'll manually start it in a test
if (process.env.NODE_ENV !== "test") {
  server
    .listen({ port: PORT })
    // eslint-disable-next-line no-console
    .then(({ url }) => console.log(`🚀 app running at ${url}`))
}
