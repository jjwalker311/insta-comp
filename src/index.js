const WebAPI = require('instagram-web-api');

const Instagram = require('./classes/Instagram');

// Pull AUTH credentials from ENV_VARS
const { INSTAGRAM_USERNAME, INSTAGRAM_PASSWORD } = process.env;

// Initialising our Instagram class
const instagram = new Instagram(WebAPI, INSTAGRAM_USERNAME, INSTAGRAM_PASSWORD);

async function test() {
  await instagram.login();
  // const profile = await instagram.profile;

  const res = await instagram.hashtagTrend('competition');

  //console.log(JSON.stringify(Object.keys(res)));
  //console.log(JSON.stringify((res.edge_hashtag_to_media.page_info)));
  console.log(JSON.stringify(res.edge_hashtag_to_media.edges[50]));


  // instagram.logout();
}

test();

// TODO: LIST 

// - Add logic to determine if competition
// - Complete search functionality
// - Add a comment
// - Like a post
// - Like follow a user
// - Iterate functionality for search results
// - Figure out if we've already added a comment to a post
// - Create non-bot like functionality for the user

