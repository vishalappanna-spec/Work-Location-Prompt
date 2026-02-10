
// Configuration for Work Location Prompt App
// Fill these values before hosting
window.APP_CONFIG = {
  // Your Genesys Cloud region root (no protocol)
  // Examples: 'euw2.pure.cloud', 'mypurecloud.ie', 'mypurecloud.com', 'apne2.pure.cloud'
  region: 'euw2.pure.cloud',

  // OAuth Client ID (from Admin > Integrations > OAuth). Leave blank if auth is injected by container.
  oauthClientId: 'd69a4efc-e529-4b8f-bc5d-5b32be416e4f',

  // Redirect URI registered on the OAuth client. Usually this page URL.
  redirectUri:'https://vishalappanna-spec.github.io/Work-Location-Prompt/index.html',

  // If true (default), the app will force the agent OFF_QUEUE until they pick Home/Office.
  enforceOffQueue: true
};
