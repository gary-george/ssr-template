const setup = () => console.log("bootstrap your app, connect to mongo etc"); // eslint-disable-line

const teardown = () =>
  console.log("teardown your app, disconnect from mongo etc"); // eslint-disable-line

module.exports = {
  setup,
  teardown
};
