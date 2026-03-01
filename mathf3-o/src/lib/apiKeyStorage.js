const PLAIN_KEY = 'groqApiKey';
const ENCRYPTED_KEY = 'groqApiKeyEncrypted';
const SESSION_PASSWORD_KEY = 'groqApiKeyPassword';
const KDF_ITERATIONS = 210000;
const SALT_BYTES = 16;
const IV_BYTES = 12;

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function toBase64(bytes) {
  let binary = '';
  const view = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  for (let i = 0; i < view.length; i += 1) {
    binary += String.fromCharCode(view[i]);
  }
  return btoa(binary);
}

function fromBase64(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

async function deriveAesKey(password, salt, usage) {
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: KDF_ITERATIONS,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    [usage]
  );
}

async function encryptValue(plainText, password) {
  const salt = crypto.getRandomValues(new Uint8Array(SALT_BYTES));
  const iv = crypto.getRandomValues(new Uint8Array(IV_BYTES));
  const key = await deriveAesKey(password, salt, 'encrypt');

  const cipherBuffer = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encoder.encode(plainText)
  );

  return {
    v: 1,
    alg: 'AES-GCM',
    kdf: 'PBKDF2-SHA256',
    iter: KDF_ITERATIONS,
    salt: toBase64(salt),
    iv: toBase64(iv),
    data: toBase64(cipherBuffer)
  };
}

async function decryptValue(payload, password) {
  if (!payload || typeof payload !== 'object') {
    throw new Error('Encrypted key payload is invalid.');
  }

  const salt = fromBase64(payload.salt);
  const iv = fromBase64(payload.iv);
  const data = fromBase64(payload.data);

  const key = await deriveAesKey(password, salt, 'decrypt');
  const plainBuffer = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    data
  );

  return decoder.decode(plainBuffer);
}

function getSessionPassword() {
  return window.sessionStorage.getItem(SESSION_PASSWORD_KEY) || '';
}

export function setSessionPassword(password) {
  const trimmed = (password || '').trim();
  if (!trimmed) {
    window.sessionStorage.removeItem(SESSION_PASSWORD_KEY);
    return;
  }

  window.sessionStorage.setItem(SESSION_PASSWORD_KEY, trimmed);
}

export function clearSessionPassword() {
  window.sessionStorage.removeItem(SESSION_PASSWORD_KEY);
}

export function getGroqApiKeyStorageState() {
  const plain = window.localStorage.getItem(PLAIN_KEY) || '';
  const encrypted = window.localStorage.getItem(ENCRYPTED_KEY) || '';

  return {
    hasPlainKey: plain.trim().length > 0,
    hasEncryptedKey: encrypted.trim().length > 0,
    hasSessionPassword: getSessionPassword().length > 0
  };
}

export async function saveGroqApiKey(apiKey, options = {}) {
  const trimmedKey = (apiKey || '').trim();
  const encrypt = Boolean(options.encrypt);
  const password = (options.password || '').trim();

  if (!trimmedKey) {
    clearStoredGroqApiKey();
    return { stored: false, encrypted: false };
  }

  if (encrypt) {
    if (!password) {
      throw new Error('Password is required to encrypt the API key.');
    }

    const payload = await encryptValue(trimmedKey, password);
    window.localStorage.setItem(ENCRYPTED_KEY, JSON.stringify(payload));
    window.localStorage.removeItem(PLAIN_KEY);
    setSessionPassword(password);

    return { stored: true, encrypted: true };
  }

  window.localStorage.setItem(PLAIN_KEY, trimmedKey);
  window.localStorage.removeItem(ENCRYPTED_KEY);
  clearSessionPassword();

  return { stored: true, encrypted: false };
}

export async function getGroqApiKey() {
  const plain = window.localStorage.getItem(PLAIN_KEY) || '';
  if (plain.trim().length > 0) {
    return plain.trim();
  }

  const encryptedRaw = window.localStorage.getItem(ENCRYPTED_KEY) || '';
  if (!encryptedRaw) {
    return null;
  }

  const password = getSessionPassword();
  if (!password) {
    return null;
  }

  try {
    const payload = JSON.parse(encryptedRaw);
    const decrypted = await decryptValue(payload, password);
    return decrypted.trim().length > 0 ? decrypted.trim() : null;
  } catch {
    return null;
  }
}

export async function unlockGroqApiKey(password) {
  const trimmed = (password || '').trim();
  if (!trimmed) {
    throw new Error('Password is required.');
  }

  const encryptedRaw = window.localStorage.getItem(ENCRYPTED_KEY) || '';
  if (!encryptedRaw) {
    throw new Error('No encrypted API key was found.');
  }

  try {
    const payload = JSON.parse(encryptedRaw);
    const decrypted = await decryptValue(payload, trimmed);
    if (!decrypted.trim()) {
      throw new Error('Stored API key is empty.');
    }

    setSessionPassword(trimmed);
    return decrypted.trim();
  } catch {
    throw new Error('Failed to unlock API key. Check your password and try again.');
  }
}

export function clearStoredGroqApiKey() {
  window.localStorage.removeItem(PLAIN_KEY);
  window.localStorage.removeItem(ENCRYPTED_KEY);
  clearSessionPassword();
}
