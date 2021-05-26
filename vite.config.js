import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import vitePluginImp from 'vite-plugin-imp'
import vitePluginTransformCssModules from './plugin';
import vitePluginTransformCssModules2 from './plugin2';
import fs from 'fs/promises';
import path from 'path';


const config  = {
  development: {
    cdn: './',
    apiBaseUrl: '/api' // 开发环境接口请求，后用于 proxy 代理配置
  },
  beta: {
    cdn: '//s.xxx.com/vite-react-app/beta', // 测试环境 cdn 路径
    apiBaseUrl: '//www.beta.xxx.com/v1' // 测试环境接口地址
  },
  release: {
    cdn: '//s.xxx.com/vite-react-app/release', // 正式环境 cdn 路径
    apiBaseUrl: '//www.xxx.com/v1' // 正式环境接口地址
  }
}

const env = process.argv[process.argv.length - 1];
const base = config[env];
// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.jsx?$/,
    exclude: []
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        {
          name: "load-js-files-as-jsx",
          setup(build) {
            build.onLoad({ filter: /src\/.*\.js$/ }, async (args) => {
              return ({
                loader: "jsx",
                contents: await fs.readFile(args.path, "utf8"),
              })
            });
          },
        },
      ],
    },
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'), // 根路径
      '@': path.resolve(__dirname, 'src') // src 路径
    }
  },
  css: {
    modules: {
      scopeBehaviour: 'local',
      localsConvention: 'camelCaseOnly'
    }
  },
  // base: base.cdn,
  plugins: [
    vitePluginTransformCssModules(),
    vitePluginTransformCssModules2(),
    reactRefresh(),
    vitePluginImp({
      libList: [
        {
          libName: "antd",
          style: (name) => `antd/lib/${name}/style/index.css`,
        },
      ],
    })]
})
