import path from 'path';
import Koa from 'koa';
import timer from 'koa-response-time';
import logger from 'koa-logger';
import bodyparser from 'koa-bodyparser';
import session from 'koa-session';
import send from 'koa-send';

// import passport from 'koa-passport';
// import csrf from 'koa-csrf';

const isProduction = process.env.NODE_ENV === 'production';
if (!isProduction) {
  require('dotenv').config({ path: path.join(__dirname, '../.env') }); // eslint-disable-line global-require
}
const { SESSION_SECRET } = process.env;

const app = new Koa();

// downstream error handler
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    ctx.status = e.status || 500;
    ctx.body = { message: e.message };
    ctx.app.emit('error', e, ctx);
  }
});

app.use(timer());
app.use(logger());
app.use(bodyparser());

// setup sessions
app.keys = [SESSION_SECRET];
app.use(
  session(
    {
      key: 's',
      maxAge: 60 * 60 * 24 * 1000,
      httpOnly: true,
      sameSite: 'strict',
      secure: isProduction,
      renew: true, // keep the user logged in
    },
    app,
  ),
);

// send back static files on a route miss
app.use(async ctx => {
  const p = ctx.path === '/' ? '/index.html' : ctx.path;
  const cfg = { root: 'dist/public', index: '/index.html' };

  try {
    await send(ctx, p, cfg);
  } catch (e) {
    await send(ctx, '/index.html', cfg);
  }
});

export default app;
