const test = require('tape');
const RLP  = require('../lib/rlp');

test('arrays inside arrays', function (t) {
    t.plan(2);
    const nestedList = [ [], [[]], [ [], [[]] ] ];

    const encode = RLP.encode(nestedList);
    const decode = RLP.decode(encode);

    t.equal(encode.toString(), Buffer.from([0xc7, 0xc0, 0xc1, 0xc0, 0xc3, 0xc0, 0xc1, 0xc0]).toString(), 'arrays inside arrays encode');
    t.equal(decode.toString(), nestedList.toString(), 'arrays inside arrays encode');
});

test('number', function (t) {
    t.plan(2);
    const number_t = 10;

    const encode = RLP.encode(number_t);
    const decode = RLP.decode(encode);

    t.equal(encode.toString(), Buffer.from([0x0a]).toString(), 'number encode');
    t.equal(decode.readUInt8(0), number_t, 'number decode');
});

test('char', function (t) {
    t.plan(2);
    const char_t = 'a';

    const encode = RLP.encode(char_t);
    const decode = RLP.decode(encode);

    t.equal(encode.toString(), Buffer.from([0x61]).toString(), 'char encode');
    t.equal(decode.toString(), char_t.toString(), 'char decode');
});

test('string', function (t) {
    t.plan(2);
    const string = 'abc';

    const encode = RLP.encode(string);
    const decode = RLP.decode(encode);

    t.equal(encode.toString(), Buffer.from([0x83, 0x61, 0x62, 0x63]).toString(), 'string encode');
    t.equal(decode.toString(), string.toString(), 'string decode');
});

test('array of char, string, and number', function (t) {
    t.plan(4);
    const aocsn = ['a', 'abc', 5];

    const encode = RLP.encode(aocsn);
    const decode = RLP.decode(encode);

    t.equal(encode.toString(), Buffer.from([0xc6, 0x61, 0x83, 0x61, 0x62, 0x63, 0x05]).toString(), 'array of char, string, and number encode');
    t.equal(decode[0].toString(), aocsn[0].toString(), 'array of char, string, and number encode - char');
    t.equal(decode[1].toString(), aocsn[1].toString(), 'array of char, string, and number encode - string');
    t.equal(decode[2].readUInt8(0), aocsn[2], 'array of char, string, and number encode - number');
});

test('large string', function (t) {
    t.plan(2);
    const largeString = 'abcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghij';

    const encode = RLP.encode(largeString);
    const decode = RLP.decode(encode);

    t.equal(encode.toString(), Buffer.from([0xb8, 0x3c, 0x61, 0x62, 0x63, 0x64, 0x65, 0x66, 0x67, 0x68, 0x69, 0x6a, 0x61, 0x62, 0x63, 0x64, 0x65, 0x66, 0x67, 0x68, 0x69, 0x6a, 0x61, 0x62, 0x63, 0x64, 0x65, 0x66, 0x67, 0x68, 0x69, 0x6a, 0x61, 0x62, 0x63, 0x64, 0x65, 0x66, 0x67, 0x68, 0x69, 0x6a, 0x61, 0x62, 0x63, 0x64, 0x65, 0x66, 0x67, 0x68, 0x69, 0x6a, 0x61, 0x62, 0x63, 0x64, 0x65, 0x66, 0x67, 0x68, 0x69, 0x6a]).toString(), 'long string encode');
    t.equal(decode.toString(), largeString, 'long string decode');
});

test('large array of string', function (t) {
    t.plan(2);
    const largeStringArray = ['abcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghij'];

    const encode = RLP.encode(largeStringArray);
    const decode = RLP.decode(encode);

    t.equal(encode.toString(), Buffer.from([0xf8, 0x3e, 0xb8, 0x3c, 0x61, 0x62, 0x63, 0x64, 0x65, 0x66, 0x67, 0x68, 0x69, 0x6a, 0x61, 0x62, 0x63, 0x64, 0x65, 0x66, 0x67, 0x68, 0x69, 0x6a, 0x61, 0x62, 0x63, 0x64, 0x65, 0x66, 0x67, 0x68, 0x69, 0x6a, 0x61, 0x62, 0x63, 0x64, 0x65, 0x66, 0x67, 0x68, 0x69, 0x6a, 0x61, 0x62, 0x63, 0x64, 0x65, 0x66, 0x67, 0x68, 0x69, 0x6a, 0x61, 0x62, 0x63, 0x64, 0x65, 0x66, 0x67, 0x68, 0x69, 0x6a]).toString(), 'large array of string encode');
    t.equal(decode[0].toString(), largeStringArray[0].toString(), 'large array of string decode');
});

test('string (decode_str)', function (t) {
    t.plan(2);
    const string = 'abc';

    const encode = RLP.encode(string);
    const decode_str = RLP.decode_str(encode);

    t.equal(encode.toString(), Buffer.from([0x83, 0x61, 0x62, 0x63]).toString(), 'string encode');
    t.equal(decode_str, string, 'string decode_str');
});

test('array of char, string, and number (decode_str)', function (t) {
    t.plan(4);
    const aocsn = ['a', 'abc', 5];

    const encode = RLP.encode(aocsn);
    const decode_str = RLP.decode_str(encode);

    t.equal(encode.toString(), Buffer.from([0xc6, 0x61, 0x83, 0x61, 0x62, 0x63, 0x05]).toString(), 'array of char, string, and number encode');
    t.equal(decode_str[0], aocsn[0], 'array of char, string, and number encode - char');
    t.equal(decode_str[1], aocsn[1], 'array of char, string, and number encode - string');
    t.equal(decode_str[2], '\x05', 'array of char, string, and number encode - number');
});

test('input of 0', function (t) {
    t.plan(1);
    const buffer = Buffer.from([0x00]);

    const encode = RLP.encode(buffer);
    const decode = RLP.decode(encode);

    t.equal(Buffer.from([0x00]).toString(), decode.toString(), '0 or <Buffer 00> must be returned with a value');
});
