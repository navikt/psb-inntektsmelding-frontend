module.exports = {
    presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        '@babel/preset-react',
        '@babel/preset-typescript',
    ],
    plugins: ['@babel/plugin-proposal-optional-chaining'],
    env: {
        test: {
            plugins: ['@babel/plugin-proposal-optional-chaining'],
        },
    },
};
