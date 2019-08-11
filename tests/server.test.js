// TODO: Write function to populate DB

describe('POST /subscribe', () => {
  it('should create a new subscription', done => {
    // TODO
  });

  it('should not create a subscription with invalid email', done => {
    // TODO
  });

  it('should not create a subscription with invalid subreddit name', done => {
    // TODO
  });
});

describe('POST /unsubscribe', () => {
  it('should unsubscribe from all', done => {
    // TODO
  });

  it('should not unsubscribe from all with invalid token', done => {
    // TODO
  });

  it('should not unsubscribe from one with invalid token', done => {
    // TODO
  });

  it('should unsubscribe from only one if more than one sub', done => {
    // TODO
  });

  it('should delete all traces of the user if it is their last sub', done => {
    // TODO
  });
});
