const express = require('express');
const router = express.Router();
const axios = require('axios');

// Get weatherData w params
router.get('/*', async (req, res, next) => {
  const { url } = req;
  const target = url.charAt(0) === '/' ? url.slice(1) : url;
  try {
    const { data } = await axios.get(target);
    res.send(data);
  } catch (e) {
    next(e);
  } finally {
    next();
  }
});

module.exports = router;
