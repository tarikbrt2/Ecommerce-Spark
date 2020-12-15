module.exports = {
    devServer: {
        proxy: {
            '/api/products': {
                target: 'http://localhost:3000'
            }
        }
    }
}