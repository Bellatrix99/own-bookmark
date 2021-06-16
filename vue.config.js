module.exports = {
    transpileDependencies: [
        'vuetify'
    ],

    configureWebpack: {
        devtool: 'source-map',
    },
    // Disable sourcemap in production mode
    productionSourceMap: false,
    devServer: {
        writeToDisk: true
    }
}
