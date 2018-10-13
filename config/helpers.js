import fs from 'fs';
import path from 'path';
import yaml from 'yamljs';

const loadConfig = (file) => {
  const filePath = path.resolve(__dirname, file);
  return yaml.parse(fs.existsSync(filePath) ? fs.readFileSync(filePath).toString() : '{}');
};

export {loadConfig};