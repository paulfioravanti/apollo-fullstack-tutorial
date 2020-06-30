export async function uploadProfileImage(
  _parent,
  { file },
  { dataSources: { userAPI } }
) {
  return userAPI.uploadProfileImage({ file })
}
