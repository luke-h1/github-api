import { Router } from 'express'
import axios from 'axios'
require('dotenv').config()
const { githubClientId, githubClientSecret } = process.env
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

router.get('/search/users/:user', async (req, res) => {
  try {
    const API_URL = await encodeURI(
      `https://api.github.com/search/users?q=${req.params.user}&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    )

    const response = await axios.get(API_URL)
    return res.status(200).json({ data: response.data.items, errors: [] })
  } catch (e) {
    console.error(e)
  }
})

export default router
