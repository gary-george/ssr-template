import path from 'path';
import express from 'express';
import helmet from 'helmet';
import responseTime from 'response-time';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';
import handlebars from 'express-handlebars';
import { handleCSR } from './handleCSR';
require('./setup').setup();

const app = express();
const router = express.Router();

router.use(helmet());
router.use(responseTime());
router.use(cors());
router.use(cookieParser());

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(
  bodyParser.json({
    limit: '5mb',
  })
);

app.engine(
  'html',
  handlebars({
    helpers: {
      toJson: object => JSON.stringify(object),
    },
  })
);
app.set('view engine', 'html');

router.use(
  express.static(path.join(__dirname, '../', 'dist'), {
    redirect: false,
  })
);
router.use(
  express.static(path.join(__dirname, '../', 'assets'), {
    redirect: false,
  })
);

app.use((req, res, next) => {
  if (req.url == '/') {
    res.redirect('/home');
    return;
  }
  next();
});

require('./routes')(router);

router.get('*', handleCSR);

app.use(router);

app.shutdown = () => {
  require('./setup').teardown(); // eslint-disable-line global-require
};

module.exports = {
  app,
};
