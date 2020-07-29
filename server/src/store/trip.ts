import { Sequelize, ModelDefined, DataTypes } from "sequelize"

export type TripDefinition =
  ModelDefined<TripAttributes, TripCreationAttributes>
type TripAttributes = {
  createdAt: Date
  updatedAt: Date
  launchId: number
  userId: number
}
type TripCreationAttributes = Partial<TripAttributes>

export function defineTrip(db: Sequelize): TripDefinition {
  return (
    db.define("trip", {
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      launchId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER
    })
  )
}
