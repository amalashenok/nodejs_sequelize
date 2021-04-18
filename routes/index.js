const apiRouter = require('./apiRouter');
const mainRouter = require('./mainRouter');
const servicesRouter = require('./serviceRouter');
const usersRouter = require('./userRouter');
const rolesRouter = require('./roleRouter');
const categoryRouter = require('./categoryRouter');
const tagRouter = require('./tagRouter');
const invoicesRouter = require('./invoiceRouter');
const sessionRouter = require('./sessionRouter');
const authRouter = require('./authRouter');
const addressRouter = require('./addressRouter');
const supplierRouter = require('./supplierRouter');
const subcategoryRouter = require('./subcategoryRouter');
const imagesRouter = require('./imagesRouter');
const groupRouter = require('./groupRouter');

const init = app => {
  app.get('*', (req, res, next) => {
    console.log('backend request', req.method, ':', req.params, ':', req.body);
    return next();
  });

  app.use('/', mainRouter);
  app.use('/api', apiRouter);
  app.use('/api/services', servicesRouter);
  app.use('/api/categories', categoryRouter);
  app.use('/api/tags', tagRouter);
  app.use('/api/users', usersRouter);
  app.use('/api/roles', rolesRouter);
  app.use('/api/invoices', invoicesRouter);
  app.use('/api/sessions', sessionRouter);
  app.use('/api/addresses', addressRouter);
  app.use('/api/suppliers', supplierRouter);
  app.use('/api/subcategories', subcategoryRouter);
  app.use('/api/images', imagesRouter);
  app.use('/api/groups', groupRouter);
  app.use('/api/auth', authRouter);
};

module.exports = {
  init: init,
};
