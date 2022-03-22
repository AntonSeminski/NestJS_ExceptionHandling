export const CODES = {
    USER: {
        DUPLICATE: 'ERROR:USER-DUPLICATE',
        NOT_FOUND: 'ERROR:USER-NOT_FOUND',
        INACTIVE: 'ERROR:USER-INACTIVE',
        EDIT_ONLY_YOURSELF: 'ERROR:USER-EDIT_ONLY_YOURSELF',
        WRONG_PASSWORD: 'ERROR:USER-WRONG_PASSWORD',
        NOT_LOGGED_IN: 'ERROR:USER-NOT_LOGGED_IN!'
    },
    SESSION: {
        EMPTY: 'ERROR:TOKEN-EMPTY',
        WRONG_DEVICE: 'ERROR:TOKEN-WRONG_DEVICE',
        EXPIRED: 'ERROR:TOKEN-EXPIRED',
    },
    COMMON: {
        UNKNOWN: 'ERROR:SYSTEM-UNKNOWN!',
        HTTP: 'ERROR:SYSTEM-HTTP_EXCEPTION',
        EMPTY_EMAIL: 'ERROR:SYSTEM-EMAIL_REQUIRED',
        EMPTY_PARAM: 'ERROR:SYSTEM-EMPTY_PARAM'
    },
    CODE: {
        INVALID: 'ERROR:CODE-INVALID',
        UNKNOWN: 'ERROR:CODE-UNKNOWN',
        EXPIRED: 'ERROR:CODE-EXPIRED',
        WRONG_RELATED_TO: 'ERROR:CODE-NOT_YOURS_BITCH'
    },
    DATABASE: {
        DUPLICATE: 'ERROR:DATABASE-DUPLICATE'
    },
    VALIDATION: 'ERROR:VALIDATION',
    HTTP: {
        '400': 'Bad request!',
        '401': 'Unauthorized!',
        '403': 'Forbidden resource!',
        '404': 'Not found!',
    },
    LICENSE: {
        NOT_FOUND: 'ERROR:LICENSE-NOT_FOUND'
    },
    WORKSPACE: {
        NOT_FOUND: 'ERROR:WORKSPACE-NOT_FOUND',
        NO_ACCESS: 'ERROR:WORKSPACE-NO_ACCESS'
    }
}