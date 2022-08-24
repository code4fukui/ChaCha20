import * as t from "https://deno.land/std/testing/asserts.ts";
import { ChaCha20 } from "./ChaCha20.js";
import { rnd } from "https://js.sabae.cc/rnd.js";

Deno.test("simple", () => {
  const setRandom = (ar) => {
    for (let i = 0; i < ar.length; i++) {
      ar[i] = rnd(256);;
    }
    return ar;
  };
  
  const key = new Uint8Array(32); // 32 bytes key
  setRandom(key);
  const nonce = new Uint8Array(12); // 12 bytes nonce
  setRandom(nonce);
  
  const message = new TextEncoder().encode("test"); // some data as bytes array
  
  // Encrypt //
  const encrypt = new ChaCha20(key, nonce).encrypt(message);
  
  // Decrypt //
  const message2 = new ChaCha20(key, nonce).decrypt(encrypt);
  //console.log(new TextDecoder().decode(message2));  
  t.assertEquals(message, message2);
});
