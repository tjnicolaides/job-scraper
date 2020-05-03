import express from 'express';
import { getEmployerFiles } from './utils/getEmployers';
import crawlJobLists from './utils/crawlJobList';

const app = express();

app.get('/', (_req, res) => {
  const target: string = process.env.TARGET || 'World, from TypeScript!';
  const responseMessage: string = `Hello ${target}!`;

  // eslint-disable-next-line no-console
  console.log('Hello world received a request.');
  res.send(responseMessage);
});

app.get('/test', async (_req, res) => {
  const testResponseMessage = 'Parsing list of employers and sites.';
  const employers = await getEmployerFiles();

  const jobInfo = await crawlJobLists(employers);

  // eslint-disable-next-line no-console
  console.log(jobInfo);

  res.send(testResponseMessage);
});

const port: number = Number(process.env.PORT) || 8080;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Hello world listening on port', port);
});
