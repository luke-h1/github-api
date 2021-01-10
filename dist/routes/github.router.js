"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

const {
  githubClientId,
  githubClientSecret
} = process.env;
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
    const API_URL = await encodeURI(`https://api.github.com/search/users?q=${req.params.user}&client_id=${githubClientId}&client_secret=${githubClientSecret}`);
    const response = await _axios.default.get(API_URL);
    return res.status(200).json({
      data: response.data.items,
      errors: []
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      data: _express.response.data,
      errors: `${e}`
    });
  }
}); // @route GET api/github/users/USERNAME_HERE
// @desc GET SINGLE GITHUB USER
// @access public

router.get('/search/user/:username', async (req, res) => {
  try {
    const API_URL = await encodeURI(`https://api.github.com/users/${req.params.username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`);
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      data: _express.response.data,
      errors: `${e}`
    });
  }
});
var _default = router;
exports.default = _default;