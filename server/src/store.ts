import { Options, Sequelize } from "sequelize"
import {
  UserAttributes,
  UserDefinition,
  UserModel,
  defineUser
} from "./store/user"
import {
  TripAttributes,
  TripDefinition,
  TripModel,
  defineTrip
} from "./store/trip"
import config from "./store/config.json"

export { UserAttributes, UserModel, TripAttributes, TripModel }

export type Store = {
  db: Sequelize
  users: UserDefinition
  trips: TripDefinition
}

export function initStore(): Store {
  const db: Sequelize = new Sequelize(config as Options)
  const users: UserDefinition = defineUser(db)
  const trips: TripDefinition = defineTrip(db)

  return { db, users, trips }
}
