module.exports = {
    moduleNameMapper: {
        '\\.(css|jpg|png|svg|less)$': '<rootDir>/node_modules/jest-css-modules',
        'nav-(.*)-style': '<rootDir>/node_modules/jest-css-modules',
        '@navikt/ds-css': '<rootDir>/node_modules/jest-css-modules',
        '\\.\\/userContent': '<rootDir>/node_modules/jest-css-modules',
        '\\.\\/systemsStyles': '<rootDir>/node_modules/jest-css-modules',
        '\\.\\/header': '<rootDir>/node_modules/jest-css-modules',
    },
    transformIgnorePatterns: [
        '<rootDir>.*(node_modules)(?!.*nav.*).*$',
        '<rootDir>/node_modules/(?!@navikt/k9-react-components|@navikt/k9-period-utils/|@navikt/k9-date-utils|@navikt/k9-array-utils|@navikt/k9-bem-utils|@navikt/k9-form-utils)',
    ],
    transform: {
        '^.+\\.(ts|tsx|js|jsx)?$': 'babel-jest',
    },
    testEnvironment: 'jsdom',
};
