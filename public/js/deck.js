/**
 * deck.js
 * Deck creation and validation
 */

export function validateFilename(filename) {
  const trimmed = filename.trim();
  
  if (!trimmed) {
    return { valid: false, error: 'Filename cannot be empty' };
  }
  
  if (trimmed.length > 64) {
    return { valid: false, error: 'Filename too long (max 64 characters)' };
  }
  
  // Check for basic invalid characters
  if (/[<>:"|?*\\]/.test(trimmed)) {
    return { valid: false, error: 'Filename contains invalid characters' };
  }
  
  return { valid: true };
}

export function getSanitizedFilename(filename) {
  // This mirrors server-side sanitization for preview
  let sanitized = filename.trim().toLowerCase().replace(/\s+/g, '-');
  sanitized = sanitized.replace(/[^a-z0-9-_]/g, '');
  sanitized = sanitized.replace(/-+/g, '-');
  return sanitized;
}
