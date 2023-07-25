'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');

/**
 * 判断配置文件是否存在
 */
function isExit() {
  let success = true;
  if (!(localConfig.config && typeof localConfig.config === 'object')) {
    success = initConfig();
  }
  return success;
}

/**
 * 初始化config
 */
function initConfig() {
  try {
    const config = readConfig();
    if (config) {
      localConfig.config = JSON.parse(config);
      return true;
    }
    const defalutConfig = {};
    const content = JSON.stringify(defalutConfig);
    fs.writeFileSync(localConfig.configUrl, content);
    localConfig.config = defalutConfig;
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * 读取文件
 */
function readConfig() {
  try {
    const result = fs.readFileSync(localConfig.configUrl);
    return result;
  } catch (error) {
    return false;
  }
}

/**
 * 写入文件
 */
function writeConfig(value) {
  try {
    const content = JSON.stringify(value);
    fs.writeFileSync(localConfig.configUrl, content);
    return true;
  } catch (e) {
    return false;
  }
}

const localConfig = {
    config: null,
    configUrl: path.join(path.dirname(os.homedir()), 'localConfig.json'),
    setStoragePath: (filePath) => {
      let configFilePath = filePath;
      if(!fs.existsSync(configFilePath)) {
        fs.mkdirSync(configFilePath, {recursive:true});
      }
      localConfig.configUrl = path.join(configFilePath, 'localConfig.json');
    },
    getStoragePath: () => {
      return localConfig.configUrl;
    },
    getItem: (key) => {
      if (isExit()) {
        const result = localConfig.config[key];
        return result || null;
      }
      return null;
    },
    setItem: (key, value) => {
      if (isExit()) {
        const config = Object.assign({}, localConfig.config);
        config[key] = value;
        const suc = writeConfig(config);
        if (suc) {
            localConfig.config = config;
            return true;
        }
      }
      return false;
    },
    getAll: () => {
      if (isExit()) {
        return localConfig.config;
      }
      return null;
    },
    removeItem: (key) => {
      const value = localConfig.getItem(key);
      if (value) {
        const config = Object.assign({}, localConfig.config);
        delete config[key];
        if (writeConfig(config)) {
          localConfig.config = config;
          return true;
        }
      }
      return false;
    },
    clear: () => {
      if (isExit()) {
        if (writeConfig({})) {
          localConfig.config = {};
          return true;
        }
      }
      return false;
    }
}

module.exports = localConfig;