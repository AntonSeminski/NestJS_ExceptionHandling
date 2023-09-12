<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Nestjs Exception handling implementation.
Includes: 
    * Handler's chain mechanism
    * Custom exception to inherit from
    * Implemented Nest JS Validation Exception handler

Exception structure: 
```
    {
        code: "ERROR:<ENTITY>-<CODE_MESSAGE>"
        status: 500,
        title: "Error!",
        message: 'This was screwed',
        body: { any info you like }
    }
```

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Use

# installation
```bash
$ npm install @asemin/nestjs-utils
```

# Handler creation example
Class must extend ExceptionHandler and implement `handle` method. Method must return HandlerExceptionDto filled.
```
export class MongoExceptionHandler extends ExceptionHandler{
    handle(exception: any): HandledExceptionDto {
        if ( !(exception instanceof MongoError) )
            return this.next?.handle(exception);

        switch (exception.code) {
            case 11000:
                return new HandledExceptionDto(getException(CODES.DATABASE.DUPLICATE));
        }

        return null;
    }
}
```

# handlers chain creation
Each member must extend ExceptionHandler
```
export const handlersChain = [
    new MongoExceptionHandler(),
    new ValidationExceptionHandler(),
    new CustomExceptionHandler(),
    new HttpExceptionHandler()
];
```

# Nestjs exception filter configuration. main.ts:
```bash
    const exceptionFilter = new ExceptionFilter(
        <ExceptionHandler>createExceptionHandlersChain(handlersChain)
    );

    app.useGlobalFilters(exceptionFilter);
```

## Custom exception use

# throwException
Use one of the codes. Fill free to put any information to body (second param)
If there are no code suitable - throw any exception type manually.
```
throwException(CODES.COMMON.EMPTY_PARAM, {method: 'getByPermissionAndPermissionSets', fields: {permissionId, permissionSetIds}})
```

# getException info
```
const {code, status, message} = getException(CODES.COMMON.UNKNOWN);
```