import { Sequelize, ModelDefined, DataTypes } from "sequelize"
import { Model } from "sequelize/types"

export type TripAttributes = {
  createdAt: Date
  updatedAt: Date
  launchId: string
  userId: string
}
type TripCreationAttributes = Partial<TripAttributes>
export type TripModel = Model<TripAttributes, TripCreationAttributes>
export type TripDefinition =
  ModelDefined<TripAttributes, TripCreationAttributes>

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
