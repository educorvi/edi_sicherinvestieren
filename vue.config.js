const webpack = require('webpack');
const fs = require('fs');
const packageJson = fs.readFileSync('./package.json');
const version = JSON.parse(packageJson).version || 0;
module.exports = {
    configureWebpack: {
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    PACKAGE_VERSION: '"' + version + '"'
                }
            })
        ]
    },
    pwa: {
        name: 'Sicher Investieren',
        themeColor: '#014B94',
        msTileColor: '#014B94',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',

        // configure the workbox plugin
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            // swSrc is required in InjectManifest mode.
            swSrc: 'sw.js',
            // ...other Workbox options...
        },
        manifestOptions: {
            background_color: "#fff"
        }
    },
    devServer: {
        disableHostCheck: true
    },
    publicPath: ''
}
