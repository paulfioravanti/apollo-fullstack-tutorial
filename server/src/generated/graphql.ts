import { GraphQLResolveInfo } from "graphql"
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] }
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Query = {
  __typename?: "Query"
  launch?: Maybe<Launch>
  launches: LaunchConnection
  me?: Maybe<User>
}


export type QueryLaunchArgs = {
  id: Scalars["ID"]
}


export type QueryLaunchesArgs = {
  pageSize?: Maybe<Scalars["Int"]>
  after?: Maybe<Scalars["String"]>
}

export type Mutation = {
  __typename?: "Mutation"
  login?: Maybe<Scalars["String"]>
  bookTrips: TripUpdateResponse
  cancelTrip: TripUpdateResponse
}


export type MutationLoginArgs = {
  email?: Maybe<Scalars["String"]>
}


export type MutationBookTripsArgs = {
  launchIds: Array<Maybe<Scalars["ID"]>>
}


export type MutationCancelTripArgs = {
  launchId: Scalars["ID"]
}

export type Launch = {
  __typename?: "Launch"
  id: Scalars["ID"]
  site?: Maybe<Scalars["String"]>
  mission?: Maybe<Mission>
  rocket?: Maybe<Rocket>
  isBooked: Scalars["Boolean"]
}

/**
 * Simple wrapper around our list of launches that contains a cursor to the
 * last item in the list. Pass this cursor to the launches query to fetch results
 * after these.
 */
export type LaunchConnection = {
  __typename?: "LaunchConnection"
  cursor: Scalars["String"]
  hasMore: Scalars["Boolean"]
  launches: Array<Maybe<Launch>>
}

export type Mission = {
  __typename?: "Mission"
  name?: Maybe<Scalars["String"]>
  missionPatch?: Maybe<Scalars["String"]>
}


export type MissionMissionPatchArgs = {
  size?: Maybe<PatchSize>
}

export enum PatchSize {
  Small = "SMALL",
  Large = "LARGE"
}

export type Rocket = {
  __typename?: "Rocket"
  id: Scalars["ID"]
  name?: Maybe<Scalars["String"]>
  type?: Maybe<Scalars["String"]>
}

export type TripUpdateResponse = {
  __typename?: "TripUpdateResponse"
  success: Scalars["Boolean"]
  message?: Maybe<Scalars["String"]>
  launches?: Maybe<Array<Maybe<Launch>>>
}

export type User = {
  __typename?: "User"
  id: Scalars["ID"]
  email: Scalars["String"]
  profileImage?: Maybe<Scalars["String"]>
  trips: Array<Maybe<Launch>>
}

export type WithIndex<TObject> = TObject & Record<string, any>
export type ResolversObject<TObject> = WithIndex<TObject>

export type ResolverTypeWrapper<T> = Promise<T> | T


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>
export type Resolver<TResult, TParent = Record<string, unknown>, TContext = Record<string, unknown>, TArgs = Record<string, unknown>> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<string, unknown>, TContext = Record<string, unknown>, TArgs = Record<string, unknown>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = Record<string, unknown>, TContext = Record<string, unknown>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = Record<string, unknown>> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<TResult = Record<string, unknown>, TParent = Record<string, unknown>, TContext = Record<string, unknown>, TArgs = Record<string, unknown>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<Record<string, unknown>>
  ID: ResolverTypeWrapper<Scalars["ID"]>
  Int: ResolverTypeWrapper<Scalars["Int"]>
  String: ResolverTypeWrapper<Scalars["String"]>
  Mutation: ResolverTypeWrapper<Record<string, unknown>>
  Launch: ResolverTypeWrapper<Launch>
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>
  LaunchConnection: ResolverTypeWrapper<LaunchConnection>
  Mission: ResolverTypeWrapper<Mission>
  PatchSize: PatchSize
  Rocket: ResolverTypeWrapper<Rocket>
  TripUpdateResponse: ResolverTypeWrapper<TripUpdateResponse>
  User: ResolverTypeWrapper<User>
}>

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: Record<string, unknown>
  ID: Scalars["ID"]
  Int: Scalars["Int"]
  String: Scalars["String"]
  Mutation: Record<string, unknown>
  Launch: Launch
  Boolean: Scalars["Boolean"]
  LaunchConnection: LaunchConnection
  Mission: Mission
  Rocket: Rocket
  TripUpdateResponse: TripUpdateResponse
  User: User
}>

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]> = ResolversObject<{
  launch?: Resolver<Maybe<ResolversTypes["Launch"]>, ParentType, ContextType, RequireFields<QueryLaunchArgs, "id">>
  launches?: Resolver<ResolversTypes["LaunchConnection"], ParentType, ContextType, RequireFields<QueryLaunchesArgs, never>>
  me?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>
}>

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]> = ResolversObject<{
  login?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType, RequireFields<MutationLoginArgs, never>>
  bookTrips?: Resolver<ResolversTypes["TripUpdateResponse"], ParentType, ContextType, RequireFields<MutationBookTripsArgs, "launchIds">>
  cancelTrip?: Resolver<ResolversTypes["TripUpdateResponse"], ParentType, ContextType, RequireFields<MutationCancelTripArgs, "launchId">>
}>

export type LaunchResolvers<ContextType = any, ParentType extends ResolversParentTypes["Launch"] = ResolversParentTypes["Launch"]> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  site?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  mission?: Resolver<Maybe<ResolversTypes["Mission"]>, ParentType, ContextType>
  rocket?: Resolver<Maybe<ResolversTypes["Rocket"]>, ParentType, ContextType>
  isBooked?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}>

export type LaunchConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes["LaunchConnection"] = ResolversParentTypes["LaunchConnection"]> = ResolversObject<{
  cursor?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  hasMore?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>
  launches?: Resolver<Array<Maybe<ResolversTypes["Launch"]>>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}>

export type MissionResolvers<ContextType = any, ParentType extends ResolversParentTypes["Mission"] = ResolversParentTypes["Mission"]> = ResolversObject<{
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  missionPatch?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType, RequireFields<MissionMissionPatchArgs, never>>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}>

export type RocketResolvers<ContextType = any, ParentType extends ResolversParentTypes["Rocket"] = ResolversParentTypes["Rocket"]> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}>

export type TripUpdateResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes["TripUpdateResponse"] = ResolversParentTypes["TripUpdateResponse"]> = ResolversObject<{
  success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>
  message?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  launches?: Resolver<Maybe<Array<Maybe<ResolversTypes["Launch"]>>>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}>

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  profileImage?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  trips?: Resolver<Array<Maybe<ResolversTypes["Launch"]>>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}>

export type Resolvers<ContextType = any> = ResolversObject<{
  Query?: QueryResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  Launch?: LaunchResolvers<ContextType>
  LaunchConnection?: LaunchConnectionResolvers<ContextType>
  Mission?: MissionResolvers<ContextType>
  Rocket?: RocketResolvers<ContextType>
  TripUpdateResponse?: TripUpdateResponseResolvers<ContextType>
  User?: UserResolvers<ContextType>
}>


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>
