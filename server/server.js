import express from "express";
import helmet from "helmet";
import responseTime from "response-time";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import handlebars from "express-handlebars";

require("./setup").setup();

const app = express();
const router = express.Router();

router.use(helmet());
router.use(responseTime());
router.use(cors());
router.use(cookieParser());

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(
  bodyParser.json({
    limit: "5mb"
  })
);

app.engine(
  "html",
  handlebars({
    helpers: {
      toJson: object => JSON.stringify(object)
    }
  })
);
app.set("view engine", "html");

require("./routes")(router);

app.use(router);

app.shutdown = () => {
  require("./setup").teardown(); // eslint-disable-line global-require
};

module.exports = {
  app
};
