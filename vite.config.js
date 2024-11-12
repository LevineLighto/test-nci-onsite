import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import viteReact from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            refresh: true,
        }),
        viteReact(),
    ],
    resolve: {
        alias: {
            "@" : path.resolve(__dirname, './resources/js/'),
        }
    }
});
