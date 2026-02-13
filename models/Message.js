class Message {
  constructor(id, createdAt, {...payload}, type) {
    this.id = id;
    this.createdAt = createdAt;
    this.payload = payload;
    this.type = type;
    
  }

  toString() {
    return `Message Id: ${this.id}, Date: ${this.createdAt}, DB: ${this.payload}, Type: ${this.type}`;
  }

  clone() {}
}

class TextMessage extends Message {
  constructor(id, createdAt, payload, type, text) {
    super(id, createdAt, payload, type);
    this.text = text;
  }

  toString() {
    return `Message Id: ${this.id}, Date: ${this.createdAt}, DB: ${this.payload}, Type: ${this.type}, Text: ${this.text}`;
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
    return `Message Id: ${this.id}, Date: ${this.createdAt}, DB: ${this.payload}, Type: ${this.type}, URL: ${this.url}, W: ${this.width}, H: ${this.height}`;
  }
}

class SystemMessage extends Message {
  constructor(id, createdAt, payload, type, severity) {
    super(id, createdAt, payload, type);
    this.severity = severity;
  }

  toString() {
    return `Message Id: ${this.id}, Date: ${this.createdAt}, DB: ${this.payload}, Type: ${this.type}, SEV: ${this.severity}`;
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
  "https://learn.javascript.ru/class-inheritance",
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