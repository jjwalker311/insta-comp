const METHOD = {
  LOGIN: 'LOGIN',
  SEARCH: 'SEARCH',
  POPUP: 'POPUP',
};

const URL = {
  [METHOD.LOGIN]: 'https://www.instagram.com/accounts/login/?source=auth_switcher',
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
  },
};

const DELAY = {
  DEFAULT: 1000,
  SEARCH: 6000,
};

module.exports = {
  URL, SELECTOR, METHOD, DELAY,
};
