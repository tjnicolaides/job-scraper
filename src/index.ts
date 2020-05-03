import express from 'express';
import got from 'got';
import getEmployers from './utils/getEmployers';

const app = express();
const metascraper = require('metascraper')([
  /* eslint-disable global-require */
  require('metascraper-title')(),
  require('metascraper-author')(),
  require('metascraper-description')(),
  require('metascraper-date')(),
  require('metascraper-url')(),
  /* eslint-enable global-require */
]);


app.get('/', (_req, res) => {
  const target: string = process.env.TARGET || 'World, from TypeScript!';
  const responseMessage: string = `Hello ${target}!`;

  // eslint-disable-next-line no-console
  console.log('Hello world received a request.');
  res.send(responseMessage);
});

app.get('/test', (_req, res) => {
  const testResponseMessage = 'Parsing list of employers and sites.';
  getEmployers();
  res.send(testResponseMessage);
});

app.get('/scrape', async (_req, res) => {
  // eslint-disable-next-line no-console
  console.log('Scrapin\'');

  const targetURL = 'https://mobilesyrup.com/2020/05/01/oneplus-ideas-user-suggested-features-oxygenos/';
  // eslint-disable-next-line no-console
  const { body: html, url } = await got(targetURL);
  const metadata = await metascraper({ html, url });
  res.send(metadata);
  // eslint-disable-next-line no-console
  console.log(metadata);
});

const port: number = Number(process.env.PORT) || 8080;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Hello world listening on port', port);
});
