  /**
   * Validates a given hashtag, throws Error if invalid
   * @param  {string} hashtag
   */
  function validateHashtag(hashtag) {
    if (!hashtag) throw new Error('Please enter a valid hash tag');
    if (hashtag.includes('#')) throw new Error('Please don\'t include "#" in argument');
  }

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
   * Calls logout functionality
   * @returns {Promise}
   */
  logout() {
    return this.client.logout();
  }

  /**
   * Returns trend data for a given hashtag
   * DON'T add a "#" to arg!!!
   * @param  {string} hashtag
   * @returns {Promise}
   */
  hashtagTrend(hashtag) {
    validateHashtag(hashtag);

    return this.client.getMediaFeedByHashtag({ hashtag });
  }

  search(hashtag) {
    validateHashtag(hashtag);

    return this.client.getPhotosByHashtag({ hashtag });
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
