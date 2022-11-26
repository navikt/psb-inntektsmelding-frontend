import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    server: {
        port: 8383,
    },

    preview: {
        port: 8383,
    },
    build: {
        sourcemap: true,
        rollupOptions: {
            output: {
                dir: './build/1/',
                entryFileNames: 'app.js',
                assetFileNames: 'styles.css',
            },
            input: './src/app.ts',
        },
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './setupTests.js',
    },
    plugins: [react(), tsconfigPaths()],
});
