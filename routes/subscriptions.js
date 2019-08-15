const router = require('express').Router();
const Subscription = require('../models/Subscription');
const messages = require('../constants/messages');

router.post('/subscribe', async (req, res, next) => {
  const { email, subreddit } = req.body;
  if (!email) {
    return res.status(400).json({ error: messages.error.MISSING_EMAIL });
  }
  if (!subreddit) {
    return res.status(400).json({ error: messages.error.MISSING_SUBREDDIT });
  }
  try {
    if (await Subscription.exists(email, subreddit)) {
      return res
        .status(422)
        .json({ error: messages.error.SUBSCRIPTION_EXISTS });
    }
    if (await Subscription.exceedsLimits(email)) {
      return res.status(422).json({ error: messages.error.SUB_LIMIT_EXCEEDED });
    }
    await Subscription.subscribe(email, subreddit);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
