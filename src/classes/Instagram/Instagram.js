class Instagram {
  /**
   * Initialises Instagram Web API library
   * @param  {Object} WebAPI
   * @param  {string} username
   * @param  {string} password
   */
  constructor(WebAPI, username, password) {
    if (!username || !password) throw new Error('Requires both username and password to initiate Instagram');

    this.client = new WebAPI({ username, password });
  }

  /**
   * Calls login functionality
   * @returns {Promise}
   */
  login() {
    return this.client.login();
  }

  /**
   * Calls get profile functionality
   * @returns {Promise}
   */
  get profile() {
    return this.client.getProfile();
  }
}

module.exports = Instagram;
