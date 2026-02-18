export class LoggerSingleton {
  constructor() {
    this.logs = [];
  }

  static #instance = null;

  static getInstance() {
    if (!LoggerSingleton.#instance) {
      LoggerSingleton.#instance = new LoggerSingleton();
    }

    return LoggerSingleton.#instance;
  }

  log(msg, level) {
    const entry = `${new Date().toISOString()} \n ${level} - ${msg}`;
    this.logs.push(entry);
  }

  info(msg) {
    this.log(msg, "info");
  }

  warn(msg) {
    this.log(msg, "warn");
  }

  error(msg) {
    this.log(msg, "error");
  }

  getHistory() {
    return [...this.logs];
  }
}
