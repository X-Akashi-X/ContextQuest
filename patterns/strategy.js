import { ConfigSingleton } from '../patterns/singletons/config.js'
import {StrategyNotFoundError} from '../utils/errors.js'

//Интерфейс
export class IFormatStrategy {
  format(msg) {
    throw new Error("Метод format должен быть определен в дочернем классе");
  }
}
//Реализация
export class PlainTextStrategy extends IFormatStrategy {
  format(msg) {
    return `${msg.title} - ${msg.content}`;
  }
}

export class MarkdownStrategy extends IFormatStrategy {
  format(msg) {
    if (!msg.severity) {
      return `${msg.title}\n${msg.content}`;
    }

    return `Severity: ${msg.severity[0]};`;
  }
}

export class JsonStrategy extends IFormatStrategy {
  format(msg) {
    return JSON.stringify(msg);
  }
}
//Контекст

export class MessageFormatter {
  constructor(config = ConfigSingleton.getInstance()) {
    this.config = config;
    this.strategy = this.resolveStrategy(config.defaultStrategyName);
  }

  resolveStrategy(name) {
    switch (name) {
      case "plain":
        return new PlainTextStrategy();
      case "markdown":
        return new MarkdownStrategy();
      case "json":
        return new JsonStrategy();
      default:
        return new PlainTextStrategy();
    }
  }

  setStrategy(strategy) {
    if (!strategy) {
      throw new StrategyNotFoundError(strategy?.constructor?.name);
    }
    this.strategy = strategy;
  }

  generate(msg) {
    return this.strategy.format(msg);
  }

  refreshStrategy() {
    this.strategy = this.resolveStrategy(this.config.defaultStrategyName)
  }
}
