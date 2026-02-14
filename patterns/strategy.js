//Интерфейс
export class IFormatStrategy {
    format(msg) {}
}
//Реализация
export class PlainTextStrategy extends IFormatStrategy{
    format(msg) {
        return `${msg.title} - ${msg.content}`
    }
}

export class MarkdownStrategy extends IFormatStrategy {
    format(msg) {
        return `${msg.title}\n${msg.content}`
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