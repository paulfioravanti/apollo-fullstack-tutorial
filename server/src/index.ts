import { config } from "dotenv"

config()

import { ApolloServer } from "apollo-server"
import { ContextFunction } from "apollo-server-core"
import { schema } from "./schema"
import { Store, initStore } from "./store"
import { DataSourcesFunction, initDataSources } from "./datasources"
import { internalEngineDemo } from "./engine-demo"
import { initContext } from "./context"

// creates a sequelize connection once. NOT for every request
export const store: Store = initStore()
export const dataSources: DataSourcesFunction = initDataSources(store)
export const context: ContextFunction = initContext(store)

// Set up Apollo Server
export const server: ApolloServer = new ApolloServer({
  schema,
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
