const mix = require('laravel-mix');
require('laravel-mix-polyfill');

mix.js('index.js', 'dist/javascript.js');
mix.js('test/javascript.js', 'dist/javascript-test.js');
mix.polyfill({ enabled: true, useBuiltIns: false });

mix.webpackConfig({
    output: {
        library: ["Quid"],
        libraryTarget: "window"
    }
});