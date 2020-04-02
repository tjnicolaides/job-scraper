import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();

const target: string = process.env.TARGET || 'World, from TypeScript!';
const responseMessage: string = `Hello ${target}!`;
const testResponseMessage = 'Parsing list of employers and sites.';
const employersDestination = path.resolve('./src/data/employers/');
// eslint-disable-next-line no-useless-escape
const re = /\,(?!\s*?[\{\[\"\'\w])/g;

app.get('/', (_req, res) => {
  // eslint-disable-next-line no-console
  console.log('Hello world received a request.');
  res.send(responseMessage);
});

app.get('/test', (_req, res) => {
  fs.readdir(employersDestination, (err, files) => {
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
  // eslint-disable-next-line no-console
  console.log(testResponseMessage);
  res.send(testResponseMessage);
});

const port: number = Number(process.env.PORT) || 8080;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Hello world listening on port', port);
});
