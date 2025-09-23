
export const rollbarConfig = {
  accessToken: import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN,
  environment: import.meta.env.MODE || 'production',
  captureUncaught: import.meta.env.PROD,
  captureUnhandledRejections: import.meta.env.PROD,
  enabled: import.meta.env.PROD,

  itemsPerMinute: 10,
  maxItems: 50,
  
  payload: {
    client: {
      javascript: {
        code_version: '1.0.0',
        source_map_enabled: true,
        guess_uncaught_frames: true
      }
    }
  }
};