const mix = require('laravel-mix');
require('laravel-mix-polyfill');

mix.js('index.js', 'dist/javascript.js');
mix.js('test/javascript.js', 'dist/javascript-test.js');
mix.alias({ '@': __dirname });

mix.webpackConfig({
    output: {
        library: ["Quid"],
        libraryTarget: "window"
    }
});

if(mix.inProduction())
mix.polyfill({ enabled: true, useBuiltIns: false });
else
mix.sourceMaps();