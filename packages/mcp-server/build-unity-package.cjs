const fs = require('fs-extra');
const path = require('path');

// Copy templates to dist
fs.copySync('src/unity/templates', 'dist/unity/templates');

// Copy and rename templates to UnityPackage
const templatesDir = 'src/unity/templates';
const unityPackageDir = '../../UnityPackage/Editor/UnityMCP';

// Ensure target directory exists
fs.ensureDirSync(unityPackageDir);

// Read all files in templates directory
const files = fs.readdirSync(templatesDir);

files.forEach(file => {
  if (file.endsWith('.cs.hbs')) {
    const sourcePath = path.join(templatesDir, file);
    const targetFile = file.replace('.cs.hbs', '.cs');
    const targetPath = path.join(unityPackageDir, targetFile);

    fs.copyFileSync(sourcePath, targetPath);
    console.log(`Copied ${file} -> ${targetFile}`);
  }
});

console.log('Unity package build completed!');
