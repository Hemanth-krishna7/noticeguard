/**
 * Text Normalization Utility
 * Prepares extracted OCR text for deterministic registry matching.
 */

/**
 * Normalizes raw text extracted from OCR
 * - Converts to lowercase
 * - Normalizes unicode hyphens and dashes to standard ASCII '-'
 * - Normalizes quotes and whitespace
 * - Collapses multiple spaces and clean up extraneous OCR artifacts
 * @param {string} text
 * @returns {string}
 */
export function normalizeText(text) {
  if (!text || typeof text !== 'string') {
    return '';
  }

  return text
    // Replace non-breaking spaces and special whitespace with standard space
    .replace(/[\u00A0\u1680\u180e\u2000-\u200a\u202f\u205f\u3000]/g, ' ')
    // Normalize various unicode dash/hyphen characters to standard '-'
    .replace(/[\u2010\u2011\u2012\u2013\u2014\u2015\u2212]/g, '-')
    // Normalize unicode single quotes/apostrophes
    .replace(/[\u2018\u2019\u201A\u201B]/g, "'")
    // Normalize unicode double quotes
    .replace(/[\u201C\u201D\u201E\u201F]/g, '"')
    // Lowercase everything
    .toLowerCase()
    // Replace newlines and carriage returns with spaces
    .replace(/[\r\n\t]+/g, ' ')
    // Collapse multiple consecutive spaces
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Checks if normalized text contains any of the search phrases
 * @param {string} normalizedText
 * @param {string[]} phrases
 * @returns {boolean}
 */
export function containsAnyPhrase(normalizedText, phrases = []) {
  if (!normalizedText || !phrases.length) return false;
  return phrases.some((phrase) => normalizedText.includes(phrase.toLowerCase()));
}

/**
 * Checks if normalized text contains all of the required search phrases
 * @param {string} normalizedText
 * @param {string[]} phrases
 * @returns {boolean}
 */
export function containsAllPhrases(normalizedText, phrases = []) {
  if (!normalizedText || !phrases.length) return false;
  return phrases.every((phrase) => normalizedText.includes(phrase.toLowerCase()));
}
