export class ConfigSingleton {
  constructor() {
    this.env = "dev";
    this.featureFlags = {};
    this.defaultStrategyName = "plain";
  }

  static #instance = null;

  static getInstance() {
    if (!ConfigSingleton.#instance) {
      ConfigSingleton.#instance = new ConfigSingleton();
    }

    return ConfigSingleton.#instance;
  }

  setEnv(env) {
    if (env !== "dev" && env !== "prod") {
      console.log("env должно быть 'dev' или 'prod'");
    }

    this.env = env;
  }

  setFeatureFlags(name, value) {
    this.featureFlags[name] = value;
  }

  setDefaultStrategyName(name) {
    this.defaultStrategyName = name;
  }
}
