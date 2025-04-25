// src/utils/taporiResponses.ts

const taporiWords = [
  "ekdum",
  "bidu",
  "apun",
  "bhidu",
  "baap",
  "re baba",
  "fatafat",
  "jhakaas",
  "ek number",
  "kya bolti public",
  "maja aa gaya",
  "aai shapath",
  "kya bolta hai",
  "khopcha",
  "bindaas",
  "mamu",
];

const taporiEndBits = [
  "samjha kya?",
  "bhidu",
  "chal ab",
  "bol na",
  "kya bolti public?",
  "aai shapath",
  "bole toh",
  "tere ko",
  "ek dum",
  "ekdum",
  "bhau",
  "babu",
  "baby",
  "bidu",
];

const taporiExpressions = [
  "are baba re",
  "aye bhidu",
  "kya re",
  "abey",
  "abbe",
  "are",
  "aye",
  "oye",
  "haila",
  "bol na",
  "sun na",
  "kya scene hai",
  "kya mangta",
  "ae lavdya",
  "ae gandu",
  "chal be",
  "chal nikal",
  "fattu saala",
  "bakchod",
  "ae babu",
];

export function addTaporiStyle(text: string): string {
  // Don't modify if already very tapori-like
  if (containsMultipleTaporiElements(text)) return text;

  // Ensure random element selection
  const randomTaporiWord =
    taporiWords[Math.floor(Math.random() * taporiWords.length)];
  const randomEndBit =
    taporiEndBits[Math.floor(Math.random() * taporiEndBits.length)];
  const randomExpression =
    taporiExpressions[Math.floor(Math.random() * taporiExpressions.length)];

  // Apply transformations with 70% probability for each
  let enhancedText = text;

  // Add opening tapori expression
  if (Math.random() < 0.7 && !hasStartingExpression(text)) {
    enhancedText = `${randomExpression}, ${enhancedText}`;
  }

  // Add tapori word in the middle
  if (Math.random() < 0.5 && enhancedText.length > 20) {
    const midPoint = Math.floor(enhancedText.length / 2);
    const insertPoint = enhancedText.indexOf(" ", midPoint);
    if (insertPoint !== -1) {
      enhancedText =
        enhancedText.substring(0, insertPoint) +
        ` ${randomTaporiWord}` +
        enhancedText.substring(insertPoint);
    }
  }

  // Add ending bit
  if (Math.random() < 0.7 && !hasEndingExpression(text)) {
    enhancedText = `${enhancedText} ${randomEndBit}`;
  }

  return enhancedText;
}

function containsMultipleTaporiElements(text: string): boolean {
  // Count how many tapori elements are already in the text
  const allTaporiElements = [
    ...taporiWords,
    ...taporiEndBits,
    ...taporiExpressions,
  ];
  let count = 0;

  for (const element of allTaporiElements) {
    if (text.toLowerCase().includes(element.toLowerCase())) {
      count++;
      if (count >= 2) return true;
    }
  }

  return false;
}

function hasStartingExpression(text: string): boolean {
  const lowerText = text.toLowerCase();
  return taporiExpressions.some(
    (exp) =>
      lowerText.startsWith(exp.toLowerCase()) ||
      lowerText.startsWith(`${exp.toLowerCase()},`)
  );
}

function hasEndingExpression(text: string): boolean {
  const lowerText = text.toLowerCase();
  return taporiEndBits.some((exp) => lowerText.endsWith(exp.toLowerCase()));
}
