import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

const path = require('path');

export default defineConfig({
    server: {
        port: 8383,
    },

    preview: {
        port: 8383,
    },
    build: {
        sourcemap: true,
        outDir: './build',
        rollupOptions: {
            dir: path.resolve(__dirname, `../build/1`),
            entryFileNames: 'app.js',
            assetFileNames: 'style.css',
        },
    },
    plugins: [react(), tsconfigPaths()],
});
