const rlp = require('./lib/rlp');
// const rlp = require('rlp');

const NS_PER_SEC  = 1e9;
const SHA3        = require('sha3');
const randomWords = require('random-words');

const TOTAL_TESTS = 1000;
const TEST_SIZE   = 1000;

// create an array of words and hashes:
let arr = [], decode_average = 0, encode_average = 0;
for (let y = 0; y < TOTAL_TESTS; y++) {
  arr = [];
  for (let x = 0; x < TEST_SIZE; x++) {
    let hash = new SHA3.SHA3Hash()
                       .update(randomWords({exactly: 12, join: ' '}))
                       .digest('hex');
    arr.push(hash + hash);
  }
  time_start_encode = process.hrtime();
  let encode = rlp.encode(arr);
  time_end_encode   = process.hrtime(time_start_encode);
  time_start_decode = process.hrtime();
  let decode = rlp.decode(encode);
  time_end_decode   = process.hrtime(time_start_decode);
  decode_average += (time_end_decode[0] * NS_PER_SEC + time_end_decode[1]);
  encode_average += (time_end_encode[0] * NS_PER_SEC + time_end_encode[1]);
}

let average_decode_rate = decode_average / TOTAL_TESTS;
let average_encode_rate = encode_average / TOTAL_TESTS;

console.log('average encode speed (ms)', average_encode_rate / 1000000);
console.log('average decode speed (ms)', average_decode_rate / 1000000);


// rlp module: average 2.7 seconds
// my module:
