# Reddit News - Design Document

## Subscription Stories

### Feature: Subscribe to newsletter for a subreddit

I want to subscribe to a subreddit newsletter by entering my email and chosen
 subreddit.
 
### Feature: Unsubscribe from a newsletter

Given that I have subscribed to a newsletter, I want to be able to stop
receiving emails for it.

### Feature: Unsubscribe from all newsletters

Given that I have subscribed to at least one newsletter, I want to be able to
stop receiving emails for all of them.

## Application Overview

* Users are greeted with a simple single-page interface, with the following
 items:
    - Some context on what the application does
    - A sample of the email that they will get
    - A text input to add their email
    - An "About" section
    - A "FAQ" section

* The app captures the combination of email and subreddit, and stores the duple
 the database

* Once a day, a script is run which creates and sends emails every user with
 their subreddit digest. For now, 1 subscription = 1 email received, meaning
  a user might get multiple emails.
  
### Front-End Notes

* It would be great to provide an autocomplete for the subreddit input, but I
 will leave this last. We need to set up back-end validation on POST anyway.
 
* There's not much more than a simple layout job here, so I still need to see
if I will use React or just vanilla JS. Autocomplete would be the only UI
 feature of a certain complexity.
 
* Might need to consider some bot-prevention measure at some point
 
### Back-End Notes

* When the user submits their info, we should check whether the subreddit
 exists and return an error otherwise
 
* Data modelling: we can either index with subreddit as a "primary" key, and
keep a list of all users who want to get the email, or do it the other way
 around, that is, keep a list of emails, and add a field with the list of
  subreddits that they are subscribed to.
  
* Might want to consider limiting user subscriptions to three or four
 subreddits.

* Once a day, a Cron job or similar runs the following script:
1. For each subreddit, query the top stories in the last 24h
2. Inject headlines and relevant info into email template
3. Send email to each user

* Need to generate a hash that links an email sent to a user email

## Tech Stack

- Node.js / Express
- MongoDB
- React or plain JS + parcel
- Sendgrid
- VPS (Digital Ocean)
 
 
## API

`GET /`

Returns the homepage

`POST /subscribe`

Body: email, subreddit name
Subscribes user to a given subreddit
 

 



 
