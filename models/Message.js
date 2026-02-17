import {
  IFormatStrategy,
  PlainTextStrategy,
  MarkdownStrategy,
  JsonStrategy,
  MessageFormatter,
} from "../patterns/strategy.js";
import {
  MessageBus,
  LoggingObserver,
  MetricsObserver,
  AlertObserver,
} from "../patterns/observer.js";

//Этап 1
class Message {
  constructor(id, createdAt, payload, type) {
    this.id = id;
    this.createdAt = createdAt;
    this.payload = payload;
    this.type = type;
  }

  toString() {
    return `Message Id: ${this.id}, Date: ${this.createdAt}, DB: status: ${this.payload.status}, data: ${this.payload.data}, Type: ${this.type}`;
  }
  
  clone() {}
}

class TextMessage extends Message {
  constructor(id, createdAt, payload, type, text) {
    super(id, createdAt, payload, type);
    this.text = text;
  }

  toString() {
    return super.toString() + `, Text: ${this.text}`
  }
}

class ImageMessage extends Message {
  constructor(id, createdAt, payload, type, url, width, height) {
    super(id, createdAt, payload, type);
    this.url = url;
    this.width = width;
    this.height = height;
  }

  toString() {
    return super.toString() + `URL: ${this.url}, W: ${this.width}, H: ${this.height}`;
  }
}

class SystemMessage extends Message {
  constructor(id, createdAt, payload, type, severity) {
    super(id, createdAt, payload, type);
    this.severity = severity;
  }

  toString() {
    return super.toString() + `SEV: ${this.severity}`;
  }
}

function processMessage(msg) {
  if (msg instanceof TextMessage || ImageMessage || SystemMessage) {
    return msg.toString();
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

//Этап 2
const msg = {
  title: "Стратегия",
  content: "Пример паттерна",
};

const iformat = new IFormatStrategy();
const plainText = new PlainTextStrategy();
const markDown = new MarkdownStrategy();
const json = new JsonStrategy();

//console.log(iformat.format());

const formater = new MessageFormatter(plainText);
console.log(formater.generate(msg));

formater.setStrategy(markDown);
console.log(formater.generate(msg));
console.log(formater.generate(systemMessage));

formater.setStrategy(json);
console.log(formater.generate(msg));

//Этап 3
const bus = new MessageBus();
const logger = new LoggingObserver();
const metrics = new MetricsObserver();
const alert = new AlertObserver();

bus.attach(logger);
bus.attach(metrics);
bus.attach(alert);

bus.receiveMessage(textMessage);
bus.receiveMessage(imageMessage);
bus.receiveMessage("Проверка Alert");
bus.receiveMessage(systemMessage);

//Этап 4
