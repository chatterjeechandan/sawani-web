let CONFIG = {};

export function setConfig(newConfig) {
  CONFIG = { ...newConfig };
}

export function getConfig() {
  return CONFIG;
}
