import {ExceptionHandler} from "./handlers/abstract/exception.handler";

const createExceptionHandlersChain = (handlers:  ExceptionHandler[]): ExceptionHandler => {
    if (!handlers)
        return null;

    for (let i = 0; i < handlers.length; i++) {
        const current = handlers[i];
        const next = handlers[i + 1];
        const hasNext = i + 1 !== handlers.length;

        if (hasNext)
            current.setNext(next);
    }

    return handlers[0];
}

export {
    createExceptionHandlersChain
}