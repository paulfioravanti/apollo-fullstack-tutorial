import {
  MutationResolvers,
  ResolversParentTypes
} from "../../generated/graphql"
import { Maybe, MaybeNull } from "../../utils"
import { UserAPI } from "../../datasources/user"
import { UserAttributes } from "../../store/user"

export const AuthResolvers: MutationResolvers = {
  Mutation: {
    login
  }
}

export async function login(
  _parent: ResolversParentTypes["User"],
  { email }: { email: string },
  { dataSources: { userAPI } }: { dataSources: { userAPI: UserAPI } }
): Promise<Maybe<string>> {
  const user: MaybeNull<UserAttributes> =
    await userAPI.findOrCreateUser({ email })

  if (user) {
    return Buffer.from(email).toString("base64")
  }
}
