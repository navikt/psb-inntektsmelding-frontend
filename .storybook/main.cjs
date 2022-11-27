const { mergeConfig } = require('vite');

module.exports = {
    stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        {
            name: 'storybook-css-modules',
            cssModulesLoaderOptions: {
                importLoaders: 1,
                modules: {
                    localIdentName: '[name]_[contenthash:base64:5]',
                },
            },
        },
    ],

    framework: '@storybook/react',
    core: {
        builder: '@storybook/builder-vite',
    },
    async viteFinal(config) {
        // Merge custom configuration into the default config
        return mergeConfig(config, {
            // Use the same "resolve" configuration as your app
            resolve: (await import('../vite.config.mjs')).default.resolve,
        });
    },
};
