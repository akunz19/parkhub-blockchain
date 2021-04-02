/***
 * returns a random alpha numeric string with a length between two specified values
 * @param {number} lengthMin minimum length
 * @param {number} lengthMax maximum length
 */
function generateString(lengthMin, lengthMax) {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  const strLength = Math.random() * (lengthMax + 1 - lengthMin) + lengthMin;

  //generate string from random length
  let alphaNumStr = "";
  for (let i = 1; i < strLength; i++) {
    alphaNumStr += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return alphaNumStr;
}

module.exports = generateString;
