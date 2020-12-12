const fs = require('fs-extra');
const path = require('path');

const moveFilesAll = (srcDir, destDir) => {
  fs.readdirSync(srcDir).forEach((file) => {
    const destFile = path.join(destDir, file);
    const srcFile = path.join(srcDir, file);
    fs.renameSync(srcFile, destFile);
  });
  fs.removeSync(srcDir);
};

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

fs.readdirSync(path.resolve(__dirname, '..', 'build')).forEach((name) => {
  const targetPath = path.resolve(__dirname, '..', 'build', name);
  moveFilesAll(path.resolve(targetPath, 'src'), path.resolve(targetPath));
  const targetPackageJsonPath = path.resolve(targetPath, 'package.json');
  packageJson.name = `@harryy/${name}`;
  fs.outputJsonSync(targetPackageJsonPath, packageJson, { spaces: 2 });
});
