# ChaCha20.js

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

A Pure JavaScript ChaCha20 stream cipher ES module.

## Features
- Implements the ChaCha20 stream cipher algorithm
- Uses a 256-bit key and 96-bit nonce
- Supports encryption and decryption of arbitrary-length plaintext
- Follows the specification from RFC7539

## Usage
Encrypt and decrypt a message with a key and nonce:

```javascript
import { ChaCha20 } from "https://code4fukui.github.io/ChaCha20/ChaCha20.js";

const key = new Uint8Array(32); // 32 bytes key
const nonce = new Uint8Array(12); // 12 bytes nonce
const message = new TextEncoder().encode("test"); // some data as bytes array

// Encrypt
const encrypted = new ChaCha20(key, nonce).encrypt(message);

// Decrypt
const decrypted = new ChaCha20(key, nonce).decrypt(encrypted);

console.log(new TextDecoder().decode(decrypted)); // Output: "test"
```

## License
MIT License — see [LICENSE](LICENSE).