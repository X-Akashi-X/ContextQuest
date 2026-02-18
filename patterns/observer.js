class IObserver {
  update(eventName) {
    console.log('Ошибка update');
  }
}

class IObserverable {
  attach(obs) {console.log('Ошибка attach')}
  detach(obs) {console.log('Ошибка detach')}
  notify(eventName, msg) {console.log('Ошибка update уведомления')}
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

  update(eventName, msg) {
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
  update(eventName, msg) {
    if (!msg.severity) {
      console.log(`Все работает!`);
    } else {
      console.log(`Severity: ${msg.severity[2]}`);
    }
  }
}