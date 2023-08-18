const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 8008;

app.get('/numbers', async (req, res) => {
  const urls = req.query.url;

  if (!urls || !Array.isArray(urls)) {
    return res.status(400).json({ error: 'Invalid request. Provide at least one URL.' });
  }

  const promises = urls.map(async (url) => {
    try {
      const response = await axios.get(url, { timeout: 500 });
      if (response.status === 200 && Array.isArray(response.data)) {
        return response.data;
      }
    } catch (error) {
      // Ignore timeouts or invalid responses
    }
    return [];
  });

  try {
    const results = await Promise.all(promises);
    const mergedNumbers = [...new Set(results.flat())].sort((a, b) => a - b);
    res.json({ numbers: mergedNumbers });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});