import app from './app';

const { PORT } = process.env;

app.on('error', e => {
  // TODO: better error handling
  console.log(e);
});

app.listen(PORT);
