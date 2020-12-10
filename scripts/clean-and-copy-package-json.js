const fs = require('fs-extra');
const path = require('path');
const srcPath = path.resolve(__dirname, '..', 'package.json');
const targetPath = path.resolve(
  __dirname,
  '..',
  'dist',
  'nestjs-relay',
  'src',
  'package.json',
);

const packageJson = fs.readJsonSync(srcPath);
packageJson.peerDependencies = packageJson.peerDependencies || {};
Object.keys(packageJson.dependencies).forEach((key) => {
  packageJson.peerDependencies[key] = '*';
});
['scripts', 'devDependencies', 'dependencies', 'jest', 'license'].forEach(
  (key) => delete packageJson[key],
);
fs.outputJsonSync(targetPath, packageJson, { spaces: 2 });
