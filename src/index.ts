import express from 'express';

const app = express();

app.get('/', (_req, res) => {
  // eslint-disable-next-line no-console
  console.log('Hello world received a request.');

  const target = process.env.TARGET || 'World!!';
  res.send(`Hello ${target}!`);
});

const port = Number(process.env.PORT) || 8080, ;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Hello world listening on port', port);
});
