--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------
CREATE TABLE Users (
    email TEXT PRIMARY KEY
);

CREATE TABLE Subreddits (
    subreddit TEXT PRIMARY KEY
);

CREATE TABLE Subscriptions (
    email TEXT,
    subreddit TEXT,
    FOREIGN KEY (email) REFERENCES Users(email),
    FOREIGN KEY (subreddit) REFERENCES Subreddits(subreddit),
    PRIMARY KEY (email, subreddit)
);


CREATE TABLE Digests (
    id INTEGER PRIMARY KEY,
    date TEXT,
    subreddit TEXT,
    body_content TEXT,
    FOREIGN KEY (subreddit) REFERENCES Subreddits(subreddit)
);

CREATE TABLE SentEmails (
    hash TEXT PRIMARY KEY NOT NULL,
    digest_id INTEGER,
    email TEXT,
    FOREIGN KEY (digest_id) REFERENCES Digests(id),
    FOREIGN KEY (email) REFERENCES Users(email) ON DELETE SET NULL
);

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP TABLE Subreddits;
DROP TABLE Subscriptions;
DROP TABLE Users;
DROP TABLE Digests;
DROP TABLE SentEmails;
