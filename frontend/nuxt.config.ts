<<<<<<< HEAD
import vuetify,{transformAssetUrls} from "vite-plugin-vuetify";
=======
import vuetify from "vite-plugin-vuetify";
>>>>>>> 39dee47b680b01940e2db6927237b3812943fae3

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  build: {
    transpile: ['vuetify']
  },
  vite: {
    plugins: [
      vuetify({autoImport: true})
    ],
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }
})
