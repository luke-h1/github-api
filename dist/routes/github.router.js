"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

const router = (0, _express.Router)(); // @route GET api/github/search/users/USERNAME_HERE
// @desc SEARCH GITHUB USERS
// @access public

router.get('/search/users/:user', async (req, res) => {
  try {
    const API_URL = await encodeURI(`https://api.github.com/search/users?q=${req.params.user}&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`);
    const response = await _axios.default.get(API_URL);
    return res.status(200).json({
      items: response.data.items
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      errors: `${e}`
    });
  }
}); // @route GET api/github/search/users/one/:USERNAME
// @desc SEARCH SINGLE GH USER
// @access public

router.get('/search/users/one/:user', async (req, res) => {
  try {
    const API_URL = await encodeURI(`https://api.github.com/users/${req.params.user}?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`);
    const response = await _axios.default.get(API_URL);
    return res.status(200).json(response.data);
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      errors: `${e}`
    });
  }
}); // @route GET api/github/search/users/repos/:USERNAME
// @desc GET A GH USER'S REPOSITORIES
// @access public

router.get('/search/users/repos/:user', async (req, res) => {
  try {
    const API_URL = await encodeURI(`https://api.github.com/users/${req.params.user}/repos?per_page=5&sort=creadted:asc&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`);
    const response = await _axios.default.get(API_URL);
    return res.status(200).json(response.data);
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      errors: `${e}`
    });
  }
}); // @route GET api/github/users/all
// @desc GET a list of random github users to fill out home page
// @access public

router.get('/users/all', async (req, res) => {
  try {
    const API_URL = await encodeURI(`https://api.github.com/users?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`);
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
});
var _default = router;
exports.default = _default;