import { defineConfig } from '@rsbuild/core';
import { pluginVue } from '@rsbuild/plugin-vue';
import { pluginRemoveConsole } from './plugins/rsbuild-remove-console';
export default defineConfig({
  plugins: [pluginVue(), pluginRemoveConsole()],
  html: {
    template: './public/index.html',
    tags: [
      { tag: 'script', attrs: { src: 'https://unpkg.com/axios/dist/axios.min.js' } },
      // 注册全局变量
      {
        tag: 'script',
        children: `window.$env = {
        VUE_APP_ENV: '${process.env.VUE_APP_ENV}'}`,
      },
      // 注册全局变量
      {
        tag: 'script',
        children: `if ('serviceWorker' in navigator) {
          window.addEventListener('load', function() {
            navigator.serviceWorker.register('sw.js');
          });
        }`,
      },
    ],
  },
  tools: {
    htmlPlugin(config: any, { entryName }: any) {
      if (process.env.NODE_ENV === 'production') {
        config.filename = `${entryName}.[contenthash:8].html`;
      }
    },
  },
  output: {
    sourceMap: {
      js: process.env.NODE_ENV === 'development' ? 'cheap-module-source-map' : 'source-map',
      css: true,
    },
  },
});
