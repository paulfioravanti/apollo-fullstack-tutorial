import dotenv from "dotenv"
import apolloserver from "apollo-server"
import { typeDefs } from "./schema.js"
import { resolvers } from "./resolvers.js"
import { initStore } from "./store.js"
import { LaunchAPI } from "./datasources/launch.js"
import { UserAPI } from "./datasources/user.js"
import { internalEngineDemo } from "./engine-demo.js"
import { initContext } from "./context.js"

dotenv.config()

const { ApolloServer } = apolloserver

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
export const server = new ApolloServer({
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

// Start our server if we're not in a test env.
// if we're in a test env, we'll manually start it in a test
if (process.env.NODE_ENV !== "test") {
  server
    .listen({ port: process.env.PORT || 4000 })
    .then(({ url }) => console.log(`🚀 app running at ${url}`))
}
