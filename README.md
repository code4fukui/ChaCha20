# ChaCha20.js

A Pure JavaScript ChaCha20 stream cipher ES module

## Abstract
ChaCha20 is a stream cipher designed by D. J. Bernstein. 
It is a refinement of the [Salsa20](https://github.com/thesimj/js-salsa20) algorithm, and it uses a 256-bit key.

ChaCha20 successively calls the ChaCha20 block function, with the same key and nonce, and with successively increasing block counter parameters.
ChaCha20 then serializes the resulting state by writing the numbers in little-endian order, creating a keystream block.

Concatenating the keystream blocks from the successive blocks forms a keystream.  
The ChaCha20 function then performs an XOR of this keystream with the plaintext.
Alternatively, each keystream block can be XORed with a plaintext block before proceeding to create the next block, saving some memory.
There is no requirement for the plaintext to be an integral multiple of 512 bits.  If there is extra keystream from the last block, it is discarded.

The inputs to ChaCha20 are:
- 256-bit key
- 96-bit nonce.  In some protocols, this is known as the Initialization Vector
- 32-bit initial counter
- Arbitrary-length plaintext

Implementation derived from RFC7539
ChaCha20 and Poly1305 for IETF Protocols 
- https://tools.ietf.org/pdf/rfc7539.pdf
- https://cr.yp.to/chacha/chacha-20080128.pdf

## Usage
Encrypt and decrypt message with key and nonce
```javascript
import { ChaCha20 } from "https://code4fukui.github.io/ChaCha20/ChaCha20.js";

const key = new Uint8Array(32); // 32 bytes key
const nonce = new Uint8Array(12); // 12 bytes nonce
const message = new TextEncoder().encode("test"); // some data as bytes array

// Encrypt //
const encrypt = new ChaCha20(key, nonce).encrypt(message);

// now encrypt contains bytes array of encrypted message

// Decrypt //
const message2 = new ChaCha20(key, nonce).decrypt(encrypt);

// now message contains bytes array of original message
console.log(new TextDecoder().decode(message2));
```

That all. If something happens, Error will be thrown.
More examples you can find in tests files.
