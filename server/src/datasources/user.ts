import isEmail from "isemail"
import { DataSource, DataSourceConfig } from "apollo-datasource"
import {
  Store,
  TripAttributes,
  TripModel,
  UserAttributes,
  UserModel
} from "../store"
import { Context } from "../context"
import { Maybe, MaybeNull } from "../utils"

export class UserAPI extends DataSource {
  private store: Store
  private context!: Context

  constructor({ store }: { store: Store }) {
    super()
    this.store = store
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  initialize(config: DataSourceConfig<Context>): void {
    this.context = config.context
  }

  /**
   * User can be called with an argument that includes email, but it doesn't
   * have to be. If the user is already on the context, it will use that user
   * instead
   */
  async findOrCreateUser(
    { email: emailArg }: { email?: string } = {}
  ): Promise<MaybeNull<UserAttributes>> {
    const email: Maybe<string> = this.context.user?.email || emailArg
    if (!email || !isEmail.validate(email)) return null

    const [user]: [UserModel, boolean] =
      await this.store.users.findOrCreate({ where: { email } })
    return user ? user.get() : null
  }

  async bookTrips(
    { launchIds }: { launchIds: string[] }
  ): Promise<MaybeNull<TripAttributes[]>> {
    const userId: Maybe<number> = this.context.user?.id
    if (!userId) return null

    const results: TripAttributes[] = []

    // for each launch id, try to book the trip and add it to the results array
    // if successful
    for (const launchId of launchIds) {
      const trip: MaybeNull<TripAttributes> = await this.bookTrip({ launchId })
      if (trip) results.push(trip)
    }

    return results
  }

  async bookTrip(
    { launchId }: { launchId: string }
  ): Promise<MaybeNull<TripAttributes>> {
    const userId: Maybe<number> = this.context.user?.id
    const [trip]: [TripModel, boolean] = await this.store.trips.findOrCreate({
      where: { userId, launchId }
    })
    return trip ? trip.get() : null
  }

  async cancelTrip({ launchId }: { launchId: string }): Promise<boolean> {
    const userId: Maybe<number> = this.context.user?.id
    return !!this.store.trips.destroy({ where: { userId, launchId } })
  }

  async getLaunchIdsByUser(): Promise<string[]> {
    const userId: Maybe<number> = this.context.user?.id
    const trips: TripModel[] = await this.store.trips.findAll({
      where: { userId }
    })
    if (!trips || !trips.length) return []

    return (
      trips
        .map((trip: TripModel) => trip.getDataValue("launchId"))
        .filter(trip => !!trip)
    )
  }

  async isBookedOnLaunch({ launchId }: { launchId: string }): Promise<boolean> {
    if (!this.context || !this.context.user) return false

    const userId: Maybe<number> = this.context.user?.id
    const trips: TripModel[] = await this.store.trips.findAll({
      where: { userId, launchId }
    })

    return trips && trips.length > 0
  }
}
