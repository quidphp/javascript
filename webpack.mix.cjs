const mix = require('laravel-mix');
mix.js('index.js', 'dist/javascript.js');
mix.js('test/javascript.js', 'dist/javascript-test.js');
mix.babel('dist/javascript.js', 'dist/javascript-es5.js');
mix.babel('dist/javascript-test.js', 'dist/javascript-test-es5.js');
mix.webpackConfig({
    output: {
        library: ["Quid"],
        libraryTarget: "window"
    }
});