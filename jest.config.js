module.exports = {
    moduleNameMapper: {
        '\\.(css|jpg|png|svg|less)$': '<rootDir>/node_modules/jest-css-modules',
        'nav-(.*)-style': '<rootDir>/node_modules/jest-css-modules',
        '@navikt/ds-css': '<rootDir>/node_modules/jest-css-modules',
        '\\.\\/userContent': '<rootDir>/node_modules/jest-css-modules',
        '\\.\\/systemsStyles': '<rootDir>/node_modules/jest-css-modules',
        '\\.\\/header': '<rootDir>/node_modules/jest-css-modules',
        uuid: require.resolve('uuid'),
    },
    transformIgnorePatterns: ['<rootDir>.*(node_modules)(?!.*nav.*).*$'],
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest',
        '^.+\\.(js|jsx)?$': 'babel-jest',
    },
    testEnvironment: 'jsdom',
};
