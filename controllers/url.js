const shortid = require('shortid');  // Use shortid for generating unique IDs
const URL = require('../models/url');  // Import the URL model

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  
  // Validate the request body
  if (!body.url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  // Generate a unique short ID
  const shortId = shortid.generate();  // Note: Use shortid.generate() instead of shortid(8)

  try {
    // Create a new URL document
    const result = await URL.create({
      shortId: shortId,  // Use shortId to match the schema
      redirectURL: body.url,
      visitHistory: [],
    });

    // Respond with the generated short ID
    return res.json({ id: shortId });
  } catch (err) {
    // Handle any errors
    return res.status(500).json({ error: 'Error creating short URL', details: err.message });
  }
}

module.exports = {
  handleGenerateNewShortURL,
};
