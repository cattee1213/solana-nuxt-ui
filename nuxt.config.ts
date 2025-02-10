// https://nuxt.com/docs/api/configuration/nuxt-config
import AutoImport from 'unplugin-auto-import/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';

export default defineNuxtConfig({
  ssr: false,
  pages: true,
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@vueuse/nuxt', '@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt', 'nuxtjs-naive-ui'],
  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],
  pinia: {
    storesDirs: ['./stores/**']
  },
  piniaPluginPersistedstate: {
    debug: true,
    cookieOptions: {
      sameSite: 'strict',
      httpOnly: false,
      secure: false, // enable when the server have ssl cert
      maxAge: 60 * 60 * 24 * 7 // 7 days
    },
    storage: 'cookies'
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/style/global.scss" as *;'
        }
      }
    },
    plugins: [
      AutoImport({
        dts: true,
        imports: [
          {
            'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'],
            'solana-wallets-vue': ['useWallet']
          }
        ],
        // Generate corresponding .eslintrc-auto-import.json file.
        // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
        eslintrc: {
          enabled: true, // Default `false`
          // provide path ending with `.mjs` or `.cjs` to generate the file with the respective format
          filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        }
      }),
      Components({
        resolvers: [NaiveUiResolver()]
      })
    ]
  }
});
