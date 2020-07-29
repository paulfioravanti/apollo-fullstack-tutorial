import { Sequelize, ModelDefined, DataTypes } from "sequelize"
import { UserDefinition, UserModel, defineUser } from "./store/user"

export { UserModel }

type TripAttributes = {
  createdAt: Date
  updatedAt: Date
  launchId: number
  userId: number
}
type TripCreationAttributes = Partial<TripAttributes>
type TripDefinition = ModelDefined<TripAttributes, TripCreationAttributes>

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

  const trips: TripDefinition =
    db.define("trip", {
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      launchId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER
    })

  return { db, users, trips }
}
