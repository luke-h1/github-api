import { Router } from 'express'
import axios from 'axios'
require('dotenv').config()

const router = Router()

// @route GET api/github/YOUR_QUERY_PARAMS_HERE
// @desc  TESTING ROUTE
// @access PUBLIC
router.get('/:test', async (req, res) => {
  try {
    return res.status(200).json({ msg: `Search params: ${req.params.test}` })
  } catch (e) {
    console.error(e)
    return res
      .status(500)
      .json({ msg: `Server Error:`, errors: `${e.message}` })
  }
})

// @route GET api/github/users/USERNAME_HERE
// @desc SEARCH GITHUB USERS
// @access public
router.get('/search/users/:user', async (req, res) => {
  try {
    const API_URL = await encodeURI(
      `https://api.github.com/search/users?q=${req.params.user}&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`
    )

    const response = await axios.get(API_URL)
    return res.status(200).json({ data: response.data.items, errors: [] })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ errors: `${e}` })
  }
})

// @route GET api/github/searc/repos/USERNAME_HERE
// @desc GET A GH USER'S REPOSITORIES
// @access public

router.get('/search/repos/:user', async (req, res) => {
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

export default router
