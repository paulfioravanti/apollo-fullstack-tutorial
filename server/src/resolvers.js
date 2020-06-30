import { launches } from "./resolvers/launches.js"
import { bookTrips } from "./resolvers/book-trips.js"

export const resolvers = {
  Query: {
    launches: launches,
    launch: (_parent, { id }, { dataSources: { launchAPI } }) =>
      launchAPI.getLaunchById({ launchId: id }),
    me: async (_parent, _args, { dataSources: { userAPI } }) =>
      userAPI.findOrCreateUser(),
  },
  Mutation: {
    bookTrips: bookTrips,
    cancelTrip: async (_parent, { launchId }, { dataSources }) => {
      const result = dataSources.userAPI.cancelTrip({ launchId });

      if (!result)
        return {
          success: false,
          message: 'failed to cancel trip',
        };

      const launch = await dataSources.launchAPI.getLaunchById({ launchId });
      return {
        success: true,
        message: 'trip cancelled',
        launches: [launch],
      };
    },
    login: async (_parent, { email }, { dataSources }) => {
      const user = await dataSources.userAPI.findOrCreateUser({ email });
      if (user) return Buffer.from(email).toString('base64');
    },
    uploadProfileImage: async(_parent, { file }, { dataSources }) =>
      dataSources.userAPI.uploadProfileImage({ file }),
  },
  Launch: {
    isBooked: async (launch, _args, { dataSources }) =>
      dataSources.userAPI.isBookedOnLaunch({ launchId: launch.id }),
  },
  Mission: {
    // make sure the default size is 'large' in case user doesn't specify
    missionPatch: (mission, { size } = { size: 'LARGE' }) => {
      return size === 'SMALL'
        ? mission.missionPatchSmall
        : mission.missionPatchLarge;
    },
  },
  User: {
    trips: async (_parent, _args, { dataSources }) => {
      // get ids of launches by user
      const launchIds = await dataSources.userAPI.getLaunchIdsByUser();

      if (!launchIds.length) return [];

      // look up those launches by their ids
      return (
        dataSources.launchAPI.getLaunchesByIds({
          launchIds,
        }) || []
      );
    },
  },
};
