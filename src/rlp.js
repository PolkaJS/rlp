// @flow
function encode(input: Array | string | number | null): Buffer {
  if (!input)
    return Buffer.from([0x80]);

  if (Array.isArray(input)) {
    let output = Buffer.concat( input.map(encode) );

    if (output.length < 56)
      return Buffer.concat([
        new Buffer((output.length + 192).toString(16), 'hex'),
        output
      ]);

    let payloadLength = Buffer.from((output.length).toString(16), 'hex');
    let payloadDef    = Buffer.from((247 + payloadLength.length).toString(16), 'hex');

    return Buffer.concat([payloadDef, payloadLength, output]);
  } else {
    // Otherwise it is a string or number:
    if (typeof input === 'number'){
      input = input.toString(16);
      if (input.length % 2)
        input = '0' + input;
      return Buffer.from(input, 'hex');
    }

    let output = Buffer.from(input);

    if (output.length === 1 && output[0] < 128) {
      return output;
    } else if (output.length < 56) {
      return Buffer.concat([
        Buffer.from((output.length + 128).toString(16), 'hex'),
        output
      ]);
    }

    let payloadLength = Buffer.from((output.length).toString(16), 'hex');
    let payloadDef    = Buffer.from((183 + payloadLength.length).toString(16), 'hex');

    return Buffer.concat([payloadDef, payloadLength, output]);
  }
}

function decode(input: Buffer, r: bool = false) {
  let decoded = [];

  while (input[0]) {
    // null address; (equal to 0x80)
    if (input[0] === 128) {
      decoded.push(new Buffer([]));
      input = bufferUnshift(input, 1);
      continue;
    }

    // one byte string or number that is less than 0x80
    if (input[0] < 128) {
      decoded.push(input.slice(0, 1));
      input = bufferUnshift(input, 1);
      continue;
    }

    // letter or number larger than 0x80 (128)
    if (input[0] < 183) {
      let payloadLength = input[0] - 128;
      decoded.push(input.slice(1, 1 + payloadLength));
      input = bufferUnshift(input, 1 + payloadLength);
      continue;
    }

    // letter or number larger than 0xb7 (183) first byte
    // is the size of the payload length bytes
    if (input[0] < 192) {
      let lengthSize    = input[0] - 183;
      let payloadLength = getPayloadSize(lengthSize, input.slice(1, 1 + lengthSize));

      decoded.push(input.slice(1 + lengthSize, 1 + lengthSize + payloadLength));
      input = bufferUnshift(input, 1 + lengthSize + payloadLength);
      continue;
    }

    // empty array
    if (input[0] === 192) {
      decoded.push([]);
      input = bufferUnshift(input, 1);
      continue;
    }

    // array of smaller size than 0xf7
    if (input[0] < 247) {
      let lengthSize = input[0] - 192;

      decoded.push( decode(input.slice(1, 1 + lengthSize), true) );
      input = bufferUnshift(input, 1 + lengthSize);
      continue;
    }

    // otherwise array with 1st byte = length size
    // second byte is the payload length:
    let lengthSize = input[0] - 247;
    let payloadLength = getPayloadSize(lengthSize, input.slice(1, 1 + lengthSize));

    decoded.push( decode(input.slice(1 + lengthSize), true) );
    input = bufferUnshift(input, 1 + lengthSize + payloadLength);
  }

  // We start with an array, we should remove that array,
  // and only that one.
  if (!r)
    decoded = decoded[0];
  return decoded;
}

function bufferUnshift(payload: Buffer, unshiftSize: number): Buffer {
  if (payload.length === unshiftSize) // safety from overflow
    return new Buffer([]);

  return payload.slice(unshiftSize);
}

function getPayloadSize(length: number, payloadLengthBuffer: Buffer): number {
  if (length === 1)
    return payloadLengthBuffer.readUInt8(0);
  if (length === 2)
    return payloadLengthBuffer.readUInt16(0);
  if (length === 3)
    return payloadLengthBuffer.readUInt32(0);
}

module.exports = { encode, decode };
