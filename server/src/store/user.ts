import { Sequelize, ModelDefined, DataTypes } from "sequelize"
import { Model } from "sequelize/types"

export type UserModel = Model<UserAttributes, UserCreationAttributes>
export type UserDefinition =
  ModelDefined<UserAttributes, UserCreationAttributes>
type UserAttributes = {
  createdAt: Date
  updatedAt: Date
  email: string
  profileImage: string
  token: string
}
type UserCreationAttributes = Partial<UserAttributes>

export function defineUser(db: Sequelize): UserDefinition {
  return (
    db.define("user", {
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      email: DataTypes.STRING,
      profileImage: DataTypes.STRING,
      token: DataTypes.STRING
    })
  )
}
