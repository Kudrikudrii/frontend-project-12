const apiPath = '/api/v1'

export default {
  loginPath: () => [apiPath, 'login'].join('/'),
  dataPath: () => [apiPath, 'data'].join('/'),
  messagesPath: () => [apiPath, 'messages'].join('/'),
  channelsPath: () => [apiPath, 'channels'].join('/'),
  newUserPath: () => [apiPath, 'signup'].join('/'),
}