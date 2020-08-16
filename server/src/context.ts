import isEmail from "isemail"
import { Request } from "express"
import { ContextFunction } from "apollo-server-core"
import { Store, UserAttributes, UserModel } from "./store"
import { MaybeNull } from "./utils"

export type Context = {
  user: MaybeNull<UserAttributes>
}

type Result = [UserModel, boolean]

// the function that sets up the global context for each resolver, using the req
export function initContext({ users }: Store): ContextFunction {
  return async ({ req }: { req: Request }): Promise<Context> => {
    // simple auth check on every request
    const auth: string = (req?.headers.authorization) || ""
    const email: string = Buffer.from(auth, "base64").toString("ascii")

    // if the email isn't formatted validly, return null for user
    if (!isEmail.validate(email)) return { user: null }

    // find a user by their email
    const [result]: Result = await users.findOrCreate({ where: { email } })
    const user: MaybeNull<UserAttributes> = result ? result.get() : null

    return { user }
  }
}
