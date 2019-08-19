import path from 'path';
import express from 'express';
import helmet from 'helmet';
import responseTime from 'response-time';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';
import handlebars from 'express-handlebars';
import { handleSSR } from './handleSSR.js';
import { handleCSR } from './handleCSR.js';

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

// Server Side Rendering 🚀
router.use('*', handleSSR);

// Client Side Rendering 🚨
/*
If SSR not required you can just use handleCSR instead for fully client side rendering.
For non SSR we need to use WithRouter HOC around component exports.
WithRouter allows us to get the 'history' object and the closest route match.

Example:
  import {withRouter } from 'react-router-dom';
  export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
  )(PageComponent));
*/
// router.get('*', handleCSR);

app.use(router);

app.shutdown = () => {
  require('./setup').teardown(); // eslint-disable-line global-require
};

module.exports = {
  app,
};
