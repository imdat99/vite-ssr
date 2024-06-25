import path from "path"
import { UserConfig, defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
    if (command === 'build') {
        return {
            ...devConfig,
            ssr: {
                optimizeDeps: {
                    include: ["lodash"]
                  },
                noExternal: ['react-helmet-async', 'lodash', 'devtools-detector'],
                // Add your external dependencies here for the SSR build, otherwise,
                // the bundled won't have enough libraries to render noExternal:
                // [/@\w+\/*/],
            },
        }
    }

    return devConfig
})

const devConfig: UserConfig = {
    plugins: [
        react(),
        // cssInjectedByJsPlugin()
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    build: {
        rollupOptions: {
            input: './src/main.tsx',
            output: {
                manualChunks: undefined,
                // entryFileNames: `assets/[hash].js`,
                chunkFileNames: `assets/[hash].js`,
                // assetFileNames: `assets/[name].[ext]`
                // assetFileNames: `assets/[hash].[ext]`
            },

        },
        chunkSizeWarningLimit: 512,
        target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
    },
}
