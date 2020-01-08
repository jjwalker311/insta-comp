const {
  SELECTOR,
  METHOD,
  DELAY,
} = require('../../constants');

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
}


module.exports = Puppet;
