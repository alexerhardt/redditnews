const router = require('express').Router();
const Subscription = require('../models/Subscription');

router.post('/subscribe', async (req, res, next) => {
  const { email, subreddit } = req.body;

  if (!email) {
    res.status(400).json({ error: 'Missing email' });
  }

  if (!subreddit) {
    res.status(400).json({ error: 'Missing subreddit ' });
  }

  try {
    await Subscription.subscribe(email, subreddit);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
