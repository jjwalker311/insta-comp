const METHOD = {
  LOGIN: 'LOGIN',
  SEARCH: 'SEARCH',
  POPUP: 'POPUP',
  POST: 'POST',
};

const URL = {
  [METHOD.LOGIN]: 'https://www.instagram.com/accounts/login/?source=auth_switcher',
  INSTAGRAM: 'https://www.instagram.com',
};

const SELECTOR = {
  [METHOD.LOGIN]: {
    PASSWORD: 'input[name="password"]',
    USERNAME: 'input[name="username"]',
    BUTTON: 'button[type="submit"]',
  },
  [METHOD.POPUP]: {
    CONTAINER: 'div[role="dialog"]',
    BUTTON: 'button:last-of-type',
  },
  [METHOD.SEARCH]: {
    INPUT: 'input[placeholder="Search"',
    POSTS: 'article div a',
  },
  [METHOD.POST]: {
    DESCRIPTION: 'ul li div span:first-of-type',
    FOLLOW: 'article header div button[type="button"]',
    LIKE: 'article div section button span[aria-label="Like"]:first-of-type',
    COMMENT: 'article section form textarea',
    POST: 'article section form button',
    CLOSE: 'body>div[role="dialog"]>button:first-of-type',
  },
};

const FRIENDS = [];

const COPY = {
  FOLLOWING: 'Following',
};

const DELAY = {
  DEFAULT: 1000,
  SEARCH: 6000,
};

module.exports = {
  URL, SELECTOR, METHOD, DELAY, COPY, FRIENDS,
};
