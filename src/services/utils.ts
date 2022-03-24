import {ExceptionHandler} from "../handlers/abstract/exception.handler";

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

const getArguments = (func) => {
    const ARROW = true;
    const FUNC_ARGS = ARROW ? /^(function)?\s*[^(]*\(\s*([^)]*)\)/m : /^(function)\s*[^(]*\(\s*([^)]*)\)/m;
    const FUNC_ARG_SPLIT = /,/;
    const FUNC_ARG = /^\s*(_?)(.+?)\1\s*$/;
    const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

    return ((func || '').toString()
        .replace(STRIP_COMMENTS, '')
        .match(FUNC_ARGS) || ['', '', ''])[2]
        .split(FUNC_ARG_SPLIT)
        .map(function (arg) {
            return arg.replace(FUNC_ARG, function (all, underscore, name) {
                return name.split('=')[0].trim();
            });
        })
        .filter(String);
}

const zip = (keys, values) => keys.map((x, i) => [x, values[i]]);

const isArrayHasEmpty = (...values) => values.some(value => !value);

const isHasEmptyParams = (f) => isArrayHasEmpty(f.arguments);

export {
    createExceptionHandlersChain,
    getArguments,
    zip,
    isArrayHasEmpty,
    isHasEmptyParams
}