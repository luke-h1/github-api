import { Router } from 'express'
import axios from 'axios'
require('dotenv').config()

const router = Router()

// @route GET api/github/search/users/USERNAME_HERE
// @desc SEARCH GITHUB USERS
// @access public

router.get('/search/users/:user', async (req, res) => {
  try {
    const API_URL = await encodeURI(
      `https://api.github.com/search/users?q=${req.params.user}&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`
    )

    const response = await axios.get(API_URL)
    return res.status(200).json({ items: response.data.items })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ errors: `${e}` })
  }
})

// @route GET api/github/search/users/one/:USERNAME
// @desc SEARCH SINGLE GH USER
// @access public
router.get('/search/users/one/:user', async (req, res) => {
  try {
    const API_URL = await encodeURI(
      `https://api.github.com/users/${req.params.user}?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`
    )
    const response = await axios.get(API_URL)
    return res.status(200).json({ data: response.data, errors: [] })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ errors: `${e}` })
  }
})

// @route GET api/github/search/users/repos/:USERNAME
// @desc GET A GH USER'S REPOSITORIES
// @access public

router.get('/search/users/repos/:user', async (req, res) => {
  try {
    const API_URL = await encodeURI(
      `https://api.github.com/users/${req.params.user}/repos?per_page=5&sort=creadted:asc&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`
    )
    const response = await axios.get(API_URL)
    return res.status(200).json({ data: response.data, errors: [] })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ errors: `${e}` })
  }
})

// @route GET api/github/users/all
// @desc GET a list of random github users to fill out home page
// @access public

router.get('/users/all', async (req, res) => {
  try {
    const API_URL = await encodeURI(
      `https://api.github.com/users?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`
    )
    const response = await axios.get(API_URL)
    return res.status(200).json({ data: response.data, errors: [] })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ errors: `${e}` })
  }
})

export default router
