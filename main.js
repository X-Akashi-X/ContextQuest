import { TextMessage, ImageMessage, SystemMessage } from './models/message.js'

import {
  PlainTextStrategy,
  MarkdownStrategy,
  JsonStrategy,
  MessageFormatter,
} from "./patterns/strategy.js";

import {
  MessageBus,
  LoggingObserver,
  MetricsObserver,
  AlertObserver,
} from "./patterns/observer.js";

import { ConfigSingleton } from "./patterns/singletons/config.js";
import { LoggerSingleton } from "./patterns/singletons/loger.js";

import { MessageHandler } from "./utils/MessageHandler.js";
import { ValidationError } from './utils/errors.js';

// Этап 1

function processMessage(msg) {
  if (
    msg instanceof TextMessage ||
    msg instanceof ImageMessage ||
    msg instanceof SystemMessage
  ) {
    return msg.toString();
  }
}

function validateMessage(msg) {
  if (!msg.payload || !typeof(msg.payload) === 'object') {
    throw new ValidationError("Invalid payload", { msg });
  }
}

const textMessage = new TextMessage(
  1,
  new Date("2012-01-26"),
  {
    status: "ok",
    data: "Hello world",
  },
  "text",
  "Hello world",
);
const imageMessage = new ImageMessage(
  1,
  new Date("2017-01-26"),
  {
    status: "error",
    data: "Hello ocean",
  },
  "text",
  "https://img.freepik.com/premium-photo/road-passing-through-tree-lined-streets_1048944-10973350.jpg?semt=ais_hybrid&w=740",
  200,
  100,
);
const systemMessage = new SystemMessage(
  1,
  new Date("2019-01-26"),
  {
    status: "ok",
    data: "Hello river",
  },
  "text",
  ["info", "warn", "error"],
);

const messages = [textMessage, imageMessage, systemMessage];

console.log(processMessage(textMessage));
console.log(processMessage(imageMessage));
console.log(processMessage(systemMessage));

//Этап 2/4
const msg = {
  title: "Стратегия",
  content: "Пример паттерна",
};

const plainText = new PlainTextStrategy();
const markDown = new MarkdownStrategy();
const json = new JsonStrategy();
const config = ConfigSingleton.getInstance();
const logger = LoggerSingleton.getInstance();

//console.log(iformat.format());

const formater = new MessageFormatter(config);
console.log(formater.generate(msg));

config.setEnv("prod");
config.setFeatureFlags("enableMetrics", true);
config.setDefaultStrategyName("json");
formater.refreshStrategy();
console.log(formater.generate(msg));
console.log(config.env);

formater.setStrategy(plainText);
console.log(formater.generate(msg));

formater.setStrategy(markDown);
console.log(formater.generate(msg));
console.log(formater.generate(systemMessage));

formater.setStrategy(json);
console.log(formater.generate(msg));

//Этап 3
const bus = new MessageBus();
const logging = new LoggingObserver();
const metrics = new MetricsObserver();
const alert = new AlertObserver();

bus.attach(logging);
bus.attach(metrics);
bus.attach(alert);

bus.receiveMessage(textMessage);
bus.receiveMessage(imageMessage);
bus.receiveMessage("Проверка Alert");
bus.receiveMessage(systemMessage);

//Этап 4
logger.info("System started");
logger.warn("Low memory");
logger.error("Unhandled exception");
console.log(logger.getHistory());

//Этап 6
const handler = new MessageHandler(bus, formater);
console.log(handler.handle(textMessage));
console.log(handler.handle(imageMessage));
console.log(handler.handle(systemMessage));