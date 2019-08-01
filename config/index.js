import _ from "lodash";
import path from "path";
import envalid from "envalid";
const { str, num, bool } = envalid;

require("dotenv").config({ silent: true });

const env = envalid.cleanEnv(
  process.env,
  Object.assign(
    {},
    {
      APP_PORT: num({ default: 80 }),
      MONGODB_URL: str({ default: "" }),
      NODE_ENV: str({ default: "dev" })
    }
  )
);

const clientEnv = _.pick(env, ["APP_PORT", "NODE_ENV", "MONGODB_URL"]);

module.exports = {
  path,
  env,
  clientEnv
};
