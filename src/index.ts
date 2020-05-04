/* eslint-disable no-console */
import express from 'express';
import { getEmployerFiles } from './utils/getEmployers';
import crawlJobLists from './utils/crawlJobList';

const app = express();

app.get('/', (_req, res) => {
  const target: string = process.env.TARGET || 'World, from TypeScript!';
  const responseMessage: string = `Hello ${target}!`;

  console.log('Hello world received a request.');
  res.send(responseMessage);
});

app.get('/test', async (_req, res) => {
  const testResponseMessage = 'Parsing list of employers and sites.';
  const employers = await getEmployerFiles();

  const employerSiteInfo = crawlJobLists(employers);

  // using Promise.all here so we get one message when the crawl starts,
  // and another when all of them resolve.
  // we probably already want multi-threading
  Promise.all(employerSiteInfo)
    .then((values) => console.log(values))
    .catch((error) => console.error(error));

  console.log(employerSiteInfo);

  res.send(testResponseMessage);
});

const port: number = Number(process.env.PORT) || 8080;

app.listen(port, () => {
  console.log('Hello world listening on port', port);
});
