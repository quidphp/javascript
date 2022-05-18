const mix = require('laravel-mix');
mix.js('index.js', 'dist/javascript-es.js');
mix.js('test/javascript.js', 'dist/javascript-test-es.js');
mix.babel('dist/javascript-es.js', 'dist/javascript.js');
mix.babel('dist/javascript-test-es.js', 'dist/javascript-test.js');
mix.webpackConfig({
    output: {
        library: ["Quid"],
        libraryTarget: "window"
    }
});