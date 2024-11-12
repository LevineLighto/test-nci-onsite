import { IrimoldTailwindContent, IrimoldTailwindPreset } from '@irimold/react-component/tailwindcss-config';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./resources/js/**/*.ts",
        "./resources/js/**/*.tsx",
        "./resources/views/**/*.blade.php",
    ],
    presets: [
        IrimoldTailwindPreset,
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#1F9C48',
                    100: '#D4FAD1',
                    200: '#A6F5A9',
                    300: '#74E183',
                    400: '#4EC369',
                    500: '#1F9C48',
                    600: '#168646',
                    700: '#0F7042',
                    800: '#095A3C',
                    900: '#054A37',
                }
            }
        },
    },
    plugins: [],
};
