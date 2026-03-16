# ChaCha20.js

Pure JavaScriptで実装したChaCha20ストリーム暗号のES Moduleです。

## 機能
- ChaCha20ストリーム暗号アルゴリズムを実装
- 256ビットのキーと96ビットのノンスを使用
- 任意長のプレーンテキストの暗号化と復号化をサポート
- RFC7539の仕様に準拠

## 使い方
キーとノンスを使ってメッセージの暗号化と復号化を行えます:

```javascript
import { ChaCha20 } from "https://code4fukui.github.io/ChaCha20/ChaCha20.js";

const key = new Uint8Array(32); // 32バイトのキー
const nonce = new Uint8Array(12); // 12バイトのノンス
const message = new TextEncoder().encode("テスト"); // バイト配列のデータ

// 暗号化
const encrypted = new ChaCha20(key, nonce).encrypt(message);

// 復号化
const decrypted = new ChaCha20(key, nonce).decrypt(encrypted);

console.log(new TextDecoder().decode(decrypted)); // 出力: "テスト"
```

## ライセンス
MIT License