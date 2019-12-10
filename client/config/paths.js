const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath);
}

module.exports = {
  build: resolveApp('build'),
  static: resolveApp('public'),
  src: resolveApp('src'),
  config: resolveApp('config'),
  houseRental: resolveApp('src/houseRental'),
};
