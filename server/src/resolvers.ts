import { me } from "./resolvers/queries/me"
import { login } from "./resolvers/mutations/login"
import { trips } from "./resolvers/user/trips"

export const resolvers = {
  Query: {
    me
  },
  Mutation: {
    login
  },
  User: {
    trips
  }
}
