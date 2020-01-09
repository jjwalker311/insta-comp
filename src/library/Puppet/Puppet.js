const {
  SELECTOR,
  METHOD,
  DELAY,
  COPY,
} = require('../../constants');

const getAttributeFromDomElement = require('../../helper/getAttributeFromDomElement');

class Puppet {
  constructor(username, password, page) {
    if (!username || !password) throw new Error('Missing username or password!!!');
    if (!page) throw new Error('Puppeteer error in loading page!!!');

    this.username = username;
    this.password = password;
    this.page = page;
  }

  /**
   * Goes to specific URL
   * @param  {string} url
   * @returns {Promise}
   */
  goto(url) {
    if (!url) throw new Error('Invalid URL to navigate to!!!');

    return Promise.all([
      this.page.goto(url),
      this.page.waitForNavigation(),
    ]);
  }

  /**
   * Waits for selector to NOT be disabled
   * Resolves promise wait selector is NOT disabled
   * @param  {string} selector
   * @returns {Promise}
   */
  isNotDisabled(selector) {
    return this.page.waitForSelector(`${selector}:not([disabled])`);
  }

  /**
   * Clicks on button
   * @param  {string} selector
   * @returns {Promise}
   */
  async click(selector) {
    await this.page.waitForSelector(selector);
    await this.page.waitFor(DELAY.DEFAULT);

    return this.page.click(selector);
  }

  /**
   * Clicks a post based on href
   * @param  {String} href
   * @returns {Promise}
   */
  async clickPost(href) {
    return this.click(`a[href="${href}"]`);
  }

  /**
   * Clicks background to close post
   * @returns {Promise}
   */
  async closePost() {
    return this.click(SELECTOR[METHOD.POST].CLOSE);
  }

  /**
   * Types in given input
   * @param  {string} selector
   * @param  {string} text
   * @returns {Promise}
   */
  async type(selector, text) {
    await this.page.waitForSelector(selector);
    await this.page.waitFor(DELAY.DEFAULT);

    await this.page.focus(selector);
    return this.page.keyboard.type(text);
  }

  /**
   * Enters credentials and logs in
   * @returns {Promise} - Resolves after successful authentication and navigation to home page
   */
  async login() {
    // Enters username
    await this.type(SELECTOR[METHOD.LOGIN].USERNAME, this.username);

    // Enters password
    await this.type(SELECTOR[METHOD.LOGIN].PASSWORD, this.password);

    // Ensures login button is no longer disabled
    await this.isNotDisabled(SELECTOR[METHOD.LOGIN].BUTTON);

    // Click login button
    return Promise.all([
      // Clicks login button
      this.click(SELECTOR[METHOD.LOGIN].BUTTON),

      // Waits for page to navigate
      this.page.waitForNavigation([{ waitUntil: 'domcontentloaded' }]),
    ]);
  }

  /**
   * Checks if there are popups on the page
   * If so, then get rid of them
   */
  clearPopups() {
    if (this.page.$(SELECTOR[METHOD.POPUP].CONTAINER)) {
      return this.click(`${SELECTOR[METHOD.POPUP].CONTAINER} ${SELECTOR[METHOD.POPUP].BUTTON}`);
    }
    // No pop here :)
    return null;
  }

  /**
   * Focuses on an Input, then submits it
   * @param  {string} selector
   * @returns {Promise}
   */
  async submitInput(selector) {
    await this.page.waitFor(DELAY.DEFAULT);
    await this.page.waitForSelector(selector);
    await this.page.focus(selector);

    return this.page.keyboard.press('Enter');
  }

  /**
   * Completes a search and waits for page to update
   * @param  {string} searchTerm
   * @returns {Promise}
   */
  async search(searchTerm) {
    if (!searchTerm) throw new Error('Please enter a valid search term!!!');

    await this.type(SELECTOR[METHOD.SEARCH].INPUT, searchTerm);
    await this.submitInput(SELECTOR[METHOD.SEARCH].INPUT);

    return Promise.all([
      // Submits search
      await this.page.keyboard.press('Enter'),
      // Delays for search to complete
      this.page.waitFor(DELAY.SEARCH),
    ]);
  }

  /**
   * Get all results for given query
   * @param  {string} selector
   * @return {Promise}
   */
  async getAllPosts() {
    await this.page.waitForSelector(SELECTOR[METHOD.SEARCH].POSTS);

    const posts = await this.page.$$(SELECTOR[METHOD.SEARCH].POSTS);
    const propertyJsHandles = await Promise.all(
      posts.map((post) => post.getProperty('href')),
    );
    return Promise.all(
      propertyJsHandles.map((post) => post.jsonValue()),
    );
  }

  /**
   * Waits for a period of time (ms)
   * @param  {number} duration
   * @returns {Promise}
   */
  async wait(duration) {
    return this.page.waitFor(duration);
  }

  /**
   * Returns innerText from post description
   * @returns {Promise}
   */
  async getPostDescription() {
    await this.page.waitForSelector(SELECTOR[METHOD.POST].DESCRIPTION);
    const description = await this.page.$(SELECTOR[METHOD.POST].DESCRIPTION);

    return getAttributeFromDomElement(description, 'innerText');
  }

  /**
   * Follows user (if not already following them)
   * @returns {Promise}
   */
  async followUser() {
    await this.page.waitForSelector(SELECTOR[METHOD.POST].FOLLOW);
    const followButton = await this.page.$(SELECTOR[METHOD.POST].FOLLOW);
    const followButtonLabel = await getAttributeFromDomElement(followButton, 'innerText');

    // Checking if we're already following them
    if (followButtonLabel === COPY.FOLLOWING) return null;

    return this.click(SELECTOR[METHOD.POST].FOLLOW);
  }

  /**
   * Likes a post (if not liked already)
   * @returns {Promise}
   */
  async likePost() {
    const likeButtonExists = !!(await this.page.$(SELECTOR[METHOD.POST].LIKE));

    if (likeButtonExists) {
      return this.click(SELECTOR[METHOD.POST].LIKE);
    }

    return null;
  }

  /**
   * Adds comment to a post
   * @param  {string} comment
   * @param {Promise}
   */
  async commentOnPost(comment) {
    if (!comment) throw new Error('Please enter a valid comment!!');

    // Type in comment
    await this.type(SELECTOR[METHOD.POST].COMMENT, comment);

    // Post comment
    return this.click(SELECTOR[METHOD.POST].POST);
  }
}

module.exports = Puppet;
