const path = require('path');

module.exports = {
    entry: './src/pin.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'pin.bundle.js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        compress: true,
        port: 4200,
    }
}
