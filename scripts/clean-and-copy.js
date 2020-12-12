const fs = require('fs-extra');
const path = require('path');
const rimraf = require('rimraf');

const packageJson = fs.readJsonSync(
  path.resolve(__dirname, '..', 'package.json'),
);
packageJson.peerDependencies = packageJson.peerDependencies || {};
Object.keys(packageJson.dependencies).forEach((key) => {
  packageJson.peerDependencies[key] = '*';
});
['scripts', 'devDependencies', 'dependencies', 'jest', 'license'].forEach(
  (key) => delete packageJson[key],
);

fs.readdirSync(path.resolve(__dirname, '..', 'dist')).forEach((name) => {
  const targetPath = path.resolve(__dirname, '..', 'dist', name);
  fs.move(path.resolve(targetPath, 'src'), targetPath, console.error);
  rimraf(path.resolve(targetPath, 'src'));
  const targetPackageJsonPath = path.resolve(targetPath, 'package.json');
  packageJson.name = `@harryy/${name}`;
  fs.outputJsonSync(targetPackageJsonPath, packageJson, { spaces: 2 });
});
