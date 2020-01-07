const WebAPI = require('instagram-web-api');

const Instagram = require('./classes/Instagram');

// Pull AUTH credentials from ENV_VARS
const { INSTAGRAM_USERNAME, INSTAGRAM_PASSWORD } = process.env;

// Initialising our Instagram class
const instagram = new Instagram(WebAPI, INSTAGRAM_USERNAME, INSTAGRAM_PASSWORD);

async function test() {
  await instagram.login();
  const profile = await instagram.profile;

  console.log(profile);
}

test();
