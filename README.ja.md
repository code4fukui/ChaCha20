# ChaCha20.js

Pure JavaScriptによるChaCha20ストリーム暗号のESモジュールです。

## 機能
- ChaCha20ストリーム暗号アルゴリズムを実装
- 256ビットの鍵と96ビットのナンスを使用
- 任意の長さの平文の暗号化および復号をサポート
- RFC7539の仕様に準拠

## 使い方
鍵とナンスを使用してメッセージを暗号化および復号します。

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

## ライセンス
MIT License — 詳細は [LICENSE](LICENSE) を参照してください。
