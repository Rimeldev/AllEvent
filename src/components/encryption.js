/**
 * Convertit une clé Base64URL (Fernet) en Uint8Array
 */
function base64UrlToUint8Array(base64Url) {
  if (!base64Url || typeof base64Url !== 'string') {
    throw new TypeError('base64Url must be a non-empty string');
  }

  const base64 = base64Url
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return bytes;
}

/**
 * Chiffre un objet JSON avec AES-256-GCM
 * @param {Object} data - Données à chiffrer
 * @param {string} fernetKeyBase64Url - Clé Fernet (env)
 * @returns {Promise<string>} - Données chiffrées en Base64
 */
export async function encryptData(data, fernetKeyBase64Url) {
  try {
    if (!fernetKeyBase64Url) {
      throw new Error('Fernet key is required');
    }

    // 1. Décoder la clé Fernet (32 bytes)
    const keyBytes = base64UrlToUint8Array(fernetKeyBase64Url);

    // 2. Importer la clé AES
    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      keyBytes,
      "AES-GCM",
      false,
      ["encrypt"]
    );

    // 3. IV aléatoire (12 bytes recommandé)
    const iv = crypto.getRandomValues(new Uint8Array(12));

    // 4. Encodage du payload
    const encodedData = new TextEncoder().encode(
      JSON.stringify(data)
    );

    // 5. Chiffrement
    const encryptedBuffer = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      cryptoKey,
      encodedData
    );

    // 6. Concat IV + ciphertext
    const combined = new Uint8Array(iv.length + encryptedBuffer.byteLength);
    combined.set(iv, 0);
    combined.set(new Uint8Array(encryptedBuffer), iv.length);

    // 7. Retour Base64
    return btoa(String.fromCharCode(...combined));
  } catch (error) {
    console.error('Erreur dans encryptData:', error);
    throw error;
  }
}