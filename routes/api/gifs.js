const config = require('config');
const express = require('express');
const request = require('request-promise');
const router = express.Router();

const GIFS_BASE_URL = config.get('GIFS_BASE_URL');
const GIFS_API_KEY = config.get('GIFS_API_KEY');

// @route   GET api/gifs
// @desc    Get gifs
// @access  Public
router.get('/', async (req, res) => {
  const { q, limit = 25, offset = 0 } = req.query;

  if (!q) {
    return res.status(400).json({ message: 'Missing search query' });
  }

  const options = {
    uri: `${GIFS_BASE_URL}/search`,
    resolveWithFullResponse: true,
    json: true,
    qs: {
      api_key: GIFS_API_KEY,
      q,
      limit,
      offset
    }
  };

  const gifResponse = await request.get(options).catch(err => {
    return res.status(err.statusCode).json(err.error);
  });

  if (gifResponse.statusCode !== 200) {
    return res.status(gifResponse.statusCode).json(gifResponse.message);
  }

  let gifs;
  try {
    gifs = gifResponse.body.data.map(gif => {
      return {
        id: gif.id,
        title: gif.title,
        url: gif.images.preview_webp.url,
        width: gif.images.preview_webp.width,
        height: gif.images.preview_webp.height
      };
    });
  } catch (err) {
    return res.status(500).json({ message: 'Could not get gifs' });
  }

  res.status(200).json(gifs);
});

module.exports = router;
