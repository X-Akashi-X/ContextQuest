import { LoggerSingleton } from "../patterns/singletons/loger.js";

class IObserver {
  update() {
    console.log("Ошибка update");
  }
}

class IObserverable {
  attach() {
    console.log("Ошибка attach");
  }
  detach() {
    console.log("Ошибка detach");
  }
  notify() {
    console.log("Ошибка update уведомления");
  }
}

export class MessageBus extends IObserverable {
  constructor() {
    super();
    this.observers = [];
  }
  attach(obs) {
    this.observers.push(obs);
  }
  detach(obs) {
    this.observers = this.observers.filter((o) => o !== obs);
  }
  notify(eventName, msg) {
    this.observers.forEach((observer) => observer.update(eventName, msg));
  }

  receiveMessage(msg) {
    this.notify("message:received", msg);

    try {
      this.notify("message:processed", msg);
    } catch (error) {
      this.notify("error", error);
    }
  }
}

export class LoggingObserver extends IObserver {
  constructor() {
    super();
    this.logger = LoggerSingleton.getInstance();
  }
  update(eventName, msg) {
    console.log(`Log: ${eventName}, Message: ${msg}`);
  }
}

export class MetricsObserver extends IObserver {
  constructor() {
    super();
    this.counters = {
      received: 0,
      processed: 0,
      error: 0,
    };
  }

  update(eventName) {
    switch (eventName) {
      case "message:received":
        this.counters.received++;
        break;
      case "message:processed":
        this.counters.processed++;
        break;
      default:
        this.counters.error++;
        break;
    }
    console.log(`Metric: `, this.counters);
  }
}

export class AlertObserver extends IObserver {
  update(msg) {
    if (!msg.severity) {
      console.log(`Все работает!`);
    } else {
      console.log(`Severity: ${msg.severity[2]}`);
    }
  }
}
