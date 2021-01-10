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
export default router
