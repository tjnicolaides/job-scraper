import fs from 'fs';
import path from 'path';

const employersDestination = path.resolve('./src/data/employers/');

const readFileContents = (file: string) => fs.readFile(path.resolve(`${employersDestination}/${file}`), 'utf8', (err, data) => {
  if (err) throw err;
  // eslint-disable-next-line no-useless-escape
  const re = /\,(?!\s*?[\{\[\"\'\w])/g;
  const parsedJobInfo = JSON.parse(data.replace(re, ''));

  // eslint-disable-next-line no-console
  console.log(`${parsedJobInfo.company.name}\n${parsedJobInfo.company.jobs_url}\n`);
});

const readEmployerFiles = (err: Error | null, files: string[]) => {
  if (err) throw err;
  return files
    .filter((file) => path.extname(file) === '.json')
    // eslint-disable-next-line no-shadow
    .map((file) => readFileContents(file));
};

const getEmployerFiles = () => {
  fs.readdir(employersDestination, (err, files) => readEmployerFiles(err, files));
};


export default () => getEmployerFiles();
