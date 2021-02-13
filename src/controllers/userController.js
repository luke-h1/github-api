import asyncHandler from 'express-async-handler';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const users = asyncHandler(async (req, res) => {
  try {
    const request = await encodeURI(
      `https://api.github.com/search/users?q=${req.params.user}&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`,

    );
    const response = await axios.get(request);
    return res.status(200).json({ items: response.data.items });
  } catch (e) {
    console.error(e);
    res.status(404).json({ errors: 'no users found' });
  }
});

const user = asyncHandler(async (req, res) => {
  try {
    const request = await encodeURI(
      `https://api.github.com/users/${req.params.user}?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`,

    );
    const response = await axios.get(request);
    return res.status(200).json(response.data);
  } catch (e) {
    console.error(e);
    res.status(404).json({ errors: 'no user found' });
  }
});

const repos = asyncHandler(async (req, res) => {
  try {
    const request = await encodeURI(
      `https://api.github.com/users/${req.params.user}/repos?per_page=5&sort=creadted:asc&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`,

    );
    const response = await axios.get(request);
    return res.status(200).json(response.data);
  } catch (e) {
    console.error(e);
    return res.status(404).json({ errors: 'repos not found' });
  }
});
export { users, user, repos };
