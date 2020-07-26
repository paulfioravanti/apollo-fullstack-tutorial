import { Sequelize, ModelDefined, DataTypes } from "sequelize"

export type UserAttributes = {
  createdAt: Date,
  updatedAt: Date,
  email: string,
  profileImage: string,
  token: string,
}
export type UserCreationAttributes = Partial<UserAttributes>
export type UserDefinition = ModelDefined<UserAttributes, UserCreationAttributes>
type TripAttributes = {
  createdAt: Date,
  updatedAt: Date,
  launchId: number,
  userId: number
}
type TripCreationAttributes = Partial<TripAttributes>
type TripDefinition = ModelDefined<TripAttributes, TripCreationAttributes>
export type Store = {
  db: Sequelize,
  users: UserDefinition,
  trips: TripDefinition
}

export function initStore(): Store {
  const db: Sequelize =
    new Sequelize({
      dialect: "sqlite",
      storage: "./store.sqlite"
    })

  const users: UserDefinition =
    db.define("user", {
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      email: DataTypes.STRING,
      profileImage: DataTypes.STRING,
      token: DataTypes.STRING
    })

  const trips: TripDefinition =
    db.define("trip", {
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      launchId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER
    })

  return { db, users, trips }
}
