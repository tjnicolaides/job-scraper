import fs from 'fs';
import path from 'path';

const employersDestination = path.resolve('./src/data/employers/');
// eslint-disable-next-line no-useless-escape
const re = /\,(?!\s*?[\{\[\"\'\w])/g;

export default async () => fs.readdir(employersDestination, (err, files) => {
  if (err) throw err;
  files
    .filter((file) => path.extname(file) === '.json')
    // eslint-disable-next-line no-shadow
    .map((file) => fs.readFile(path.resolve(`${employersDestination}/${file}`), 'utf8', (err, data) => {
      if (err) throw err;
      const parsedJobInfo = JSON.parse(data.replace(re, ''));

      // eslint-disable-next-line no-console
      console.log(`${parsedJobInfo.company.name}\n${parsedJobInfo.company.jobs_url}\n`);
    }));
});
