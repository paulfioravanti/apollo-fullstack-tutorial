import { Sequelize } from "sequelize"

export function initStore() {
  const db = new Sequelize({
    dialect: "sqlite",
    storage: "./store.sqlite"
  })

  const users = db.define("user", {
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
    email: Sequelize.STRING,
    profileImage: Sequelize.STRING,
    token: Sequelize.STRING,
  })

  const trips = db.define("trip", {
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
    launchId: Sequelize.INTEGER,
    userId: Sequelize.INTEGER,
  })

  return { db, users, trips }
}
