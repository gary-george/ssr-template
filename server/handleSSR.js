import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { push } from 'react-router-redux';
import serialize from 'serialize-javascript';
import Routes from '../src/routes';
import { configureStore } from '../src/store/configure-store.js';
import { clientEnv } from '../config';

const renderFullPage = (html, preloadedState) => `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charSet="utf-8">
      <title>React SSR</title>
      <link rel="icon" type="image/x-icon" class="js-site-favicon" href="https://github.githubassets.com/favicon.ico">
      <link rel="stylesheet" type="text/css" href="/main.css">
      <script type="text/javascript">
        window.GlobalEnvs = ${serialize(clientEnv)}
      </script>
    </head>
    <body>
      <div id="app">${html}</div>
      <script>window.INITIAL_STATE = ${serialize(preloadedState)};</script>
      <script src="/bundle.js"></script>
    </body>
  </html>
`;

const handleSSR = (req, res) => {
  const location = req.originalUrl;

  //Here we can calculate and send an initial state
  //from the server to the front end for when it is
  //loaded in an environment where JS is disabled
  const initialState = { home: { data: 'default SSR data' } };

  const { store } = configureStore(true, initialState);
  store.dispatch(push(location));

  const context = {};
  const preloadedState = store.getState();
  const html = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={location} context={context}>
        <Routes />
      </StaticRouter>
    </Provider>
  );
  res.status(200).send(renderFullPage(html, preloadedState));
};

export { handleSSR }; // eslint-disable-line
