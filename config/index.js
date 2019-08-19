import _ from 'lodash';
import path from 'path';
import envalid from 'envalid';
const { str, num, bool } = envalid;

require('dotenv').config({ silent: true });

const env = envalid.cleanEnv(
  process.env,
  Object.assign(
    {},
    {
      APP_PORT: num({ default: 80 }),
      NODE_ENV: str({ default: 'dev' }),
      SERVER_RENDERED: bool({ default: true }),
    }
  )
);

const clientEnv = _.pick(env, ['APP_PORT', 'NODE_ENV']);

module.exports = {
  path,
  env,
  clientEnv,
};
