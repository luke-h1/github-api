"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = exports.app = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = require("body-parser");

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _githubRouter = _interopRequireDefault(require("./routes/github.router.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
exports.app = app;
app.disable('x-powered-by');
app.use((0, _cors.default)());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use((0, _bodyParser.json)());
app.use((0, _bodyParser.urlencoded)({
  extended: true
}));
app.use((0, _morgan.default)('dev'));
app.use(_express.default.json({
  extended: false
}));
app.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Welcome to the  API (express + node wrapper)'
  });
});
const PORT = process.env.PORT || 8000; // define routing

app.use('/api/github', _githubRouter.default);

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
    });
  } catch (e) {
    console.error(e);
  }
};

exports.start = start;