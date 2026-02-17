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

  info() {
    this.log(msg, "info");
  }

  warn() {
    this.log(msg, "warn");
  }

  error() {
    this.log(msg, "error");
  }

  getHistory() {
    return [...this.history];
  }
}



//const logger = LoggerSingleton.getInstance();
//logger.info("System started");
//logger.warn("Low memory");
//logger.error("Unhandled exception");
//console.log(logger.getHistory());
