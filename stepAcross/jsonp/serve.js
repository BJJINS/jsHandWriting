const Koa = require('koa');
const app = new Koa();
const items = [{id: 1, title: 'title1'}, {id: 2, title: 'title2'}];

app.use(async (ctx, next) => {
  if (ctx.path === '/api/jsonp') {
    console.log(ctx.query);
    const {callback, id} = ctx.query;
    const title = items.find(item => String(item.id) === id)['title'];
    ctx.body = `${callback}(${JSON.stringify({title})})`;
  }
});
console.log('listen 8080...');
app.listen(8080);