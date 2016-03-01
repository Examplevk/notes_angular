var path = require('path');


module.exports = {
    devtool: 'eval',
    watch: true,
    entry: [
        './shared/core.js'
    ],
    resolve: {
        modulesDirectories: ['node_modules', 'shared'],
        extensions:         ['', '.js']
    },
    output: {
        path:       path.join(__dirname, 'static/js'),
        filename:   'bundle.js'
    },

    module: {
        loaders: [
            {
                test:    /\.js$/,
                exclude: /node_modules/,
                loaders: ['babel']
            }

        ]
    },
};