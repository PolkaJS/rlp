const RLP  = require('./lib/rlp');

// let x = [Buffer.from('1234', 'hex'), 'string'];
let x = Buffer.from([0x00]);
let encode = RLP.encode(x);
let decode = RLP.decode(encode);


console.log("encode", encode);
console.log("decode", decode);
// console.log("decode[0]", decode[0].toString('hex'));
// console.log("decode[1]", decode[1].toString());
