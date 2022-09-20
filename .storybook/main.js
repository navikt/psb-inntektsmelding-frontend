const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const nodeModules = path.resolve(__dirname, '../node_modules');
const STORYBOOK_DIR = path.resolve(__dirname);

module.exports = {
    stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],

    framework: '@storybook/react',
    core: {
        builder: '@storybook/builder-webpack5',
    },
    webpackFinal: async (config, { configType }) => {
        config.module.rules.push({
            test: /\.(ts|js)x?$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
            },
        });
        config.module.rules.push({
            test: /\.less$/,
            use: [
                { loader: MiniCssExtractPlugin.loader },
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                        modules: {
                            localIdentName: '[name]_[local]_[contenthash:base64:5]',
                        },
                    },
                },
                {
                    loader: 'less-loader',
                    options: {
                        lessOptions: {
                            modules: true,
                            localIdentName: '[name]_[local]_[contenthash:base64:5]',
                            modifyVars: {
                                nodeModulesPath: '~',
                                coreModulePath: '~',
                            },
                        },
                    },
                },
            ],
            exclude: [nodeModules],
        }),
            config.module.rules.push({
                test: /\.(less)?$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },

                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                modifyVars: {
                                    nodeModulesPath: '~',
                                    coreModulePath: '~',
                                },
                            },
                        },
                    },
                ],
                include: [nodeModules],
            });

        config.module.rules.push({
            test: /\.(jpg|png|svg)$/,
            loader: 'file-loader',
        });
        config.plugins.push(
            new MiniCssExtractPlugin({
                filename: 'styles[name].css',
            })
        );
        config.devtool = 'eval-source-map';
        config.resolve.extensions.push('.ts', '.tsx', '.less', '.js');

        return config;
    },
};
