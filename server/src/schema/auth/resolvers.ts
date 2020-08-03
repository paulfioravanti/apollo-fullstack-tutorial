import { MutationResolvers, ResolversParentTypes } from "../../generated/graphql"
import { Maybe } from "../../utils"
import { UserAPI } from "../../datasources/user"
import { UserModel } from "../../store/user"

export const resolvers: MutationResolvers = {
  Mutation: {
    login
  }
}

export async function login(
  _parent: ResolversParentTypes["User"],
  { email }: { email: string },
  { dataSources: { userAPI } }: { dataSources: { userAPI: UserAPI } }
): Promise<Maybe<string>> {
  const user: UserModel = await userAPI.findOrCreateUser({ email })

  if (user) {
    return Buffer.from(email).toString("base64")
  }
}
