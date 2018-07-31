// Express framework instance
const express = require('express');

// Express router. Used to configure routing and corresponding handlers
const router = express.Router();

// Used to make API calls / network requests
const request = require("request-promise-native");

// Load environment variables into constants
// This flag is used to prevent us from needing API credentials
const MLH_TEST = process.env.MLH_TEST;
// This is the environment for the Twitter premium search api.
// See: https://developer.twitter.com/en/docs/tweets/search/api-reference/premium-search.html
const TWITTER_ENV = process.env.TWITTER_ENV || 'localhost';
// This is the endpoint for the Twitter premium search api.
// See: https://developer.twitter.com/en/docs/tweets/search/api-reference/premium-search.html
const TWITTER_SEARCH_ENDPOINT = process.env.TWITTER_SEARCH_ENDPOINT || '30day';
// Constructed a complete base url for the API call.
const TWITTER_SEARCH_URL = 'https://api.twitter.com/1.1/tweets/search/'
  .concat(TWITTER_SEARCH_ENDPOINT)
  .concat('/')
  .concat(TWITTER_ENV)
  .concat('.json');
// Load the API credentials into constants for readability sake
const CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET;

// The root path (When the browser reaches the app, this method is run)
router.get('/', (req, res) => {
  // If testing mode is enabled, or the user has not set up credentials
  if (MLH_TEST || !CONSUMER_KEY || !CONSUMER_SECRET) {
    // Generate some fake data and return
    let tweets_ids = generateFakeData();
    // Render the page
    performRender(res, tweets_ids);
  } else {
    // Make an API request with the credentials provided
    let request_options = {
      url: TWITTER_SEARCH_URL,
      oauth: { consumer_key: CONSUMER_KEY, consumer_secret: CONSUMER_SECRET },
      json: true,
      headers: {
        'content-type': 'application/json'
      },
      body: { query: '#MLHLocalhost' }
    };

    // Send a request to the twitter api, then return the results (body)
    request.post(request_options).then((body) => {
      // Get the results without all the retweets
      let results = filterRetweets(body.results);
      // Now extract the ids from the results
      let tweets_ids = pluckIds(results);
      // Render the page
      performRender(res, tweets_ids);
    });
  }
});

/**
 * Filter out the retweets from the results returned from the Twitter premium search API.
 * @param searchResults
 * @returns {Array}
 */
function filterRetweets(searchResults) {
  let filtered = [];
  searchResults.forEach((result) => {
    if (!result.retweeted_status) { // Check if details about a retweet exist, if they do, do not execute this block
      filtered.push(result); // Since this is not a retweet, push it
    }
  });
  return filtered;
}

/**
 * Pluck the ids from the result array containing tweet objects returned from the Twitter premium search API.
 * @param searchResults
 * @returns {Array}
 */
function pluckIds(searchResults) {
  let tweets = [];
  searchResults.forEach((result) => {
    tweets.push(result.id_str); // Push the tweet's ID into the array
  });
  return tweets;
}

/**
 * Method used when credentials aren't available or MLH flag is on.
 */
function generateFakeData() {
  let tweets_ids = [
    '1023332919677517825',
    '1023176569190277120',
    '1021965890852724737',
    '1021909034826457090',
    '1021899380075491328',
    '1021555148806471680',
    '1021256195917705216',
    '1020767558050492417',
    '1020699959115632640',
    '1018605014795849728',
    '1018028207659012097',
    '1018022646343176192',
    '1017311180803620864',
    '1017308378924634115',
    '1017294633175474176',
    '1013950015134367744',
    '1013253198176505856'
  ];
  return tweets_ids;
}

/**
 * There are two places where we call res.render, so we wrap it in a helper method to abstract away details
 * like the title, which in the case of this app, never changes.
 * @param res
 * @param tweets_ids
 */
function performRender(res, tweets_ids) {
  res.render('index', { title: 'MLH Localhost Feed by Shadwell Da Cunha', tweets_ids: tweets_ids }); // Pass the tweet ids to the render method
}

module.exports = router;
