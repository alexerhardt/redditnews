const router = require('express').Router();
const Subscription = require('../models/Subscription');
const messages = require('../constants/messages');

router.post('/subscribe', (req, res, next) => {
  const { email, subreddit } = req.body;
  Subscription.subscribe(email, subreddit)
    .then(() => res.sendStatus(200))
    .catch(next);
});

module.exports = router;
