import dotenv from "dotenv"
import apolloserver from "apollo-server"
import isEmail from "isemail"
import { typeDefs } from "./schema.js"
import { resolvers } from "./resolvers.js"
import { createStore } from "./utils.js"
import { LaunchAPI } from "./datasources/launch.js"
import { UserAPI } from "./datasources/user.js"
import { internalEngineDemo } from "./engine-demo.js"

const { ApolloServer } = apolloserver

export { typeDefs, resolvers, ApolloServer, LaunchAPI, UserAPI }

// creates a sequelize connection once. NOT for every request
export const store = createStore();

dotenv.config()


// set up any dataSources our resolvers need
export const dataSources = () => ({
  launchAPI: new LaunchAPI(),
  userAPI: new UserAPI({ store }),
});

// the function that sets up the global context for each resolver, using the req
export const context = async ({ req }) => {
  // simple auth check on every request
  const auth = (req.headers && req.headers.authorization) || '';
  const email = new Buffer(auth, 'base64').toString('ascii');

  // if the email isn't formatted validly, return null for user
  if (!isEmail.validate(email)) return { user: null };
  // find a user by their email
  const users = await store.users.findOrCreate({ where: { email } });
  const user = users && users[0] ? users[0] : null;

  return { user };
};

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
    ...internalEngineDemo,
  },
})

// Start our server if we're not in a test env.
// if we're in a test env, we'll manually start it in a test
if (process.env.NODE_ENV !== 'test') {
  server
    .listen({ port: process.env.PORT || 4000 })
    .then(({ url }) => console.log(`🚀 app running at ${url}`))
}
