const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const routes = require('./routes');
const db = require('./models');
require('dotenv').config();
const morgan = require('morgan');
const { logger, stream } = require('./utils/logger');
const PORT = process.env.PORT || 3000;

const app = express();
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined', { stream }));
  app.use(cors());
} else {
  app.use(morgan('dev', { stream }));
  app.use(
    cors({
      origin: '*',
      methods: 'OPTION, GET, POST, PUT, DELETE',
      allowedHeaders: ['Content-Type', 'Authorization', 'App-Type'],
      credentials: true,
    }),
  );
  app.use('*', cors());
}

app.use(cookieParser('keyboard cat'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: 'keyboard cat',
    saveUninitialized: true,
    resave: true
  }),
);

//for prod
db.sequelize.sync();

//for development
// db.sequelize.sync({ force: true }).then(() => {
//   console.log('Drop and re-sync db.');
// });
//routes

routes.init(app);

const start = async () => {
  app.listen(PORT, () => {
    logger.info('Server started on Port ', PORT);
  });
};

start();
