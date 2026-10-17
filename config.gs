function getConfig(key) {
  return PropertiesService.getScriptProperties().getProperty(key) || '';
}

function setConfig(key, value) {
  PropertiesService.getScriptProperties().setProperty(key, value);
}

// Initialize defaults
function initConfig() {
  const defaults = {
    JWT_SECRET: 'caligym-secret-change-me',
    DB_ID: 'your-sheet-id-here',
    API_VERSION: 'v1',
    ENV: 'development'
  };
  for (const k in defaults) {
    if (!getConfig(k)) setConfig(k, defaults[k]);
  }
}
