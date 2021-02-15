# encrypter-js

JavaScript library for encryption-decryption of string or objects.

## Node.js (Install)

Requirements:

- Node.js
- npm (Node.js package manager)

```bash
npm install encrypter-js
```

### Usage

Modular include::

```javascript
const rsBase64 = require('encrypter-js');

...
let encryptStringOrObject = rsBase64.encrypt("Hello World!"); 

// Encrypt
console.log(encryptStringOrObject);

// Decrypt
console.log(rsBase64.decrypt(encryptStringOrObject));
```