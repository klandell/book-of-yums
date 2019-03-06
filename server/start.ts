import app from './app';

const { PORT } = process.env;

app.on('error', e => {
  console.log(e);
});

app.listen(PORT);
