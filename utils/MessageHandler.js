import {TextMessage, ImageMessage, SystemMessage} from '../models/message.js'
import {UnsupportedMessageError} from '../ContextQuest/utils/errors.js'

export class MessageHandler {
  constructor(bus, formatter) {
    this.bus = bus;
    this.formatter = formatter;
  }

  handle(msg) {
    if (msg instanceof TextMessage) {
      return this.formatter.generate(msg);
    }

    if (msg instanceof ImageMessage) {
      return {
        url: msg.url,
        width: msg.width,
        height: msg.height,
        type: msg.type,
        createdAt: msg.createdAt,
      };
    }

    if (msg instanceof SystemMessage) {
        this.bus.receiveMessage(msg)
        return msg.payload.status
    }

    throw new UnsupportedMessageError("Unknown message type", {msg});
  }
}
