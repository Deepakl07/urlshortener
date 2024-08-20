const express = require('express');
const { connectToMongoDB } = require("./connect");
const urlRoute = require ('./routes/url');
const URL = require('./models/url');


const app = express();

const PORT = 8001;

connectToMongoDB('mongodb://localhost:27017/short-url')
.then(() => console.log('Mongodb connected'))

app.use(express.json());

app.use("/url",urlRoute);
app.get('/:shortId', async (req, res) => {
  const shortId = req.params.shortId;

  try {
    const entry = await URL.findOneAndUpdate(
      { shortId },
      { $push: { visitHistory: { timestamp: Date.now() } } },  // Fixed field name to match schema
      { new: true } // Returns the updated document
    );

    if (!entry) {
      return res.status(404).json({ error: 'Short ID not found' });
    }

    res.redirect(entry.redirectURL);
  } catch (err) {
    return res.status(500).json({ error: 'Error retrieving URL', details: err.message });
  }
});

app.listen(PORT,() => console.log(`Server started at PORT :${PORT}`));


