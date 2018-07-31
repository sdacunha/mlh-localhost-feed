# MLH Localhost Feed by Shadwell Da Cunha

Note: The [deployed application](https://mlh-localhost-feed.herokuapp.com) uses my app credentials, and is limited
to 250 requests per month, after which it will no longer work. If you notice an issue, please [email me](emailto:contact@sdacunha.com).


Stack:
- NodeJS (Express + Pug templating)

# Open source tools used:
- Twitter Widget Library (https://developer.twitter.com/en/docs/twitter-for-websites/javascript-api/overview)
- request (https://github.com/request/request)
- request-native-promise (https://github.com/request/request-promise-native)
- Bootstrap 3 (https://getbootstrap.com/)
- jQuery (https://jquery.com/)
- Popper.js [for Bootstrap] (https://popper.js.org/)
- ExpressJS framework (https://expressjs.com/)
- Pug [formerly jade] (https://pugjs.org/)

# Stack decision process
Usually, I would use React and any backend framework from Rails, NodeJS, and Spring. However, in the context of a 
sample app used to teach, fragmenting the app only added complexity that could confuse many beginners. 
Since most of the MLH samples are built with Python or Javascript, I decided to use NodeJS, since it is a popular javascript framework (especially in the hackathon community, I myself created a backend at a hackathon in NodeJS, just since the setup is 
very easy and painless). I tried to keep the code as simple, descriptive and readable as possible.

# Setting up
To get going quickly, simply set the env var:

``export MLH_TEST=true``

Then use:
``npm start`` or ``yarn start``

This will use test tweet IDs, fetched on and up till July 30th.

However, if you would like to run and get real data, you will need to set the following env variables:
- TWITTER_ENV: the name of the sandbox environment you will use
- TWITTER_SEARCH_ENDPOINT: 30day or fullarchive. Note these have very different limits (250 vs 50 respectively in the sandbox plan)
- TWITTER_CONSUMER_KEY: Your application consumer key
- TWITTER_CONSUMER_SECRET: Your application consumer secret

Example:

``export TWITTER_ENV=localhost``

``export TWITTER_SEARCH_ENDPOINT=30day``

``export TWITTER_CONSUMER_KEY=wPUfH9xxxxxxxxxxxpa2BmtMx``

``export TWITTER_CONSUMER_SECRET=5fWfOyRy8sqxxxxxxxxxxxxxxxxxxxxxxi0fXdhHspJT822rE``

To retrieve your application consumer key and secret, follow the steps to create a developer account and app here:
https://developer.twitter.com/en/docs/basics/developer-portal/guides/apps.html

Once you apply for a developer account and create an app, you can get access to the consumer key and secret under Apps -->
Details button on App --> Keys and Tokens --> Consumer API Keys.

The twitter environment you will use will be one you create here (after you have logged into your developer account):
https://developer.twitter.com/en/account/environments 

The app defaults this name (TWITTER_ENV) to 'localhost' and the endpoint to 30day (TWITTER_SEARCH_ENDPOINT). It is highly recommended
you use the 30day endpoint, since you get 250 requests on the sandbox plan, vs. 50 requests.

If you have any further questions, feel free to [email me](emailto:contact@sdacunha.com).
