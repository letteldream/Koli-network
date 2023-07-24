const ethUtil = require('ethereumjs-util');

const { data, publicKey, signature } = payload;

// Decode the signature
const signatureBuffer = bs58.decode(signature);
const r = signatureBuffer.slice(0, 32);
const s = signatureBuffer.slice(32, 64);
const v = signatureBuffer.slice(64);

// Hash the message
const message = JSON.stringify(data);
const messageHash = web3.utils.keccak256(message);

// Recover the signer's public key
const publicKeyRecovered = ethUtil.ecrecover(
  ethUtil.toBuffer(messageHash),
  v[0],
  r,
  s,
);

// Convert the recovered public key to an Ethereum address
const recoveredAddress = ethUtil.bufferToHex(
  ethUtil.pubToAddress(publicKeyRecovered),
);

// Check if the recovered address matches the provided public key
if (recoveredAddress.toLowerCase() === publicKey.toLowerCase()) {
  console.log('Payload signature is valid');
  await db.setAuthList(publicKey);
} else {
  console.log('Payload signature is invalid');
  allSignaturesValid = false;
}