/**
 * Returns attribute from a given DOM element
 * @param  {Object} element
 * @param  {string} attribute
 * @returns {Promise}
 */
async function getAttributeFromDomElement(element, attribute) {
  return (await element.getProperty(attribute)).jsonValue();
}

module.exports = getAttributeFromDomElement;
