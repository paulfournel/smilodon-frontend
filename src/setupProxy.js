const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:8080',
            changeOrigin: true,
        })
    );
    app.use(
        '/.well-known',
        createProxyMiddleware({
            target: 'http://localhost:8080',
            changeOrigin: true,
        })
    );
    app.use(
        '/open-api',
        createProxyMiddleware({
            target: 'http://localhost:8080',
            changeOrigin: true,
        })
    );
    app.use(
        '/process_login',
        createProxyMiddleware({
            target: 'http://localhost:8080',
            changeOrigin: true,
        })
    );
    app.use(
        '/home',
        createProxyMiddleware({
            target: 'http://localhost:8080',
            changeOrigin: true,
        })
    );
    app.use(
        '/hello',
        createProxyMiddleware({
            target: 'http://localhost:8080',
            changeOrigin: true,
        })
    );
    app.use(
        '/logout',
        createProxyMiddleware({
            target: 'http://localhost:8080',
            changeOrigin: true,
        })
    );
    app.use(
        '/oauth2/authorization/strava',
        createProxyMiddleware({
            target: 'http://localhost:8080',
            changeOrigin: true,
        })
    );
};
