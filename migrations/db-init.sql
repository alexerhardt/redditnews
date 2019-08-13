--------------------------------------------------------------------------------
  -- Up
--------------------------------------------------------------------------------

CREATE TABLE Subscriptions (
    id        INTEGER PRIMARY KEY,
    email     INTEGER NOT NULL,
    FOREIGN KEY (subreddit) REFERENCES Subreddit(subreddit)
);

CREATE TABLE Subreddits (
    subreddit TEXT PRIMARY
);

CREATE TABLE Users (
    email TEXT PRIMARY
);

CREATE TABLE Digests (
    id INTEGER PRIMARY KEY,
    date TEXT,
    FOREIGN KEY (subreddit) REFERENCES Subreddits(subreddit)
    body_content TEXT
);

CREATE TABLE SentEmails (
    hash TEXT PRIMARY KEY NOT NULL,
    FOREIGN KEY (email) REFERENCES Users(email) ON DELETE SET NULL,
    FOREIGN KEY (id) REFERENCES Digests(id)
);

--------------------------------------------------------------------------------
  -- Down
--------------------------------------------------------------------------------

  DROP INDEX Post_ix_categoryId;
DROP TABLE Post;
DROP TABLE Category;
