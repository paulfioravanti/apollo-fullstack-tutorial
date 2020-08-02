import { me } from "./resolvers/queries/me"
import { bookTrips } from "./resolvers/mutations/book-trips"
import { cancelTrip } from "./resolvers/mutations/cancel-trip"
import { login } from "./resolvers/mutations/login"
import { missionPatch } from "./resolvers/mission/mission-patch"
import { trips } from "./resolvers/user/trips"

export const resolvers = {
  Query: {
    me
  },
  Mutation: {
    bookTrips,
    cancelTrip,
    login
  },
  Mission: {
    missionPatch
  },
  User: {
    trips
  }
}
