//Интерфейс
export class IFormatStrategy {
    format(msg) {
        throw new Error("Метод format должен быть определен в дочернем классе");
    }
}
//Реализация
export class PlainTextStrategy extends IFormatStrategy{
    format(msg) {
        return `${msg.title} - ${msg.content}`
    }
}

export class MarkdownStrategy extends IFormatStrategy {
    format(msg) {
        if (!msg.severity) {
            return `${msg.title}\n${msg.content}`;
        }

        return `Severity: ${msg.severity[0]};`
    }
}


export class JsonStrategy extends IFormatStrategy {
    format(msg) {
        return JSON.stringify(msg)
    }
}
//Контекст

export class MessageFormatter {
    constructor(strategy) {
        this.strategy = strategy
    }

    setStrategy(strategy) {
        this.strategy = strategy
    }

    generate(msg) {
        return this.strategy.format(msg)
    }
}