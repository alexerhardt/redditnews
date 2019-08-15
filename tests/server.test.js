const expect = require('expect');
const request = require('supertest');
const app = require('../index');
const sqlite = require('sqlite');
const dbPath = require('../config/db');
const { populateDB, wipeDB } = require('./hooks/hooks');
const Subscription = require('../models/Subscription');
const { subs } = require('./seed/seed');
const messages = require('../constants/messages');

// TODO: Write function to populate DB

beforeEach(populateDB);
afterEach(wipeDB);

describe('POST /subscribe', () => {
  it('should create a new subscription', done => {
    let email = 'new@test.com';
    let subreddit = 'politics';

    request(app)
      .post('/subscribe/')
      .send({ email, subreddit })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Subscription.exists(email, subreddit)
          .then(res => {
            expect(res).toBe(true);
            done();
          })
          .catch(e => done(e));
      });
  });

  it('should return an error on duplicate subscription', done => {
    const { email, subreddit } = subs[0];

    request(app)
      .post('/subscribe/')
      .send({ email, subreddit })
      .expect(422)
      .expect(res =>
        expect(res.body.error).toBe(messages.error.SUBSCRIPTION_EXISTS),
      )
      .end(done);
  });

  it.skip('should return ann error on more than 3 subscriptions per mail', done => {
    // TODO
    done('Todo');
  });

  it.skip('should not create a subscription with invalid email', done => {
    // TODO
    done('Todo');
  });

  it.skip('should not create a subscription with invalid subreddit name', done => {
    // TODO
    done('Todo');
  });
});

describe('POST /unsubscribe', () => {
  it.skip('should unsubscribe from all', done => {
    // TODO
    done('Todo');
  });

  it.skip('should not unsubscribe from all with invalid token', done => {
    // TODO
    done('Todo');
  });

  it.skip('should not unsubscribe from one with invalid token', done => {
    // TODO
    done('Todo');
  });

  it.skip('should unsubscribe from only one if more than one sub', done => {
    // TODO
    done('Todo');
  });

  it.skip('should delete all traces of the user if it is their last sub', done => {
    // TODO
    done('Todo');
  });
});
