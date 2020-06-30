import { paginateResults } from "../../utils.js"

export async function launches(
  _parent,
  { pageSize = 20, after },
  { dataSources: { launchAPI } }
) {
  const results = await launchAPI.getAllLaunches()
  // we want these in reverse chronological order
  results.reverse()

  const launches = paginateResults({ after, pageSize, results })
  const resultsCursor = results[results.length - 1].cursor
  const pageCursor = launches[launches.length - 1].cursor
  const cursor = launches.length ? pageCursor : null
  // if the cursor of the end of the paginated results is the same as the
  // last item in _all_ results, then there are no more results after this
  const hasMore = launches.length ? pageCursor !== resultsCursor : false

  return { launches, cursor, hasMore }
}
