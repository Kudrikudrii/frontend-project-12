const apiPath = '/api/v1'

export default {
  loginPath: () => [apiPath, 'login'].join('/'),
  dataPath: () => [apiPath, 'data'].join('/'),
  // messagesPath: () => [apiPath, 'messages'].join('/'),
  messagesPath: (id = '') => [apiPath, 'messages', id].join('/').replace(/\/+$/, ''),
  channelsPath: (id = '') => [apiPath, 'channels', id].join('/').replace(/\/+$/, ''),
  newUserPath: () => [apiPath, 'signup'].join('/'),
}