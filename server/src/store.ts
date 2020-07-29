import { Sequelize } from "sequelize"
import { UserDefinition, UserModel, defineUser } from "./store/user"
import { TripDefinition, defineTrip } from "./store/trip"

export { UserModel }

export type Store = {
  db: Sequelize
  users: UserDefinition
  trips: TripDefinition
}

export function initStore(): Store {
  const db: Sequelize =
    new Sequelize({
      dialect: "sqlite",
      storage: "./store.sqlite"
    })
  const users: UserDefinition = defineUser(db)
  const trips: TripDefinition = defineTrip(db)

  return { db, users, trips }
}
