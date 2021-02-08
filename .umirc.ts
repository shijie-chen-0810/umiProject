import { defineConfig } from 'umi';
import routes from './src/router';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  dva: {},
  antd: {},
  fastRefresh: {},
  routes,
  proxy: {
    '/api': {
      target: 'https://pvp.qq.com',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
    '/apq/lm': {
      target: 'https://game.gtimg.cn',
      changeOrigin: true,
      pathRewrite: { '^/apq/lm': '' },
    },
  },
});
