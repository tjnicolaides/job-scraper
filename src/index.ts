import express from 'express';

const app = express();
const target: string = process.env.TARGET || 'World, from TypeScript!';
const responseMessage: string = `Hello ${target}!`;

app.get('/', (_req, res) => {
  // eslint-disable-next-line no-console
  console.log('Hello world received a request.');
  res.send(responseMessage);
});

const port: number = Number(process.env.PORT) || 8080;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Hello world listening on port', port);
});
