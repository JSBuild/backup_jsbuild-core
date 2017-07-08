import {merge} from './npm-modules';
import defaultConfig from './default-config';

export default config => {
  let mergedConfig = merge(defaultConfig, config || {});
  app.use(webpackMiddleware(webpack(mergedConfig.webpack), mergedConfig));
};
