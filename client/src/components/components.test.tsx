import fs from 'fs';
import path from 'path';

const getDirectories = (srcPath: string) => {
  return fs
    .readdirSync(srcPath)
    .filter((file) => fs.statSync(path.join(srcPath, file)).isDirectory());
};

const getFiles = (srcPath: string) => {
  return fs
    .readdirSync(srcPath)
    .filter((file) => fs.statSync(path.join(srcPath, file)).isFile());
};

const fileExists = (_path: fs.PathLike) =>
  fs.promises.stat(_path).then(
    () => true,
    () => false
  );

const componentRegularExpression = /^[A-Z]((?!\.test)(?!\.stories)\w)*.tsx$/;
const directories = getDirectories(__dirname);
directories.forEach((directory) => {
  const files = getFiles(`${__dirname}/${directory}`);
  const components = files.filter(
    (file) => !!file.match(componentRegularExpression)
  );
  describe('all components have test', () => {
    it(`${directory} has only components`, async () => {
      const nonComponentFile = files.find(
        (file) =>
          file.charAt(0) === file.charAt(0).toLowerCase() &&
          file !== 'index.ts' &&
          file !== 'index.tsx'
      );

      expect(nonComponentFile).toBeFalsy();
    });
    components.forEach((component) => {
      it(`${component} component has test`, async () => {
        const testFileName = component.replace('.tsx', '.test.tsx');

        expect(files.find((file) => file === testFileName)).toBeTruthy();
      });

      it(`${component} component has story`, async () => {
        const storyFileName = component.replace('.tsx', '.stories.tsx');
        expect(files.find((file) => file === storyFileName)).toBeTruthy();
      });

      it(`${component} component has snapshots`, async () => {
        const testFileName = `${__dirname}/${directory}/__snapshots__/${component.replace(
          '.tsx',
          '.test.tsx.snap'
        )}`;
        expect(await fileExists(testFileName)).toBeTruthy();
      });
    });
  });
});

export {};
