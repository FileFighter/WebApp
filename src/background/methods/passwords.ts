//see: https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest

async function hashPassword(password: string) {
    const msgUint8 = new TextEncoder().encode(password +  "FileFighterWithSomeSalt"); // encode as (utf-8) Uint8Array
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);           // hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
    return hashHex.toUpperCase();
}

export {hashPassword}

