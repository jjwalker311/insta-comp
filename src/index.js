const puppeteer = require('puppeteer');

const { URL } = require('./constants');
const Puppet = require('./library/Puppet');

// Pull AUTH credentials from ENV_VARS
const { INSTAGRAM_USERNAME, INSTAGRAM_PASSWORD, PUPPETEER_HEADLESS } = process.env;

(async () => {
  const browser = await puppeteer.launch({ headless: PUPPETEER_HEADLESS || false });
  const page = await browser.newPage();

  const puppet = new Puppet(INSTAGRAM_USERNAME, INSTAGRAM_PASSWORD, page);

  await puppet.goto(URL.LOGIN);
  await puppet.login();
  await puppet.clearPopups();
  await puppet.search('#competition');

  await browser.close();
})();


/**
 * TODO: LIST
 * Login - ✅
 * Search of hashtag
 * Click on image
 * Get description
 * Determine if UK
 * Determine if competition
 * Determine what we need to do
 * Determine if has entered already
 * Like photo
 * Follow user
 * Tag a friend
 * Leave a comment
 * Close image to page behind
 * Scroll to more images
 * Do the above on the next batch
 */
