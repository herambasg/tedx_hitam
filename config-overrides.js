const webpack = require('webpack');

module.exports = function override(config) {
    const fallback = config.resolve.fallback || {};
    Object.assign(fallback, {
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "zlib": require.resolve("browserify-zlib"),
        "stream": require.resolve("stream-browserify"),
        "crypto": require.resolve("crypto-browserify"),
        "os": require.resolve("os-browserify/browser"),
        "url": require.resolve("url/"),
        "util": require.resolve("util/"),
        "assert": require.resolve("assert/")
    });
    config.resolve.fallback = fallback;

    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
            // The change is on the next line
            process: ['process/browser'],
            Buffer: ['buffer', 'Buffer']
        })
    ]);

    // This helps prevent some of the ".mjs" resolution issues
    config.module.rules.push({
        test: /\.m?js$/,
        resolve: {
            fullySpecified: false
        }
    });

    return config;
}