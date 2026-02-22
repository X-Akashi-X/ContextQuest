class BaseError {
    constructor(message, details = {}) {
        super(message)
        this.details = details
        this.name = this.constructor.name
    }
}

export class ValidationError extends BaseError {
    constructor(message = 'Validation failed', details = {}) {
        super(message, details)
    }
}

export class UnsupportedMessageError extends BaseError {
    constructor(message = 'Unsupported message type', details = {}) {
        super(message, details)
    }
}

export class UnsupportedMessageError extends BaseError {
    constructor(strategyName, details = {}) {
        super(`Strategy '${strategyName}' not found`, {strategyName, ...details})
    }
}