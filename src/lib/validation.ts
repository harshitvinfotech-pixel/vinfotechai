export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

const MIN_DESCRIPTION_LENGTH = 30;

const gibberishPatterns = [
  /^(.)\1{10,}/,
  /^[^aeiouAEIOU\s]{20,}/,
  /(.{2,})\1{5,}/,
  /^[a-zA-Z]{50,}$/,
];

const repeatingCharsPattern = /(.)\1{4,}/g;

export function validateProjectDescription(description: string): ValidationResult {
  const trimmed = description.trim();

  if (trimmed.length === 0) {
    return {
      isValid: false,
      error: 'Project description is required',
    };
  }

  if (trimmed.length < MIN_DESCRIPTION_LENGTH) {
    return {
      isValid: false,
      error: `Project description must be at least ${MIN_DESCRIPTION_LENGTH} characters (currently ${trimmed.length})`,
    };
  }

  for (const pattern of gibberishPatterns) {
    if (pattern.test(trimmed)) {
      return {
        isValid: false,
        error: 'Please provide a meaningful project description',
      };
    }
  }

  const repeatingMatches = trimmed.match(repeatingCharsPattern);
  if (repeatingMatches && repeatingMatches.length > 2) {
    return {
      isValid: false,
      error: 'Please provide a meaningful project description without excessive repeated characters',
    };
  }

  const words = trimmed.split(/\s+/);
  if (words.length < 5) {
    return {
      isValid: false,
      error: 'Please provide more details about your project (at least 5 words)',
    };
  }

  const vowelCount = (trimmed.match(/[aeiouAEIOU]/g) || []).length;
  const consonantCount = (trimmed.match(/[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]/g) || []).length;
  const totalLetters = vowelCount + consonantCount;

  if (totalLetters > 20 && vowelCount / totalLetters < 0.15) {
    return {
      isValid: false,
      error: 'Please provide a meaningful project description',
    };
  }

  return {
    isValid: true,
  };
}

export function getCharacterCount(text: string): number {
  return text.trim().length;
}

export function getRemainingCharacters(text: string): number {
  const current = getCharacterCount(text);
  return Math.max(0, MIN_DESCRIPTION_LENGTH - current);
}
