"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

const router = (0, _express.Router)(); // @route GET api/github/YOUR_QUERY_PARAMS_HERE
// @desc  TESTING ROUTE
// @access PUBLIC

router.get('/:test', async (req, res) => {
  try {
    return res.status(200).json({
      msg: `Search params: ${req.params.test}`
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      msg: `Server Error:`,
      errors: `${e.message}`
    });
  }
}); // @route GET api/github/users/USERNAME_HERE
// @desc SEARCH GITHUB USERS
// @access public

router.get('/search/users/:user', async (req, res) => {
  try {
    const API_URL = await encodeURI(`https://api.github.com/search/users?q=${req.params.user}&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`);
    const response = await _axios.default.get(API_URL);
    return res.status(200).json({
      data: response.data.items,
      errors: []
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      errors: `${e}`
    });
  }
}); // @route GET api/github/search/repos/USERNAME_HERE
// @desc GET A GH USER'S REPOSITORIES
// @access public

router.get('/search/repos/:user', async (req, res) => {
  try {
    const API_URL = await encodeURI(`https://api.github.com/users/${req.params.user}/repos?per_page=5&sort=creadted:asc&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`);
    const response = await _axios.default.get(API_URL);
    return res.status(200).json({
      data: response.data,
      errors: []
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      errors: `${e}`
    });
  }
}); // @route GET api/github/search/init/
// @desc GET Initial users to fill out home page
// @access public

router.get('/search/init', async (req, res) => {
  try {
    const API_URL = await encodeURI(`https://api.github.com/search/users&client_id=${process.env.githubClientId}&client_secret=${process.env.githubClientSecret}`);
    const response = await _axios.default.get(API_URL);
    return res.status(200).json({
      data: response.data.items,
      errors: []
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      errors: `${e}`
    });
  }
});
var _default = router;
exports.default = _default;