module.exports = {
    plugins: ['react'],
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    parser: 'babel-eslint',
    env: {
        node: true,
        browser: true,
        es6: true,
    },
    rules: {
        quotes: ['error', 'single', { avoidEscape: true }],
        'comma-dangle': ['error', 'always-multiline'],
    },
    settings: {
        react: {
            version: '16.4.2',
        },
    },
};
