export const resolvers = {
  Mutation: {
    login
  }
}

export async function login(_parent, { email }, { dataSources: { userAPI } }) {
  const user = await userAPI.findOrCreateUser({ email })
  if (user) {
    return Buffer.from(email).toString("base64")
  }
}
