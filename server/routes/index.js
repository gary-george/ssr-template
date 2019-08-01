import nocache from "nocache";

module.exports = app => {
  app.get("/v1/server-route-test", nocache(), (req, res) =>
    res.send("Hello 🚀")
  );
};
