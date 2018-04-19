# Minimal Dependency Angular Setup
Read Blog Post: https://blog.angularindepth.com/setting-up-angular-from-scratch-1f518c65d8ab by Uri Shaked and Maxim Koretskyi

## Setup Dependencies

    npm i --save core-js zone.js rxjs

### core-js
Patches the global object (window) with essential features of ES2015 (ES6). You may substitute it with an alternative polyfill that provides the same core APIs. When these APIs are implemented by the major browsers, this dependency will become unnecessary. Essentially, only Reflect polyfill is required in all major browsers (actually, if you use AoT compilation, which is the recommended way for production, you can even skip the Reflect polyfill).

### rxjs
Reactive Extensions Library for JavaScript, which includes methods for transforming, composing, and querying streams of data. It is utilized by several parts of the Angular framework, such as the HTTP and Forms modules. The library provides an Observable implementation, which is currently a proposed feature to be included in future versions of the JavaScript language.

### zone.js
A polyfill for the Zone specification, which has also been proposed for inclusion in the JavaScript language. Zone.js provides the mechanism to hook into asynchronous operations and track outstanding async tasks. Angular does that by creating its own NgZone which waits until all asynchronous operations like timers and XHR requests are completed and triggers change detection.


    npm i --save systemjs

### systemjs (Module loader)
Until recently JavaScript didn’t have built-in module mechanism so the community came up with a few unfortunately incompatible standards — CommonJS Modules and Asynchronous Module Definition (AMD). The major update to ECMAScript specification commonly referred to as ES6 or ES2015 introduced native modules support into JavaScript language. However, the browser support at the time of writing is still very limited. Hence, we need a tool to enable loading ESM modules into a browser.

**systemjs.config.js**
```javascript

    System.config({
    paths: {
        'npm:': '/node_modules/'
    },
    map: {
        app: 'dist/app',
        '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
        '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
        '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
        '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
        '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
        'core-js': 'npm:core-js',
        'zone.js': 'npm:zone.js',
        'rxjs': 'npm:rxjs',
        'tslib': 'npm:tslib/tslib.js'
    },
    packages: {
        'dist/app': {},
        'rxjs': {},
        'core-js': {},
        'zone.js': {}
    }
    });
```

## @Angular Dependencies

    npm i --save @angular/core @angular/compiler @angular/common @angular/platform-browser @angular/platform-browser-dynamic

### @angular/core
Critical run-time parts of the framework needed by every application. Includes all metadata decorators, Component, Directive, dependency injection, and the component life-cycle hooks. Contains core functionality component views, DI and change detection.

### @angular/compiler
Angular’s Template Compiler. It reads your templates and can convert them to code that makes the application run and render. Typically you don’t interact with the compiler directly; rather, you use it indirectly via platform-browser-dynamic or the offline template compiler.

### @angular/common
Provides the commonly needed services, pipes, and directives such as ngIf and ngFor.

### @angular/platform-browser
Contains the functionality to bootstrap the application in a browser. Basically it includes everything DOM and browser related, especially the pieces that help render into the DOM. May not be required if you use Angular on the platform other than browser (e.g. angular-iot).

This package also includes the bootstrapStatic() method for bootstrapping applications for production builds that pre-compile templates offline.

### @angular/platform-browser-dynamic
Contains implementations for the dynamic bootstrap of the application. Includes providers and a bootstrap method for applications that compile templates on the client (thus, you can skip this module if you use ahead-of-time compilation). Use this package for bootstrapping your application during development (as we do here).


## TypeScript

    npm i --save-dev typescript

**tsconfig.json**
```json

    {
    "compilerOptions": {
        "outDir": "dist",
        "module": "commonjs",
        "moduleResolution": "node",
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true,
        "lib": [
        "dom",
        "es2015"
        ]
    }
    }
```

This is a very basic configuration file, which basically tells the compiler to write the compiled JavaScript files into the `dist` directory, to convert ESM modules we use in TypeScript into the CommonJS module format (one of the formats natively supported by System.js), and to add decorator support (so we can use `@Component`, `@NgModule`, etc). The `emitDecoratorMetadata` option is required if you want to specify dependencies using class type instead of `@Inject()` decorator.

**package.json** - add script section
```json

    "scripts": {
        "build": "tsc"
    },
```

Now compile typescript using: `npm run build`


## App Skeleton

Create an entry point for the application.

**index.html**
```html

    <html>
    <head>
        <title>Minimal Angular App</title>
    </head>
    <body>
        <app-main>Loading...</app-main>
        <script src="node_modules/systemjs/dist/system.src.js"></script>
        <script src="systemjs.config.js"></script>
        <script>
        System.import('dist/main.js').catch(function (err) {
            console.error(err);
        });
        </script>
    </body>
    </html>
```
The `<app-main>` element is a placeholder where the app will be rendered.

Create Root Component:

**src/app/app.component.ts**
```typescript

    import { Component } from '@angular/core';
    
    @Component({
        selector: 'app-main',
        template: '<h1>{{name}}</h1>'
    })

    export class AppComponent {
        name = 'Minimal Angular App';
    }
```

Create Main Root Module

**src/app/app.module.ts**
```typescript

    import { AppComponent } from './app.component';
    import { NgModule } from '@angular/core';
    import { BrowserModule } from '@angular/platform-browser';

    @NgModule({
        imports: [BrowserModule],
        declarations: [AppComponent],
        bootstrap: [AppComponent]
    })

    export class AppModule {
    }
```

Bootstrap

**src/main.ts**
```typescript

    import 'core-js/es7/reflect';
    import 'zone.js/dist/zone';
    import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
    import { AppModule } from './app/app.module';

    platformBrowserDynamic().bootstrapModule(AppModule);
```


## Compile and Load in Browser

Compile with:

    npm run build

For serving the app we use `live-server`.

    npm i --save-dev live-server

Update `scripts` in **package.json**.

```json

    "scripts": {
        "build": "tsc",
        "start": "live-server"
    },
```

RUN IT!

    npm start