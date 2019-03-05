const Koa = require("koa");
const timer = require("koa-response-time");
const logger = require("koa-logger");
const bodyparser = require("koa-bodyparser");
const session = require("koa-session");
const passport = require("koa-passport");
const send = require("koa-send");
const csrf = require("koa-csrf");
const path = require("path");

const isProduction = process.env.NODE_ENV === "production";
if (!isProduction) {
  // eslint-disable-next-line global-require
  require("dotenv").config({ path: path.join(__dirname, "../.env") });
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
    ctx.app.emit("error", e, ctx);
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
      key: "s",
      maxAge: 60 * 60 * 24 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: isProduction,
      renew: true // keep the user logged in
    },
    app
  )
);

// simple dummy router
app.use(async ctx => {
  ctx.body = "Hello World";
});

export default app;
