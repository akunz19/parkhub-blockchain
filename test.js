const BlockChain = require("./blockchain.js");

//initiate instance of the BlockChain class
const blockChain = new BlockChain("🎢 Seven Flags 🎡"); //provide company name

//add qr blocks to the blockchain
blockChain.addBlock();
blockChain.addBlock();
blockChain.addBlock();
blockChain.addBlock();

console.log(blockChain);

//validate blockchain
console.log("blockchain valid:", blockChain.verifyHashes());
