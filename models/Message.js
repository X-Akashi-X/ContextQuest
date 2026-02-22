//Этап 1
class Message {
  constructor(id, createdAt, payload, type) {
    this.id = id;
    this.createdAt = createdAt;
    this.payload = payload;
    this.type = type;
  }

  toString() {
    return `Message Id: ${this.id}, Date: ${this.createdAt}, DB: ${this.payload.status}, data: ${this.payload.data}, Type: ${this.type}`;
  }

  clone() {}
}

export class TextMessage extends Message {
  constructor(id, createdAt, payload, type, text) {
    super(id, createdAt, payload, type);
    this.text = text;
  }

  toString() {
    return super.toString() + `, Text: ${this.text}`;
  }
}

export class ImageMessage extends Message {
  constructor(id, createdAt, payload, type, url, width, height) {
    super(id, createdAt, payload, type);
    this.url = url;
    this.width = width;
    this.height = height;
  }

  toString() {
    return (
      super.toString() + `URL: ${this.url}, W: ${this.width}, H: ${this.height}`
    );
  }
}

export class SystemMessage extends Message {
  constructor(id, createdAt, payload, type, severity) {
    super(id, createdAt, payload, type);
    this.severity = severity;
  }

  toString() {
    return super.toString() + `SEV: ${this.severity}`;
  }
}