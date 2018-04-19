// The paths and map sections of the config basically define the full path to the source code files for each of the ESM modules
//  in our app. As you can see, everything resides inside node_modules, expect for the app code itself, which will live inside
//   dist/app.

// The packages section lists the meta data for your packages. In this case, we don’t define any metadata, but adding packages
//  configuration allows us to import files residing in these packages without having to specify the file extension, e.g.:

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