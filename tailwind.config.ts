import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#e0f7fa',
                    100: '#b2ebf2',
                    200: '#80deea',
                    300: '#4dd0e1',
                    400: '#26c6da',
                    500: '#00bcd4',
                    600: '#00acc1',
                    700: '#0097a7',
                    800: '#00838f',
                    900: '#006064',
                },
                warm: {
                    50: '#fdfcfb',
                    100: '#faf8f5',
                    200: '#f5f0e8',
                    300: '#ebe3d5',
                    400: '#dfd4c0',
                    500: '#d4c5ab',
                    600: '#c8b596',
                    700: '#b39a77',
                    800: '#9e7f58',
                    900: '#7d654b',
                },
                accent: {
                    teal: '#00bcd4',
                    green: '#00a896',
                    blue: '#0097a7',
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
                serif: ['var(--font-crimson)', 'Georgia', 'serif'],
            },
        },
    },
    plugins: [],
};

export default config;
