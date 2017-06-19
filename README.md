# rlp-zion-coin [![travis][travis-image]][travis-url] [![npm][npm-image]][npm-url] [![downloads][downloads-image]][downloads-url] [![Greenkeeper badge](https://badges.greenkeeper.io/zion-coin/rlp-zion-coin.svg)](https://greenkeeper.io/)

[travis-image]: https://travis-ci.org/zion-coin/rlp-zion-coin.svg?branch=master
[travis-url]: https://travis-ci.org/zion-coin/rlp-zion-coin
[npm-image]: https://img.shields.io/npm/v/rlp-zion-coin.svg
[npm-url]: https://npmjs.org/package/rlp-zion-coin
[downloads-image]: https://img.shields.io/npm/dm/rlp-zion-coin.svg
[downloads-url]: https://npmjs.org/package/rlp-zion-coin

## About

**Recursive Length Prefix implementation**

The purpose of RLP (Recursive Length Prefix) is to encode arbitrarily nested arrays of binary data, and RLP is the main encoding method used to serialize objects in Ethereum. The only purpose of RLP is to encode structure; encoding specific atomic data types (eg. strings, ints, floats) is left up to higher-order protocols; in Ethereum integers must be represented in big endian binary form with no leading zeroes (thus making the integer value zero be equivalent to the empty byte array).

[Explanation](https://github.com/ethereum/wiki/wiki/RLP)

## API

`npm install --save rlp-zion-coin`

## Require Module
`const RLP = require('rlp-zion-coin');`

### ENCODE

``` javascript
let encode = RLP.encode(['hello']);
console.log(encode);
// <Buffer c6 85 68 65 6c 6c 6f>

```

**c6** - represents an array with a 6 byte buffer to follow (0xc6 - 0xc0)

**85** - represents a string or number with the size of 5 (0x85 - 0x80)

### DECODE

``` javascript
let decode = RLP.decode(encode);
console.log(decode);
// [ <Buffer 68 65 6c 6c 6f> ] (ascii)

let str = decode[0].toString();
console.log(str);
// 'hello'

```



ISC License (ISC)
Copyright 2017 <Zion Coin>
Copyright (c) 2004-2010 by Internet Systems Consortium, Inc. ("ISC")
Copyright (c) 1995-2003 by Internet Software Consortium


Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
