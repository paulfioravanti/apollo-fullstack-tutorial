import isEmail from "isemail"

// the function that sets up the global context for each resolver, using the req
export function globalContext({ users }) {
  return async ({ req }) => {
    // simple auth check on every request
    const auth = (req?.headers.authorization) || ""
    const email = Buffer.from(auth, "base64").toString("ascii")

    // if the email isn't formatted validly, return null for user
    if (!isEmail.validate(email)) return { user: null }

    // find a user by their email
    const result = await users.findOrCreate({ where: { email } })
    const user = result?.[0] || null

    return { user };
  }
}
