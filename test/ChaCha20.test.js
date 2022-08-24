/**
 * Created by Mykola Bubelich
 * 2017-01-25
 */

import * as t from "https://deno.land/std/testing/asserts.ts";
import { ChaCha20 } from "../ChaCha20.js";

/**
 * General Test
 */
Deno.test("Class 'JSSalsa20' should exists", () => {
  const salsa = new ChaCha20(new Uint8Array(32), new Uint8Array(12))
  t.assert(salsa instanceof ChaCha20)
})

Deno.test("Function 'encrypt' should exists", () => {
  const salsa = new ChaCha20(new Uint8Array(32), new Uint8Array(12))
  t.assert(typeof salsa.encrypt === 'function')
})

Deno.test("Function 'decrypt' should exists", () => {
  const salsa = new ChaCha20(new Uint8Array(32), new Uint8Array(12))
  t.assert(typeof salsa.decrypt === 'function')
})

/**
 * Errors handlers
 */
Deno.test('When set key with length not 32 byte, error should be thrown', () => {
  t.assertThrows(() => {
    new ChaCha20(null, null)
  }, /Key should be 32 byte array!/)
})

Deno.test('When set nonce with length not 12 byte, error should be thrown', () => {
  t.assertThrows(() => {
    new ChaCha20(new Uint8Array(32), null)
  }, /Nonce should be 12 byte array!/)
})

Deno.test('When not bytes pass to encryt/decrypt method, error should be thrown', () => {
  t.assertThrows(() => {
    new ChaCha20(new Uint8Array(32), new Uint8Array(12)).encrypt(null)
  }, /Data should be type of bytes \(Uint8Array\) and not empty!/)
})

/**
 * Encrypt / Decrypt
 */
Deno.test('Encrypt and decrypt for 256 byte should be same', () => {
  //const crypto = require('crypto')

  const key = crypto.getRandomValues(new Uint8Array(32));
  const nonce = crypto.getRandomValues(new Uint8Array(12));
  const data = crypto.getRandomValues(new Uint8Array(4096));
  
  const encoder = new ChaCha20(key, nonce)
  const decoder = new ChaCha20(key, nonce)

  const encr = encoder.encrypt(data)
  const decr = decoder.decrypt(encr)

  t.assertEquals(encoder.param, decoder.param, 'Parameters should be equivalent')
  t.assertEquals(data, decr, 'Decrypted data should be the same as input')
  t.assertEquals([64, 64], [encoder._param[12], decoder._param[12]], 'Counter should be equal 64')
})

Deno.test('First block and param should be equal to reference', () => {
  const key = new Uint8Array([
    0x00, 0x01, 0x02, 0x03, 0x04,
    0x05, 0x06, 0x07, 0x08, 0x09,
    0x0a, 0x0b, 0x0c, 0x0d, 0x0e,
    0x0f, 0x10, 0x11, 0x12, 0x13,
    0x14, 0x15, 0x16, 0x17, 0x18,
    0x19, 0x1a, 0x1b, 0x1c, 0x1d,
    0x1e, 0x1f
  ])

  const nonce = new Uint8Array([
    0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x4a,
    0x00, 0x00, 0x00, 0x00
  ])

  const counter = 1

  const text = new Uint8Array([
    0x4c, 0x61, 0x64, 0x69, 0x65, 0x73, 0x20, 0x61, 0x6e, 0x64, 0x20, 0x47, 0x65, 0x6e, 0x74, 0x6c,
    0x65, 0x6d, 0x65, 0x6e, 0x20, 0x6f, 0x66, 0x20, 0x74, 0x68, 0x65, 0x20, 0x63, 0x6c, 0x61, 0x73,
    0x73, 0x20, 0x6f, 0x66, 0x20, 0x27, 0x39, 0x39, 0x3a, 0x20, 0x49, 0x66, 0x20, 0x49, 0x20, 0x63,
    0x6f, 0x75, 0x6c, 0x64, 0x20, 0x6f, 0x66, 0x66, 0x65, 0x72, 0x20, 0x79, 0x6f, 0x75, 0x20, 0x6f,
    0x6e, 0x6c, 0x79, 0x20, 0x6f, 0x6e, 0x65, 0x20, 0x74, 0x69, 0x70, 0x20, 0x66, 0x6f, 0x72, 0x20,
    0x74, 0x68, 0x65, 0x20, 0x66, 0x75, 0x74, 0x75, 0x72, 0x65, 0x2c, 0x20, 0x73, 0x75, 0x6e, 0x73,
    0x63, 0x72, 0x65, 0x65, 0x6e, 0x20, 0x77, 0x6f, 0x75, 0x6c, 0x64, 0x20, 0x62, 0x65, 0x20, 0x69,
    0x74, 0x2e
  ])

  // encrypt
  const encryptor = new ChaCha20(key, nonce, counter)
  const ciphertext = encryptor.encrypt(text)

  // decrypt
  const decryptor = new ChaCha20(key, nonce, counter)
  const plaintext = decryptor.decrypt(ciphertext)

  t.assertEquals(plaintext, text, 'Test text should be the same')
  t.assertEquals(encryptor._param, decryptor._param, 'Param should be the same for encryptor and decryptor')
  t.assertEquals(encryptor._keystream, decryptor._keystream, 'Keystream should be the same for encryptor and decryptor')
})
