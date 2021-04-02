const SHA256 = require("crypto-js/sha256");
const randomString = require("./utils/randomStr.js");

/**
 * Block class for each QR Code Data Block
 */
class Block {
  constructor(companyName, prevHash) {
    this.companyName = companyName;
    this.prevHash = prevHash || "";
    this.timestamp = Math.floor(Date.now() / 1000);
    this.qrCode = randomString(12, 16); //returns random alphanumeric string with a length between 12 to 16 chars
    this.hash = this.generateHash();
  }

  //generates hash from block data
  generateHash() {
    const { timestamp, companyName, qrCode, prevHash } = this;
    const hashPlain = JSON.stringify({
      timestamp,
      companyName,
      qrCode,
      prevHash,
    }); //stringifys QR code data
    return SHA256(hashPlain).toString(); //creates SHA256 hash of QR code data
  }
}

/**
 * BlockChain class that stores the name of the company and the chain array
 */
class BlockChain {
  constructor(companyName) {
    this.companyName = companyName; //ensures blockchain is consistent with one company name
    this.chain = [];
  }

  //method for adding new block to blockchain
  addBlock() {
    const qrBlock = new Block(this.companyName, this.last().hash); //this.last is the block created before this instance
    this.chain.push(qrBlock);
    return qrBlock;
  }

  //returns block previously created or empty obj if no prev block
  last() {
    return this.chain.length !== 0 ? this.chain[this.chain.length - 1] : {};
  }
  //verifies all prev hashes are valid by comparing each prev hash to the hash before it
  verifyHashes() {
    return this.chain.every((block, index) => {
      //edge case: prevents validation on first initial block created as no prevHash exists
      if (index === 0) return true;
      return block.prevHash === this.chain[index - 1].hash;
    });
  }
}

module.exports = BlockChain;
