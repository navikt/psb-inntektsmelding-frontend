import { defineConfig } from 'vite';
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
        outDir: './build'
    },
    plugins: [react(), tsconfigPaths()],
});
